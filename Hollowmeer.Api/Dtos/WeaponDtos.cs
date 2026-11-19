using System.ComponentModel.DataAnnotations;

namespace Hollowmeer.Api.Dtos;

public record WeaponDto
{
    public int Id { get; init; }
    public string Name { get; init; } = string.Empty;
    public WeaponTypeDto WeaponType { get; init; } = null!;
    public WeaponConditionDto WeaponCondition { get; init; } = null!;
    public bool isDangerous { get; init; }
    public string Note { get; init; } = string.Empty;
}

public record CreateWeaponDto
{
    [Required]
    [StringLength(100, MinimumLength = 3)]
    public string Name { get; init; } = string.Empty;
    [Required]
    public int WeaponTypeId { get; init; }
    [Required]
    public int WeaponConditionId { get; init; }
    [Required]
    public bool isDangerous { get; init; }
    public string Note { get; init; } = string.Empty;
}

public record UpdateWeaponDto
{
    [Required]
    [StringLength(100, MinimumLength = 3)]
    public string Name { get; init; } = string.Empty;
    [Required]
    public int WeaponTypeId { get; init; }
    [Required]
    public int WeaponConditionId { get; init; }
    [Required]
    public bool isDangerous { get; init; }
    public string Note { get; init; } = string.Empty;
}