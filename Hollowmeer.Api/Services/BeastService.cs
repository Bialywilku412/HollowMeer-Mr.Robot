using Hollowmeer.Api.Dtos;
using Hollowmeer.Api.Models;
using Hollowmeer.Api.Repositories;
using Hollowmeer.Api.Exceptions;

namespace Hollowmeer.Api.Services;

public class BeastService : IBeastService
{
    private readonly IRepository<Beast> _beasts;
    private readonly IRepository<Region> _regions;

    public BeastService(IRepository<Beast>  beasts, IRepository<Region> regions)
    {
        _beasts = beasts;
        _regions = regions;
    }

    public async Task<List<BeastDto>> GetAllAsync(string? search = null)
    {
        var beasts = string.IsNullOrWhiteSpace(search)
            ? await _beasts.GetAllAsync()
            : await _beasts.FindAsync(
                b => b.Name.ToLower().Contains(search.ToLower()));

        return beasts.Select(BeastMapper.ToDto).ToList();
    }

    public async Task<BeastDto?> GetByIdAsync(int id)
    {
        var beast = await _beasts.GetByIdAsync(id, b => b.Region);
        return beast is null ? null : BeastMapper.ToDto(beast);
    }

    public async Task<BeastDto> CreateAsync(CreateBeastDto dto)
    {
        var region = await GetRequiredRegionAsync(dto.RegionId);

        var beast = new Beast
        {
            Name = dto.Name,
            Region = region,
            Description = dto.Description,
            ImageUrl = dto.ImageUrl
        };

        _beasts.Add(beast);
        await _beasts.SaveChangesAsync();

        return BeastMapper.ToDto(beast);
    }

    public async Task<BeastDto?> UpdateAsync(int id, UpdateBeastDto dto)
    {
        var beast = await _beasts.GetByIdAsync(id);
        if (beast is null) return null;

        var region = await GetRequiredRegionAsync(dto.RegionId);

        beast.Name = dto.Name;
        beast.Region = region;
        beast.Description = dto.Description;
        beast.ImageUrl = dto.ImageUrl;
        await _beasts.SaveChangesAsync();

        return BeastMapper.ToDto(beast);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var beast = await _beasts.GetByIdAsync(id);
        if (beast is null) return false;

        _beasts.Delete(beast);
        await _beasts.SaveChangesAsync();

        return true;
    }

    private async Task<Region> GetRequiredRegionAsync(int regionId)
    {
        var region = await _regions.GetByIdAsync(regionId);
        if (region is null)
            throw new BadRequestException($"There is no region with id {regionId}");
        return region;
    }
}