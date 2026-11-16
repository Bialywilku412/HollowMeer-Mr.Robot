namespace Hollowmeer.Api.Dtos;

public record BeastDto
{
    public int Id { get; init; }
    public string Name { get; init; } = string.Empty;
    public RegionDto Region { get; init; } = null!;
    public string Description { get; init; }
    public string ImageUrl { get; init; }
}

public record CreateBeastDto
{
    public string Name { get; init; } = string.Empty;
    public int RegionId { get; init; }
    public string Description { get; init; }
    public string ImageUrl { get; init; }
}

public record UpdateBeastDto
{
    public string Name { get; init; } = string.Empty;
    public int RegionId { get; init; }
    public string Description { get; init; }
    public string ImageUrl { get; init; }
}