using Hollowmeer.Api.Dtos;
using Hollowmeer.Api.Models;
using Hollowmeer.Api.Repositories;

namespace Hollowmeer.Api.Services;

public class WeaponConditionService : IWeaponConditionService
{
    private readonly IRepository<WeaponCondition> _weaponConditions;

    public WeaponConditionService(IRepository<WeaponCondition> weaponConditions)
    {
        _weaponConditions = weaponConditions;
    }

    public async Task<List<WeaponConditionDto>> GetAllAsync()
    {
        var weaponConditions = await _weaponConditions.GetAllAsync();
        return weaponConditions.Select(ToDto).ToList();
    }

    public async Task<WeaponConditionDto?> GetByIdAsync(int id)
    {
        var weaponCondition = await _weaponConditions.GetByIdAsync(id);
        return weaponCondition is null ? null : ToDto(weaponCondition);
    }

    private static WeaponConditionDto ToDto(WeaponCondition weaponCondition) => new()
    {
        Id = weaponCondition.Id,
        Name = weaponCondition.Name
    };
}