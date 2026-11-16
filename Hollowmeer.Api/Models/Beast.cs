namespace Hollowmeer.Api.Models;

public class Beast : IEntity
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int RegionId { get; set; }
    public Region Region { get; set; } = null!;
    public string Description { get; set; }
    public string ImageUrl { get; set; }

}