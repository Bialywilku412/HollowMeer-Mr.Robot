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
}