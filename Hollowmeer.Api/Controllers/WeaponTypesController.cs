using Hollowmeer.Api.Dtos;
using Hollowmeer.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Hollowmeer.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WeaponTypesController : ControllerBase
{
    private readonly IWeaponTypeService _weaponTypes;

    public WeaponTypesController(IWeaponTypeService weaponTypes)
    {
        _weaponTypes = weaponTypes;
    }

    [HttpGet]
    public async Task<ActionResult<List<WeaponTypeDto>>> GetAll()
        => Ok(await _weaponTypes.GetAllAsync());

    [HttpGet("{id:int}")]
    public async Task<ActionResult<WeaponTypeDto>> GetById(int id)
    {
        var weaponType = await _weaponTypes.GetByIdAsync(id);
        return weaponType is null ? NotFound() : Ok(weaponType);
    }
}