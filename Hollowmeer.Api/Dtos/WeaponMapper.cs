using Hollowmeer.Api.Models;

namespace Hollowmeer.Api.Dtos;

public static class WeaponMapper
{
    public static WeaponDto ToDto(Weapon weapon) => new()
    {
        Id = weapon.Id,
        Name = weapon.Name,
        WeaponType =  new WeaponTypeDto
        {
            Id = weapon.WeaponType.Id,
            Name = weapon.WeaponType.Name
        },
        WeaponCondition = new WeaponConditionDto
        {
            Id = weapon.WeaponCondition.Id,
            Name = weapon.WeaponCondition.Name
        },
        isDangerous = weapon.isDangerous,
        Note = weapon.Note
    };
}