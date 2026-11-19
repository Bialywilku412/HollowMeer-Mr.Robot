using Hollowmeer.Api.Dtos;

namespace Hollowmeer.Api.Services;

public interface IWeaponConditionService
{
    Task<List<WeaponConditionDto>> GetAllAsync();
    Task<WeaponConditionDto?> GetByIdAsync(int id);
}