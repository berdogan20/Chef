
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Chef.Data;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Chef.Controllers
{
    [Route("[controller]")]
    public class CategoryController : Controller
    {
        private readonly Entities _entities;  // To inject the entities singleton

        public CategoryController(Entities entities)
        {
            _entities = entities;
        }
    }
}

