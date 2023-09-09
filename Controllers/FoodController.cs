using Chef.Data;
using Chef.Domain.Entities;
using Chef.Dtos;
using Chef.ReadModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;


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
        var food = _entities.Foods.SingleOrDefault(f => f.Id == id);  // I got error in this line

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


    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [ProducesResponseType(typeof(FoodRm), StatusCodes.Status200OK)]
    public async Task<ActionResult<FoodRm>> Edit(Guid id, FoodDto dto)
    {
        var food = await _entities.Foods.SingleOrDefaultAsync(f => f.Id == id);

        if (food == null)
            return NotFound();

        // Update the food item with the new values from the DTO
        food.Name = dto.Name;
        food.Description = dto.Description;
        food.ImageUrl = dto.ImageUrl;
        food.PreperationTime = dto.PreperationTime;
        food.Price = dto.Price;

        try
        {
            // Save changes to the database
            await _entities.SaveChangesAsync();
        }
        catch (DbUpdateException ex)
        {
            _logger.LogError(ex, "Error updating food item.");
            return StatusCode(StatusCodes.Status500InternalServerError);
        }

        var updatedFoodRm = new FoodRm(
            food.Id,
            food.Name,
            food.Description,
            food.ImageUrl,
            food.PreperationTime,
            food.Price
        );

        return Ok(updatedFoodRm);
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> Delete(Guid id)
    {
        var food = await _entities.Foods.SingleOrDefaultAsync(f => f.Id == id);

        if (food == null)
            return NotFound();

        try
        {
            // Remove the food item from the database
            _entities.Foods.Remove(food);
            await _entities.SaveChangesAsync();
        }
        catch (DbUpdateException ex)
        {
            _logger.LogError(ex, "Error deleting food item.");
            return StatusCode(StatusCodes.Status500InternalServerError);
        }

        return NoContent(); // 204 No Content when successfully deleted
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [ProducesResponseType(typeof(FoodRm), StatusCodes.Status201Created)]
    public async Task<ActionResult<FoodRm>> Create(FoodDto dto)
    {
        var newFood = new Food
        {
            Id = Guid.NewGuid(), 
            Name = dto.Name,
            Description = dto.Description,
            ImageUrl = dto.ImageUrl,
            PreperationTime = dto.PreperationTime,
            Price = dto.Price
        };

        try
        {
            _entities.Foods.Add(newFood);
            await _entities.SaveChangesAsync();
        }
        catch (DbUpdateException ex)
        {
            _logger.LogError(ex, "Error creating food item.");
            return StatusCode(StatusCodes.Status500InternalServerError);
        }

        var createdFoodRm = new FoodRm(
            newFood.Id, 
            newFood.Name,
            newFood.Description,
            newFood.ImageUrl,
            newFood.PreperationTime,
            newFood.Price
        );

        return CreatedAtAction(nameof(Find), new { id = newFood.Id }, createdFoodRm);
    }


}

