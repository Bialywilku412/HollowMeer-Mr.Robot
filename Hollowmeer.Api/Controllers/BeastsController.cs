using Hollowmeer.Api.Dtos;
using Hollowmeer.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Hollowmeer.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BeastsController : ControllerBase
{
    private readonly IBeastService _beasts;

    public BeastsController(IBeastService beasts)
    {
        _beasts = beasts;
    }

    [HttpGet]
    public async Task<ActionResult<List<BeastDto>>> GetAll()
        => Ok(await _beasts.GetAllAsync());

    [HttpGet("{id:int}")]
    public async Task<ActionResult<BeastDto>> GetById(int id)
    {
        var beast = await _beasts.GetByIdAsync(id);
        return beast is null ? NotFound() : Ok(beast);
    }

    [HttpPost]
    public async Task<ActionResult<BeastDto>> Create(CreateBeastDto dto)
    {
        var created = await _beasts.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _beasts.DeleteAsync(id);
        return deleted ? NoContent() : NotFound();
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<BeastDto>> Update(int id, UpdateBeastDto dto)
    {
        var updated = await _beasts.UpdateAsync(id, dto);
        return updated is null ? NotFound() : Ok(updated);
    }
}