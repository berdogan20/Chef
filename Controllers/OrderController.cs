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
            /* To list all orders*/

            var orderRmList = await _entities.Orders
                .AsNoTracking()
                .Include(o => o.OrderItems)
                .Select(order => new OrderRm(
                    order.OrderId,
                    order.OrderDate,
                    order.OrderOwner,
                    order.Address,
                    order.StatusId,
                    order.TotalPayment,
                    order.OrderItems)
         )
                .ToListAsync();

            return Ok(orderRmList);
        }

        [HttpGet("list/{email}")]
        [ProducesResponseType(500)]
        [ProducesResponseType(400)]
        [ProducesResponseType(typeof(IEnumerable<OrderRm>), 200)]
        public async Task<ActionResult<IEnumerable<OrderRm>>> List(string email)
        {

            /* To list all orders of a specific user*/

            var orders = await _entities.Orders
                .AsNoTracking()
                .Include(o => o.OrderItems)
                .Where(o => o.OrderOwner == email)
                .Select(o => new OrderRm(
                    o.OrderId,
                    o.OrderDate,
                    o.OrderOwner,
                    o.Address,
                    o.StatusId,
                    o.TotalPayment,
                    o.OrderItems))
                .ToListAsync();

            return Ok(orders);
        }

        [HttpGet("{email}")]
        [ProducesResponseType(500)]
        [ProducesResponseType(400)]
        [ProducesResponseType(typeof(OrderRm), 200)]
        public async Task<ActionResult<OrderRm>> Find(string email)
        {
            var order = await _entities.Orders
                .AsNoTracking()
                .Include(o => o.OrderItems)
                .FirstOrDefaultAsync(o => o.OrderOwner == email);
            if (order == null)
            {
                return NotFound();
            }

            var orderRm = new OrderRm(
                    order.OrderId,
                    order.OrderDate,
                    order.OrderOwner,
                    order.Address,
                    order.StatusId,
                    order.TotalPayment,
                    order.OrderItems);

            return Ok(orderRm);
        }

        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> Buy( OrderDto dto)
        {
            /* To buy a specific order*/

            var order = new Order(
                    dto.OrderId,
                    dto.OrderDate,
                    dto.OrderOwner,
                    dto.Address,
                    dto.StatusId,
                    dto.TotalPayment,
                    dto.OrderItems);


            _entities.Orders
                .Add(order);

            try
            {
                await _entities.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }

            return CreatedAtAction(nameof(Find), new { id = dto.OrderId });
        }

      

        [HttpGet("{orderId}/items")]
        [ProducesResponseType(500)]
        [ProducesResponseType(400)]
        [ProducesResponseType(typeof(IEnumerable<OrderItem>), 200)]
        public async Task<ActionResult<IEnumerable<OrderItem>>> GetOrderItems(string orderId)
        {

            /* To return order items of a specific order*/

            var order = await _entities.Orders
                .AsNoTracking()
                .Include(o => o.OrderItems) 
                .FirstOrDefaultAsync(o => o.OrderId == orderId);

            if (order == null)
            {
                return NotFound();
            }

            return Ok(order.OrderItems);
        }

        [HttpGet("byOrderId/{orderId}")]
        [ProducesResponseType(500)]
        [ProducesResponseType(400)]
        [ProducesResponseType(typeof(OrderRm), 200)]
        public async Task<ActionResult<OrderRm>> GetOrderByOrderId(string orderId)
        {
            /* To retrieve an order by orderId */

            var order = await _entities.Orders
                .AsNoTracking()
                .Include(o => o.OrderItems)
                .FirstOrDefaultAsync(o => o.OrderId == orderId);

            if (order == null)
            {
                return NotFound();
            }

            var orderRm = new OrderRm(
                order.OrderId,
                order.OrderDate,
                order.OrderOwner,
                order.Address,
                order.StatusId,
                order.TotalPayment,
                order.OrderItems);

            return Ok(orderRm);
        }


        [HttpPut("{orderId}/status")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<OrderRm>> UpdateOrderStatus(string orderId, OrderDto dto)
        {
            /* To update the statusId of a specific order */

            var order = await _entities.Orders.FirstOrDefaultAsync(o => o.OrderId == orderId);

            if (order == null)
            {
                return NotFound(); // Order not found
            }

            order.StatusId = dto.StatusId; // Update the statusId

            try
            {
                await _entities.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }

            var updatedOrderRm =  new OrderRm(
                order.OrderId,
                order.OrderDate,
                order.OrderOwner,
                order.Address,
                order.StatusId,
                order.TotalPayment,
                order.OrderItems);

            return Ok(updatedOrderRm); // Successfully updated
        }


    }
}
