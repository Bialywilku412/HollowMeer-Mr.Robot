namespace Hollowmeer.Api.Dtos;

public record BeastDto
{
    public int Id { get; init; }
    public string Name { get; init; }
    public string Region { get; init; }
    public string Description { get; init; }
    public string ImageUrl { get; init; }
}