namespace Hollowmeer.Api.Models;

public class WeaponType : IEntity
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;

    public List<Weapon> Weapons { get; set; } = [];
}