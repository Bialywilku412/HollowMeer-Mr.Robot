using Hollowmeer.Api.Dtos;
using Hollowmeer.Api.Models;
using Hollowmeer.Api.Repositories;

namespace Hollowmeer.Api.Services;

public class WeaponTypeService : IWeaponTypeService
{
    private readonly IRepository<WeaponType> _weaponTypes;

    public WeaponTypeService(IRepository<WeaponType> weaponTypes)
    {
        _weaponTypes = weaponTypes;
    }

    public async Task<List<WeaponTypeDto>> GetAllAsync()
    {
        var weaponTypes = await _weaponTypes.GetAllAsync();
        return weaponTypes.Select(ToDto).ToList();
    }

    public async Task<WeaponTypeDto?> GetByIdAsync(int id)
    {
        var weaponType = await _weaponTypes.GetByIdAsync(id);
        return weaponType is null ? null : ToDto(weaponType);
    }

    private static WeaponTypeDto ToDto(WeaponType weaponType) => new()
    {
        Id = weaponType.Id,
        Name = weaponType.Name
    };
}