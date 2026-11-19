using Hollowmeer.Api.Dtos;
using Hollowmeer.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Hollowmeer.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WeaponsController : ControllerBase
{
    private readonly IWeaponService _weapons;

    public WeaponsController(IWeaponService weapons)
    {
        _weapons = weapons;
    }

    [HttpGet]
    public async Task<ActionResult<List<WeaponDto>>> GetAll()
        => Ok(await _weapons.GetAllAsync());

    [HttpGet("{id:int}")]
    public async Task<ActionResult<WeaponDto>> GetById(int id)
    {
        var weapon = await _weapons.GetByIdAsync(id);
        return weapon is null ? NotFound() : Ok(weapon);
    }

    [HttpPost]
    public async Task<ActionResult<WeaponDto>> Create(CreateWeaponDto dto)
    {
        var created = await _weapons.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _weapons.DeleteAsync(id);
        return deleted ? NoContent() : NotFound();
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<WeaponDto>> Update(int id, UpdateWeaponDto dto)
    {
        var updated = await _weapons.UpdateAsync(id, dto);
        return updated is null ? NotFound() : Ok(updated);
    }
}