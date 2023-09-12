using System;
using System.Collections.Generic;
using Chef.Data;
using Chef.ReadModels;
using Microsoft.AspNetCore.Mvc;

namespace Chef.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class OrderItemController : ControllerBase
    {
        private readonly Entities _entities;

        public OrderItemController(Entities entities)
        {
            _entities = entities ?? throw new ArgumentNullException(nameof(entities));
        }
    }


}
