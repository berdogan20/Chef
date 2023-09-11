using Chef.Data;
using Chef.Domain.Entities;
using Chef.Dtos;
using Chef.ReadModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chef.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly Entities _entities;

        public OrderController(Entities entities)
        {
            _entities = entities ?? throw new ArgumentNullException(nameof(entities));
        }

        [HttpGet]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        [ProducesResponseType(typeof(IEnumerable<OrderRm>), 200)]
        public async Task<ActionResult<IEnumerable<OrderRm>>> Search()
        {
            var orderRmList = await _entities.Orders
                .Select(order => new OrderRm(
                    order.OrderId,
                    order.OrderDate,
                    order.OrderOwner,
                    order.Address,
                    order.Status))
                .ToListAsync();

            return Ok(orderRmList);
        }

        [HttpGet("list/{email}")]
        [ProducesResponseType(500)]
        [ProducesResponseType(400)]
        [ProducesResponseType(typeof(IEnumerable<OrderRm>), 200)]
        public async Task<ActionResult<IEnumerable<OrderRm>>> List(string email)
        {
            var orders = await _entities.Orders
                .Where(o => o.OrderOwner == email)
                .Select(o => new OrderRm(
                    o.OrderId,
                    o.OrderDate,
                    o.OrderOwner,
                    o.Address,
                    o.Status))
                .ToListAsync();

            return Ok(orders);
        }

        [HttpGet("{email}")]
        [ProducesResponseType(500)]
        [ProducesResponseType(400)]
        [ProducesResponseType(typeof(OrderRm), 200)]
        public async Task<ActionResult<OrderRm>> Find(string email)
        {
            var order = await _entities.Orders.FirstOrDefaultAsync(o => o.OrderOwner == email);
            if (order == null)
            {
                return NotFound();
            }

            var orderRm = new OrderRm(
                    order.OrderId,
                    order.OrderDate,
                    order.OrderOwner,
                    order.Address,
                    order.Status);

            return Ok(orderRm);
        }

        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> Buy(OrderDto dto)
        {
            _entities.Orders.Add(
                new Order(
                    dto.OrderId,
                    dto.OrderDate,
                    dto.OrderOwner,
                    dto.Address,
                    dto.Status)
            );

            try
            {
                await _entities.SaveChangesAsync(); // Use async SaveChanges
            }
            catch (DbUpdateException ex)
            {
                // Handle database update exception here
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }

            return CreatedAtAction(nameof(Find), new { id = dto.OrderId });
        }

        [HttpPost("{id}")]
        [ProducesResponseType(500)]
        [ProducesResponseType(400)]
        [ProducesResponseType(typeof(OrderRm), 200)]
        public async Task<ActionResult<OrderRm>> FindById(string id, string status)
        {
            var order = await _entities.Orders.FirstOrDefaultAsync(o => o.OrderId == id);
            if (order == null)
            {
                return NotFound();
            }

            // Update the order status with the new status
            order.Status = status;

            try
            {
                await _entities.SaveChangesAsync(); // Use async SaveChanges
            }
            catch (DbUpdateException ex)
            {
                // Handle database update exception here
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }

            var orderRm = new OrderRm(
                    order.OrderId,
                    order.OrderDate,
                    order.OrderOwner,
                    order.Address,
                    order.Status);

            return Ok(orderRm);
        }
    }
}
