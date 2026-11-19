using Hollowmeer.Api.Dtos;

namespace Hollowmeer.Api.Services;

public interface IWeaponTypeService
{
    Task<List<WeaponTypeDto>> GetAllAsync();
    Task<WeaponTypeDto?> GetByIdAsync(int id);
}