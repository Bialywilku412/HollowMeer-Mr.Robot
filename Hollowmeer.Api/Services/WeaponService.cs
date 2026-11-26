using Hollowmeer.Api.Dtos;
using Hollowmeer.Api.Models;
using Hollowmeer.Api.Repositories;
using Hollowmeer.Api.Exceptions;

namespace Hollowmeer.Api.Services;

public class WeaponService : IWeaponService
{
    private readonly IRepository<Weapon> _weapons;
    private readonly IRepository<WeaponType> _weaponTypes;
    private readonly IRepository<WeaponCondition> _weaponConditions;

    public WeaponService(IRepository<Weapon> weapons, IRepository<WeaponType> weaponTypes, IRepository<WeaponCondition> weaponConditions)
    {
        _weapons = weapons;
        _weaponTypes = weaponTypes;
        _weaponConditions = weaponConditions;
    }

    public async Task<List<WeaponDto>> GetAllAsync(string? search = null)
    {
        var weapons = string.IsNullOrWhiteSpace(search)
            ? await _weapons.GetAllAsync()
            : await _weapons.FindAsync(
                b => b.Name.ToLower().Contains(search.ToLower()));

        return weapons.Select(WeaponMapper.ToDto).ToList();
    }

    public async Task<WeaponDto?> GetByIdAsync(int id)
    {
        var weapon = await _weapons.GetByIdAsync(id, b => b.WeaponType, b => b.WeaponCondition);
        return weapon is null ? null : WeaponMapper.ToDto(weapon);
    }

    public async Task<WeaponDto> CreateAsync(CreateWeaponDto dto)
    {
        var weaponType = await GetRequiredWeaponTypeAsync(dto.WeaponTypeId);
        var weaponCondition = await GetRequiredWeaponConditionAsync(dto.WeaponConditionId);

        var weapon = new Weapon
        {
            Name = dto.Name,
            WeaponType = weaponType,
            WeaponCondition = weaponCondition,
            isDangerous = dto.isDangerous,
            Note = dto.Note
        };

        _weapons.Add(weapon);
        await _weapons.SaveChangesAsync();
        return WeaponMapper.ToDto(weapon);
    }

    public async Task<WeaponDto?> UpdateAsync(int id, UpdateWeaponDto dto)
    {
        var weapon = await _weapons.GetByIdAsync(id);
        if (weapon is null) return null;

        var weaponType = await GetRequiredWeaponTypeAsync(dto.WeaponTypeId);
        var weaponCondition = await GetRequiredWeaponConditionAsync(dto.WeaponConditionId);

        weapon.Name = dto.Name;
        weapon.WeaponType = weaponType;
        weapon.WeaponCondition = weaponCondition;
        weapon.isDangerous = dto.isDangerous;
        weapon.Note = dto.Note;

        await _weapons.SaveChangesAsync();
        return WeaponMapper.ToDto(weapon);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var weapon = await _weapons.GetByIdAsync(id);
        if (weapon is null) return false;

        _weapons.Delete(weapon);
        await _weapons.SaveChangesAsync();

        return true;
    }

    private async Task<WeaponType> GetRequiredWeaponTypeAsync(int weaponTypeId)
    {
        var weaponType = await _weaponTypes.GetByIdAsync(weaponTypeId);
        if (weaponType is null)
            throw new BadRequestException($"There is no weapon type with id {weaponTypeId}");
        return weaponType;
    }

    private async Task<WeaponCondition> GetRequiredWeaponConditionAsync(int WeaponConditionId)
    {
        var weaponCondition = await _weaponConditions.GetByIdAsync(WeaponConditionId);
        if (weaponCondition is null)
            throw new BadRequestException($"There is no weapon condition with id {WeaponConditionId}");
        return weaponCondition;
    }
}