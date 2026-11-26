using Hollowmeer.Api.Models;

namespace Hollowmeer.Api.Dtos;

public static class BeastMapper
{
    public static BeastDto ToDto(Beast beast) => new()
    {
        Id = beast.Id,
        Name = beast.Name,
        Region =  new RegionDto
        {
            Id = beast.Region.Id,
            Name = beast.Region.Name
        },
        Description = beast.Description,
        ImageUrl = beast.ImageUrl
    };
}