using Hollowmeer.Api.Dtos;
using Hollowmeer.Api.Models;
using Hollowmeer.Api.Repositories;

namespace Hollowmeer.Api.Services;

public class RegionService : IRegionService
{
    private readonly IRepository<Region> _regions;

    public RegionService(IRepository<Region> regions)
    {
        _regions = regions;
    }

    public async Task<List<RegionDto>> GetAllAsync()
    {
        var regions = await _regions.GetAllAsync();
        return regions.Select(ToDto).ToList();
    }

    public async Task<RegionDto?> GetByIdAsync(int id)
    {
        var region = await _regions.GetByIdAsync(id);
        return region is null ? null : ToDto(region);
    }

    private static RegionDto ToDto(Region region) => new()
    {
        Id = region.Id,
        Name = region.Name
    };
}