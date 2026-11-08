using Hollowmeer.Api.Dtos;
using Hollowmeer.Api.Models;
using Hollowmeer.Api.Repositories;


namespace Hollowmeer.Api.Services;

public class QuestService : IQuestService
{
    private readonly IRepository<Quest> _quests;

    public QuestService(IRepository<Quest> quests)
    {
        _quests = quests;
    }

    public async Task<List<QuestDto>> GetAllAsync()
    {
        var quests = await _quests.GetAllAsync();
        return quests.Select(q => new QuestDto
        {
            Id = q.Id,
            Name = q.Name,
            Description = q.Description,
            Date = q.Date
        }).ToList();
    }
    public async Task<QuestDto?> GetByIdAsync(int id)
    {
        var quest = await _quests.GetByIdAsync(id);
        return quest is null ? null : ToDto(quest);
    }

    public async Task<QuestDto> CreateAsync(CreateQuestDto createQuestDto)
    {
        var quest = new Quest
        {
            Name = createQuestDto.Name,
            Description = createQuestDto.Description,
            Date = createQuestDto.Date
        };
         _quests.Add(quest);
        await _quests.SaveChangesAsync();

        return ToDto(quest);
    } 
    public async Task<QuestDto?> UpdateAsync(int id, CreateQuestDto updateQuestDto)
    {
        var quest = await _quests.GetByIdAsync(id);
        if (quest is null)
            return null;

        quest.Name = updateQuestDto.Name;
        quest.Description = updateQuestDto.Description;
        quest.Date = updateQuestDto.Date;

        await _quests.SaveChangesAsync();

        return ToDto(quest);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var quest = await _quests.GetByIdAsync(id);
        if (quest is null)
            return false;

        _quests.Delete(quest);
        await _quests.SaveChangesAsync();

        return true;
    }


    private static QuestDto ToDto(Quest quest)
    {
        return new QuestDto
        {
            Id = quest.Id,
            Name = quest.Name,
            Description = quest.Description,
            Date = quest.Date
        };
    }

}