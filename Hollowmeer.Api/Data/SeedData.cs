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

        if (!await context.Quests.AnyAsync())
        {
            context.Quests.AddRange(
                new Quest { Name = "Quest1", Host = "Host1", Description = "aaaaaaa", Date = 1 },
                new Quest { Name = "Quest2", Host = "Host2", Description = "bbbbbbb", Date = 3 },
                new Quest { Name = "Quest3", Host = "Host3", Description = "ccccccc", Date = 4 }
            );
        };

        if (!await context.Regions.AnyAsync())
        {
            context.Regions.AddRange(
                new Region { Name = "Forest" },
                new Region { Name = "Dungeon" },
                new Region { Name = "Desert" }
            );
            await context.SaveChangesAsync();
        };

        if (!await context.WeaponTypes.AnyAsync())
        {
            context.WeaponTypes.AddRange(
                new WeaponType { Name = "Sword" },
                new WeaponType { Name = "Dagger" },
                new WeaponType { Name = "Bow" }
            );
            await context.SaveChangesAsync();
        };

        if (!await context.WeaponConditions.AnyAsync())
        {
            context.WeaponConditions.AddRange(
                new WeaponCondition { Name = "New" },
                new WeaponCondition { Name = "Used" },
                new WeaponCondition { Name = "Broken" }
            );
            await context.SaveChangesAsync();
        };

        if (!await context.Beasts.AnyAsync())
        {
            var regions = await context.Regions.OrderBy(r => r.Id).ToListAsync();
            context.Beasts.AddRange(
                new Beast { Name = "Monster1", Region = regions[0], Description = "aaaaaaa", ImageUrl = "/data/aaa" },
                new Beast { Name = "Monster2", Region = regions[1], Description = "bbbbbbb", ImageUrl = "/data/aaa" },
                new Beast { Name = "Monster3", Region = regions[2], Description = "ccccccc", ImageUrl = "/data/aaa" }
            );
        };

        if (!await context.Weapons.AnyAsync())
        {
            var regions = await context.Regions.OrderBy(r => r.Id).ToListAsync();
            var weaponTypes = await context.WeaponTypes.OrderBy(w => w.Id).ToListAsync();
            var weaponConditions = await context.WeaponConditions.OrderBy(w => w.Id).ToListAsync();
            context.Weapons.AddRange(
                new Weapon { Name = "Weapon1", WeaponType = weaponTypes[0], WeaponCondition = weaponConditions[0], Note = "Note1" },
                new Weapon { Name = "Weapon2", WeaponType = weaponTypes[1], WeaponCondition = weaponConditions[1], Note = "Note2" },
                new Weapon { Name = "Weapon3", WeaponType = weaponTypes[2], WeaponCondition = weaponConditions[2], Note = "Note3" }
            );
        };

        await context.SaveChangesAsync();
    }
}
