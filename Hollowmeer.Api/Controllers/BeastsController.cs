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
}