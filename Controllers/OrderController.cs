using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.NetworkInformation;
using System.Threading.Tasks;
using Chef.Data;
using Chef.Domain.Entities;
using Chef.Dtos;
using Chef.ReadModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Chef.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly Entities _entities;  // To inject the entities singleton

        public OrderController(Entities entities)
        {
            _entities = entities;
        }


        [HttpGet]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        [ProducesResponseType(typeof(IEnumerable<OrderRm>), 200)]
        public IEnumerable<OrderRm> Search()
        {
            var orderRmList = _entities.Orders.Select(order => new OrderRm(
                order.OrderId,
                order.FoodId,
                order.OrderOwner,
                order.Amount,
                order.Address,
                order.Status
                ));

            return orderRmList;
        }


        [HttpGet("list/{email}")]
        [ProducesResponseType(500)]
        [ProducesResponseType(400)]
        [ProducesResponseType(typeof(IEnumerable<OrderRm>), 200)]
        public ActionResult<IEnumerable<OrderRm>> List(string email)
        {
            var orders = _entities.Orders.ToArray()
                                    .Where(o => o.OrderOwner == email)
                                    .Select(o => new OrderRm(
                                         o.OrderId,
                                         o.FoodId,
                                         o.OrderOwner,
                                         o.Amount,
                                         o.Address,
                                         o.Status));
            return Ok(orders);
        }

        [HttpGet("{email}")]
        [ProducesResponseType(500)]
        [ProducesResponseType(400)]
        [ProducesResponseType(typeof(OrderRm), 200)]
        public ActionResult<OrderRm> Find(string email)
        {
            var order = _entities.Orders.FirstOrDefault(o => o.OrderOwner == email);
            if (order == null)
            {
                return NotFound();
            }

            var orderRm = new OrderRm(
                order.OrderId,
                order.FoodId,
                order.OrderOwner,
                order.Amount,
                order.Address,
                order.Status);

            return Ok(orderRm);
        }


        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public IActionResult Buy(OrderDto dto)
        {
            _entities.Orders.Add(
                new Order(
                    dto.OrderId,
                    dto.FoodId,
                    dto.OrderOwner,
                    dto.Amount,
                    dto.Address,
                    dto.Status)
            );

            _entities.SaveChanges(); // very important

            return CreatedAtAction(nameof(Find), new { id = dto.OrderId });
        }


        [HttpPost("{id}")]
        [ProducesResponseType(500)]
        [ProducesResponseType(400)]
        [ProducesResponseType(typeof(OrderRm), 200)]
        public ActionResult<OrderRm> FindById(string id, string status)
        {
            var order = _entities.Orders.FirstOrDefault(o => o.OrderId == id);
            if (order == null)
            {
                return NotFound();
            }

            // Update the order status with the new status
            order.Status = status;
            _entities.SaveChanges(); // Save changes to the database

            var orderRm = new OrderRm(
                order.OrderId,
                order.FoodId,
                order.OrderOwner,
                order.Amount,
                order.Address,
                order.Status);

            return Ok(orderRm);
        }

    }
}

