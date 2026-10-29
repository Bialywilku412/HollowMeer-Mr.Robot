using Hollowmeer.Api.Dtos;

namespace Hollowmeer.Api.Services;

public interface IBeastService
{
    Task<List<BeastDto>> GetAllAsync();
    Task<BeastDto?> GetByIdAsync(int id);
    Task<BeastDto> CreateAsync(CreateBeastDto dto);
    Task<bool> DeleteAsync(int id);
    Task<BeastDto?> UpdateAsync(int id, UpdateBeastDto dto);
}