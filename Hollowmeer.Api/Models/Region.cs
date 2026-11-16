namespace Hollowmeer.Api.Models;

public class Region : IEntity
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;

    public List<Beast> Beasts { get; set; } = [];
}