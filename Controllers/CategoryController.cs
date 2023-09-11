
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Chef.Data;
using Chef.Domain.Entities;
using Chef.Dtos;
using Chef.ReadModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Chef.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly Entities _entities;  // To inject the entities singleton
        private object _logger;

        public CategoryController(Entities entities)
        {
            _entities = entities;
        }



        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [HttpGet("{id}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        [ProducesResponseType(typeof(CategoryRm), 200)]
        public ActionResult<CategoryRm> Find(byte id)
        {
            var category = _entities.Categories.SingleOrDefault(c => c.Id == id);  // I got error in this line

            if (category == null)
                return NotFound();

            var readModel = new CategoryRm(
                category.Id,
                category.Name
                );

            return Ok(readModel);
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(typeof(IEnumerable<CategoryRm>), StatusCodes.Status200OK)]
        public ActionResult<IEnumerable<CategoryRm>> GetAllCategories()
        {
            try
            {
                var categories = _entities.Categories
                    .Select(category => new CategoryRm(category.Id, category.Name))
                    .ToList();

                return Ok(categories);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(typeof(CategoryRm), StatusCodes.Status201Created)]
        public ActionResult<CategoryRm> Create(CategoryDto categoryDto)
        {
            if (categoryDto == null)
            {
                return BadRequest("Invalid data provided.");
            }

            try
            {
                var category = new Category
                {
                    Id = categoryDto.Id,
                    Name = categoryDto.Name
                };

                _entities.Categories.Add(category);
                _entities.SaveChanges();

                var categoryRm = new CategoryRm(category.Id, category.Name);

                return CreatedAtAction(nameof(Find), new { id = category.Id }, categoryRm);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

    }
}

