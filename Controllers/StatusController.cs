using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Chef.Data;
using Chef.ReadModels;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Chef.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class StatusController : Controller
    {

        private readonly Entities _entities;  // To inject the entities singleton
        private object _logger;

        public StatusController(Entities entities)
        {
            _entities = entities;
        }

        [HttpGet("{id}")]
        [ProducesResponseType(404)]
        [ProducesResponseType(200)]
        public ActionResult<StatusRm> GetStatusById(byte id)
        {
            // Find the status with the given ID in your data source (e.g., database)
            var status = _entities.Statuses.FirstOrDefault(s => s.Id == id);

            if (status == null)
            {
                return NotFound(); // Status not found
            }

            // Map the entity to your ReadModel (StatusRm)
            var statusRm = new StatusRm(status.Id, status.Name);

            return Ok(statusRm); // Return the status
        }


        [HttpGet("all")]
        [ProducesResponseType(200)]
        public ActionResult<IEnumerable<StatusRm>> GetAllStatuses()
        {
            // Retrieve all existing statuses from your data source (e.g., database)
            var statuses = _entities.Statuses.ToList();

            // Map the entities to your ReadModel (StatusRm)
            var statusRms = statuses.Select(status => new StatusRm(status.Id, status.Name));

            return Ok(statusRms); // Return the list of statuses
        }

    }

}

