using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Chef.Data;
using Chef.Domain.Entities;
using Chef.Dtos;
using Chef.ReadModels;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Chef.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ILogger<FoodController> _logger;
        private readonly Entities _entities;  // To inject the entities singleton

        public UserController(ILogger<FoodController> logger, Entities entities)
        {
            _logger = logger;
            _entities = entities;
        }

        [HttpGet]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        [ProducesResponseType(typeof(IEnumerable<UserRm>), 200)]
        public IEnumerable<UserRm> Search()
        {
            var UserRmList = _entities.Users.Select(user => new UserRm(
                user.Email,
                user.Password,
                user.Address
                ));

            return UserRmList;
        }

        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public IActionResult Register(UserDto dto)
        {
            // Check if a user with the same email already exists
            var existingUser = _entities.Users.FirstOrDefault(u => u.Email == dto.Email);
            if (existingUser != null)
            {
                return Conflict("User with this email already exists.");
            }

            _entities.Users.Add(
                new User(
                    dto.Email,
                    dto.Password,
                    dto.Address)
            );

            _entities.SaveChanges(); // Save the new user

            return CreatedAtAction(nameof(Find), new { email = dto.Email });
        }


        [HttpGet("{email}")]
        public ActionResult<UserRm> Find(string email)
        {
            var user = _entities.Users.FirstOrDefault(u => u.Email == email);

            if (user == null)
            {
                return NotFound();
            }


            var rm = new UserRm(
                    user.Email,
                    user.Password,
                    user.Address);

            return Ok(rm);
        }

        [HttpPost("{email}/basket")]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public IActionResult AddToBasket(string email, OrderItemDto dto)
        {
            // Check if the user exists
            var user = _entities.Users.FirstOrDefault(u => u.Email == email);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            // Create a new OrderItem and add it to the user's basket
            var orderItem = new OrderItem(
                Guid.NewGuid(), // You can generate a unique ID for the new order item
                dto.FoodItemId,
                dto.Amount,
                dto.Price
            );

            user.Basket.Add(orderItem);

            _entities.SaveChanges(); // Save changes to the user's basket

            return CreatedAtAction(nameof(Find), new { email }, dto); // Return a 201 Created response
        }


        [HttpGet("{email}/basket")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public ActionResult<IEnumerable<OrderItem>> GetUserBasket(string email)
        {
            // Check if the user exists
            var user = _entities.Users.FirstOrDefault(u => u.Email == email);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            // Return the user's basket as an IEnumerable<OrderItem>
            var basketItems = user.Basket;

            return Ok(basketItems);
        }


    }
}

