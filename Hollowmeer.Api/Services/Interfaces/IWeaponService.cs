using Hollowmeer.Api.Dtos;

namespace Hollowmeer.Api.Services;

public interface IWeaponService
{
    Task<List<WeaponDto>> GetAllAsync(string? search = null);
    Task<WeaponDto?> GetByIdAsync(int id);
    Task<WeaponDto> CreateAsync(CreateWeaponDto dto);
    Task<bool> DeleteAsync(int id);
    Task<WeaponDto?> UpdateAsync(int id, UpdateWeaponDto dto);
}