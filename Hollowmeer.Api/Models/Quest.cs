namespace Hollowmeer.Api.Models;

public class Quest : IEntity
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public int Date { get; set; }

}