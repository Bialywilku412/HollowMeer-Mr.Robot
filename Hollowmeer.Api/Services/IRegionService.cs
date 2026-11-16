using Hollowmeer.Api.Dtos;

namespace Hollowmeer.Api.Services;

public interface IRegionService
{
    Task<List<RegionDto>> GetAllAsync();
    Task<RegionDto?> GetByIdAsync(int id);
}