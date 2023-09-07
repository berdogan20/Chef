using Chef.Data;
using Chef.ReadModels;
using Microsoft.AspNetCore.Mvc;

namespace Chef.Controllers;

[ApiController]
[Route("[controller]")]
public class FoodController : ControllerBase
{

    private readonly ILogger<FoodController> _logger;
    private readonly Entities _entities;  // To inject the entities singleton

    public FoodController(ILogger<FoodController> logger, Entities entities)
    {
        _logger = logger;
        _entities = entities;
    }

    [HttpGet]
    [ProducesResponseType(400)]
    [ProducesResponseType(500)]
    [ProducesResponseType(typeof(IEnumerable<FoodRm>), 200)]
    public IEnumerable<FoodRm> Search()
    {
        var FoodRmList = _entities.Foods.Select(food => new FoodRm(
            food.Id,
            food.Name,
            food.Description,
            food.ImageUrl,
            food.PreperationTime,
            food.Price
            ));

        return FoodRmList;
    }

    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [HttpGet("{id}")]
    [ProducesResponseType(400)]
    [ProducesResponseType(500)]
    [ProducesResponseType(typeof(FoodRm), 200)]
    public ActionResult<FoodRm> Find(Guid id)
    {
        var food = _entities.Foods.SingleOrDefault(f => f.Id == id);

        if (food == null)
            return NotFound();

        var readModel = new FoodRm(
            food.Id,
            food.Name,
            food.Description,
            food.ImageUrl,
            food.PreperationTime,
            food.Price
            );

        return Ok(readModel);
    }

}

