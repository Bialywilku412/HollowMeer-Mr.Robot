using Hollowmeer.Api.Dtos;
using Hollowmeer.Api.Models;
using Hollowmeer.Api.Repositories;

namespace Hollowmeer.Api.Services;

public class BeastService : IBeastService
{
    private readonly IRepository<Beast> _beasts;

    public BeastService(IRepository<Beast>  beasts)
    {
        _beasts = beasts;
    }

    public async Task<List<BeastDto>> GetAllAsync()
    {
        var beasts = await _beasts.GetAllAsync();
        return beasts.Select(ToDto).ToList();
    }

    public async Task<BeastDto?> GetByIdAsync(int id)
    {
        var beast = await _beasts.GetByIdAsync(id);
        return beast is null ? null : ToDto(beast);
    }

    private static BeastDto ToDto(Beast beast) => new()
    {
        Id = beast.Id,
        Name = beast.Name,
        Region = beast.Region,
        Description = beast.Description,
        ImageUrl = beast.ImageUrl
    };

    public async Task<BeastDto> CreateAsync(CreateBeastDto dto)
    {
        var beast = new Beast
        {
            Name = dto.Name,
            Region = dto.Region,
            Description = dto.Description,
            ImageUrl = dto.ImageUrl
        };

        _beasts.Add(beast);
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

    public async Task<BeastDto?> UpdateAsync(int id, UpdateBeastDto dto)
    {
        var beast = await _beasts.GetByIdAsync(id);
        if (beast is null) return null;

        beast.Name = dto.Name;
        beast.Region = dto.Region;
        beast.Description = dto.Description;
        beast.ImageUrl = dto.ImageUrl;
        await _beasts.SaveChangesAsync();
        return ToDto(beast);
    }
}