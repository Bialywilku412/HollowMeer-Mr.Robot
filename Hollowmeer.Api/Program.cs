using Hollowmeer.Api.Data;
using Hollowmeer.Api.Repositories;
using Hollowmeer.Api.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("Default")));

builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped<IBeastService, BeastService>();

builder.Services.AddControllers();

var app = builder.Build();

await SeedData.InitializeAsync(app);

app.MapControllers();

app.Run();
