using Hollowmeer.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Hollowmeer.Api.Data;

public static class SeedData
{
    public static async Task InitializeAsync(WebApplication app)
    {
        using var scope = app.Services.CreateScope();

        var context = scope.ServiceProvider
            .GetRequiredService<AppDbContext>();

        // Seed Beasts
        if (!await context.Beasts.AnyAsync())
        {
            context.Beasts.AddRange(
                new Beast { Name = "Monster1", Region = "Dungeon1", Description = "aaaaaaa", ImageUrl = "/data/aaa" },
                new Beast { Name = "Monster2", Region = "Dungeon2", Description = "bbbbbbb", ImageUrl = "/data/aaa" },
                new Beast { Name = "Monster3", Region = "Dungeon3", Description = "ccccccc", ImageUrl = "/data/aaa" }
            );
        }

        // Seed Quests
        if (!await context.Quests.AnyAsync())
        {
            context.Quests.AddRange(
                new Quest { Name = "Quest1", Description = "aaaaaaa", Date = 1 },
                new Quest { Name = "Quest2", Description = "bbbbbbb", Date = 3 },
                new Quest { Name = "Quest3", Description = "ccccccc", Date = 4 }
            );
        }

        await context.SaveChangesAsync();
    }
}
