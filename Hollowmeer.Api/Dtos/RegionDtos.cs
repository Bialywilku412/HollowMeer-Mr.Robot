namespace Hollowmeer.Api.Dtos;

public record RegionDto
{
    public int Id { get; init; }
    public string Name { get; init; } = string.Empty;
}
