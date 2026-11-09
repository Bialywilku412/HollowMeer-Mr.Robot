using Hollowmeer.Api.Dtos;

namespace Hollowmeer.Api.Services;

public interface IQuestService
{
    Task<List<QuestDto>> GetAllAsync();

    Task<QuestDto?> GetByIdAsync(int id);

    Task<QuestDto> CreateAsync(CreateQuestDto createQuestDto);

    Task<QuestDto?> UpdateAsync(int id, CreateQuestDto updateQuestDto);

    Task<bool> DeleteAsync(int id);
}
