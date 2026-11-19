namespace Hollowmeer.Api.Dtos;

public record WeaponConditionDto
{
    public int Id { get; init; }
    public string Name { get; init; } = string.Empty;
}
