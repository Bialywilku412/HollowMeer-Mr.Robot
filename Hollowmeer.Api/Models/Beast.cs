namespace Hollowmeer.Api.Models;

public class Beast : IEntity
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Region { get; set; }
    public string Description { get; set; }
    public string ImageUrl { get; set; }
}