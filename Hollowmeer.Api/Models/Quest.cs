namespace Hollowmeer.Api.Models;

public class Quest : IEntity
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Host { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public int Date { get; set; }
}