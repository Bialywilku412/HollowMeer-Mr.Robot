using Hollowmeer.Api.Dtos;

namespace Hollowmeer.Api.Services;

public interface IBeastService
{
    Task<List<BeastDto>> GetAllAsync();
    Task<BeastDto?> GetByIdAsync(int id);
}