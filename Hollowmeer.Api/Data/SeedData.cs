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

        var regions = new List<Region>
        {
            new Region { Name = "Forest" },
            new Region { Name = "Dungeon" },
            new Region { Name = "Desert" }
        };

        context.Beasts.AddRange(
            new Beast { Name = "Monster1", Region = regions[0], Description = "aaaaaaa", ImageUrl = "/data/aaa" },
            new Beast { Name = "Monster2", Region = regions[1], Description = "bbbbbbb", ImageUrl = "/data/aaa" },
            new Beast { Name = "Monster3", Region = regions[2], Description = "ccccccc", ImageUrl = "/data/aaa" }
        );

        await context.SaveChangesAsync();
    }
}