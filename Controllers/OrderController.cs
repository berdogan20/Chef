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
                .Select(order => new OrderRm(
                    order.OrderId,
                    order.OrderDate,
                    order.OrderOwner,
                    order.Address,
                    order.StatusId,
                    order.TotalPayment)
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
                .Where(o => o.OrderOwner == email)
                .Select(o => new OrderRm(
                    o.OrderId,
                    o.OrderDate,
                    o.OrderOwner,
                    o.Address,
                    o.StatusId,
                    o.TotalPayment))
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
                    order.TotalPayment);

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
                    dto.TotalPayment);


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
            try
            {
                // Retrieve the order items with the specific orderId
                var orderItems = await _entities.OrderItems
                    .Where(oi => oi.OrderId == orderId)
                    .ToListAsync();

                if (orderItems == null || !orderItems.Any())
                {
                    return NotFound(); // No order items found for the given orderId
                }

                return Ok(orderItems);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

        [HttpGet("byOrderId/{orderId}")]
        [ProducesResponseType(500)]
        [ProducesResponseType(400)]
        [ProducesResponseType(typeof(OrderRm), 200)]
        public async Task<ActionResult<OrderRm>> GetOrderByOrderId(Guid orderId)
        {
            /* To retrieve an order by orderId */

            var order = await _entities.Orders
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
                order.TotalPayment);

            return Ok(orderRm);
        }


        [HttpPut("{orderId}/status")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<OrderRm>> UpdateOrderStatus(Guid orderId, OrderDto dto)
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
                order.TotalPayment);

            return Ok(updatedOrderRm); // Successfully updated
        }


        [HttpPost("convert")]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> ConvertBasketItemsToOrderItems(string email, [FromBody] OrderDto orderDto)
        {
            try
            {
                // Find all basket items with the given email
                var basketItems = await _entities.BasketItems
                    .Where(basketItem => basketItem.Email == email)
                    .ToListAsync();

                if (basketItems == null || !basketItems.Any())
                {
                    return BadRequest("No basket items found for the provided email.");
                }

                // Convert basket items to order items and remove them from the basket
                foreach (var basketItem in basketItems)
                {
                    var orderItem = new OrderItem
                    {
                        OrderId = orderDto.OrderId.ToString(),
                        OrderItemId = Guid.NewGuid(),
                        FoodItemId = basketItem.FoodId,
                        Amount = basketItem.Amount,
                        Price = basketItem.Price
                    };

                    // Add the order item to the database
                    _entities.OrderItems.Add(orderItem);

                    // Remove the basket item
                    _entities.BasketItems.Remove(basketItem);
                }

                // Save changes to the database
                await _entities.SaveChangesAsync();

                return CreatedAtAction(nameof(Find), new { email = email });
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }



    }
}
