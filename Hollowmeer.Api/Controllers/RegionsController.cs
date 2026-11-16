using Hollowmeer.Api.Dtos;
using Hollowmeer.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Hollowmeer.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RegionsController : ControllerBase
{
    private readonly IRegionService _regions;

    public RegionsController(IRegionService regions)
    {
        _regions = regions;
    }

    [HttpGet]
    public async Task<ActionResult<List<RegionDto>>> GetAll()
        => Ok(await _regions.GetAllAsync());

    [HttpGet("{id:int}")]
    public async Task<ActionResult<RegionDto>> GetById(int id)
    {
        var region = await _regions.GetByIdAsync(id);
        return region is null ? NotFound() : Ok(region);
    }
}