namespace Hollowmeer.Api.Models;

public class Weapon : IEntity
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int WeaponTypeId { get; set; }
    public WeaponType WeaponType { get; set; } = null!;
    public int WeaponConditionId { get; set; }
    public WeaponCondition WeaponCondition { get; set; } = null!;
    public bool isDangerous { get; set; }
    public string Note { get; set; } = string.Empty;
}