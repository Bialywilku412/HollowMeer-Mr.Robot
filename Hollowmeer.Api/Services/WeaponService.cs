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

        return weapons.Select(ToDto).ToList();
    }

    public async Task<WeaponDto?> GetByIdAsync(int id)
    {
        var weapon = await _weapons.GetByIdAsync(id, b => b.WeaponType, b => b.WeaponCondition);
        return weapon is null ? null : ToDto(weapon);
    }

    public async Task<WeaponDto> CreateAsync(CreateWeaponDto dto)
    {
        var weaponType = await _weaponTypes.GetByIdAsync(dto.WeaponTypeId);
        if (weaponType is null)
        {
            throw new BadRequestException($"Weapon type with ID {dto.WeaponTypeId} does not exist.");
        }

        var weaponCondition = await _weaponConditions.GetByIdAsync(dto.WeaponConditionId);
        if (weaponCondition is null)
        {
            throw new BadRequestException($"Weapon condition with ID {dto.WeaponConditionId} does not exist.");
        }

        var weapon = new Weapon
        {
            Name = dto.Name,
            WeaponTypeId = dto.WeaponTypeId,
            WeaponConditionId = dto.WeaponConditionId,
            isDangerous = dto.isDangerous,
            Note = dto.Note
        };

        _weapons.Add(weapon);
        await _weapons.SaveChangesAsync();

        return ToDto(weapon);
    }

    public async Task<WeaponDto?> UpdateAsync(int id, UpdateWeaponDto dto)
    {
        var weapon = await _weapons.GetByIdAsync(id);
        if (weapon is null) return null;

        var weaponType = await _weaponTypes.GetByIdAsync(dto.WeaponTypeId);
        if (weaponType is null)
        {
            throw new BadRequestException($"Weapon type with ID {dto.WeaponTypeId} does not exist.");
        }

        var weaponCondition = await _weaponConditions.GetByIdAsync(dto.WeaponConditionId);
        if (weaponCondition is null)
        {
            throw new BadRequestException($"Weapon condition with ID {dto.WeaponConditionId} does not exist.");
        }

        weapon.Name = dto.Name;
        weapon.WeaponTypeId = dto.WeaponTypeId;
        weapon.WeaponConditionId = dto.WeaponConditionId;
        weapon.isDangerous = dto.isDangerous;
        weapon.Note = dto.Note;
        await _weapons.SaveChangesAsync();

        return ToDto(weapon);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var weapon = await _weapons.GetByIdAsync(id);
        if (weapon is null) return false;

        _weapons.Delete(weapon);
        await _weapons.SaveChangesAsync();

        return true;
    }


    private static WeaponDto ToDto(Weapon weapon) => new()
    {
        Id = weapon.Id,
        Name = weapon.Name,
        WeaponType = new WeaponTypeDto
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