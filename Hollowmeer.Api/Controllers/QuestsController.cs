using Hollowmeer.Api.Dtos;
using Hollowmeer.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Hollowmeer.Api.Controllers;
[ApiController]
[Route("api/[controller]")]
public class QuestsController : ControllerBase
{
    private readonly IQuestService _questService;
    public QuestsController(IQuestService questService)
    {
        _questService = questService;
    }
    [HttpGet]
    public async Task<ActionResult<List<QuestDto>>> GetAll()
        => Ok(await _questService.GetAllAsync());
    
    [HttpGet("{id:int}")]
    public async Task<ActionResult<QuestDto>> GetById(int id)
    {
        var quest = await _questService.GetByIdAsync(id);
        return quest is null ? NotFound() : Ok(quest);
    }
    [HttpPost]
    public async Task<ActionResult<QuestDto>> Create(CreateQuestDto dto)
    {
        var created = await _questService.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }
    [HttpPut("{id:int}")]
    public async Task<ActionResult<QuestDto>> Update(int id, CreateQuestDto dto)
    {
        var updated = await _questService.UpdateAsync(id, dto);
        return updated is null ? NotFound() : Ok(updated);
    }
    [HttpDelete("{id:int}")]
    public async Task<ActionResult<bool>> Delete(int id)
    {
        var deleted = await _questService.DeleteAsync(id);
        return deleted ? Ok(deleted) : NotFound();
    }

}