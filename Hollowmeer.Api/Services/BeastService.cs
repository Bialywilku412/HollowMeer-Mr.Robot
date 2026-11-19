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

        return beasts.Select(ToDto).ToList();
    }

    public async Task<BeastDto?> GetByIdAsync(int id)
    {
        var beast = await _beasts.GetByIdAsync(id, b => b.Region);
        return beast is null ? null : ToDto(beast);
    }

    public async Task<BeastDto> CreateAsync(CreateBeastDto dto)
    {
        var region = await _regions.GetByIdAsync(dto.RegionId);
        if (region is null)
        {
            throw new BadRequestException($"Region with ID {dto.RegionId} does not exist.");
        }

        var beast = new Beast
        {
            Name = dto.Name,
            RegionId = dto.RegionId,
            Description = dto.Description,
            ImageUrl = dto.ImageUrl
        };

        _beasts.Add(beast);
        await _beasts.SaveChangesAsync();

        return ToDto(beast);
    }

    public async Task<BeastDto?> UpdateAsync(int id, UpdateBeastDto dto)
    {
        var beast = await _beasts.GetByIdAsync(id);
        if (beast is null) return null;

        var region = await _regions.GetByIdAsync(dto.RegionId);
        if (region is null)
        {
            throw new BadRequestException($"Region with ID {dto.RegionId} does not exist.");
        }

        beast.Name = dto.Name;
        beast.RegionId = dto.RegionId;
        beast.Description = dto.Description;
        beast.ImageUrl = dto.ImageUrl;
        await _beasts.SaveChangesAsync();

        return ToDto(beast);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var beast = await _beasts.GetByIdAsync(id);
        if (beast is null) return false;

        _beasts.Delete(beast);
        await _beasts.SaveChangesAsync();

        return true;
    }


    private static BeastDto ToDto(Beast beast) => new()
    {
        Id = beast.Id,
        Name = beast.Name,
        Region = new RegionDto
        {
            Id = beast.Region.Id,
            Name = beast.Region.Name
        },
        Description = beast.Description,
        ImageUrl = beast.ImageUrl
    };
}