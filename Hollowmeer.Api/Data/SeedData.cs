using Hollowmeer.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Hollowmeer.Api.Data;

public static class SeedData
{
    public static async Task InitializeAsync(WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            
        if (await context.Beasts.AnyAsync())
        {
            return;
        }

        context.Beasts.AddRange(
            new Beast { Name = "Monster1", Region = "Dungeon1", Description = "aaaaaaa", ImageUrl = "/data/aaa" },
            new Beast { Name = "Monster2", Region = "Dungeon2", Description = "bbbbbbb", ImageUrl = "/data/aaa" },
            new Beast { Name = "Monster3", Region = "Dungeon3", Description = "ccccccc", ImageUrl = "/data/aaa" }
        );

        await context.SaveChangesAsync();
    }
}