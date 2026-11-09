namespace Hollowmeer.Api.Dtos;

public record QuestDto
{
    public int Id { get; init; }
    public string Name { get; init; }
    public string Host { get; init; }
    public string Description { get; init; }
    public int Date { get; init; }
}

public record CreateQuestDto
{
    public string Name { get; init; }
    public string Host { get; init; }
    public string Description { get; init; }
    public int Date { get; init; }
}
