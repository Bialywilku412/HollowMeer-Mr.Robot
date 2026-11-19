namespace Hollowmeer.Api.Dtos;

public record WeaponTypeDto
{
    public int Id { get; init; }
    public string Name { get; init; } = string.Empty;
}
