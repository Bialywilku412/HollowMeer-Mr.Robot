using Hollowmeer.Api.Dtos;
using Hollowmeer.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Hollowmeer.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WeaponConditionsController : ControllerBase
{
    private readonly IWeaponConditionService _weaponConditions;

    public WeaponConditionsController(IWeaponConditionService weaponConditions)
    {
        _weaponConditions = weaponConditions;
    }

    [HttpGet]
    public async Task<ActionResult<List<WeaponConditionDto>>> GetAll()
        => Ok(await _weaponConditions.GetAllAsync());

    [HttpGet("{id:int}")]
    public async Task<ActionResult<WeaponConditionDto>> GetById(int id)
    {
        var weaponCondition = await _weaponConditions.GetByIdAsync(id);
        return weaponCondition is null ? NotFound() : Ok(weaponCondition);
    }
}