using Hollowmeer.Api.Data;
using Hollowmeer.Api.Repositories;
using Hollowmeer.Api.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("Default")));

builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped<IBeastService, BeastService>();
builder.Services.AddScoped<IQuestService, QuestService>();

builder.Services.AddControllers();

var frontendUrl = builder.Configuration["Frontend:Url"]
    ?? throw new InvalidOperationException("Missing configuration value Frontend:Url");
builder.Services.AddCors(options =>
    options.AddDefaultPolicy(policy =>
        policy.WithOrigins(frontendUrl)
              .AllowAnyHeader()
              .AllowAnyMethod()));

var app = builder.Build();

await SeedData.InitializeAsync(app);
app.UseCors();

app.MapControllers();

app.Run();
