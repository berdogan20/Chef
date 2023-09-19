using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Chef.Data;
using Chef.Domain.Entities;
using Chef.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Chef.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BasketItemController : Controller
    {
        private readonly Entities _entities;

        public BasketItemController(Entities entities)
        {
            _entities = entities ?? throw new ArgumentNullException(nameof(entities));
        }

        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> AddBasketItem(BasketItemDto dto)
        {
            /*Method to Add a New BasketItem:*/

            try
            {
                var basketItem = new BasketItem(
                    Guid.NewGuid(), 
                    dto.Email,
                    dto.FoodId,
                    dto.Amount,
                    dto.Price);

                _entities.BasketItems.Add(basketItem);
                await _entities.SaveChangesAsync();

                return CreatedAtAction(nameof(AddBasketItem), new { email = dto.Email });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

        [HttpDelete]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> RemoveBasketItem(string email, string foodId)
        {
            /*Method to Remove a BasketItem:*/

            try
            {
                var basketItem = await _entities.BasketItems
                    .FirstOrDefaultAsync(item => item.Email == email && item.FoodId == foodId);

                if (basketItem != null)
                {
                    _entities.BasketItems.Remove(basketItem);
                    await _entities.SaveChangesAsync();
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

        [HttpGet("{email}")]
        [ProducesResponseType(500)]
        [ProducesResponseType(400)]
        [ProducesResponseType(typeof(IEnumerable<BasketItem>), 200)]
        public async Task<ActionResult<IEnumerable<BasketItem>>> GetBasketItems(string email)
        {
            /*Method to Retrieve BasketItems by Email:*/

            try
            {
                var basketItems = await _entities.BasketItems
                    .Where(item => item.Email == email)
                    .ToListAsync();

                return Ok(basketItems);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

        [HttpDelete("{email}")]
        [ProducesResponseType(500)]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        public async Task<IActionResult> DeleteBasketItemsByEmail(string email)
        {
            try
            {
                // Find all BasketItems with the given email
                var basketItemsToDelete = await _entities.BasketItems
                    .Where(bi => bi.Email == email)
                    .ToListAsync();

                if (basketItemsToDelete == null || !basketItemsToDelete.Any())
                {
                    return NoContent(); // No BasketItems found for the given email
                }

                // Remove the BasketItems from the DbSet
                _entities.BasketItems.RemoveRange(basketItemsToDelete);

                // Save changes to the database
                await _entities.SaveChangesAsync();

                return NoContent(); // Successfully deleted BasketItems
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }


    }


}

