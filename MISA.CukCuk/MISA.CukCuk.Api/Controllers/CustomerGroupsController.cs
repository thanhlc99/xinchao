using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MISA.ApplicationCore.Interfaces;
using MISA.ApplicationCore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.CukCuk.Api.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class CustomerGroupsController : BaseEntityController<CustomerGroup>
    {
        IBaseService<CustomerGroup> _baseService;
        public CustomerGroupsController(IBaseService<CustomerGroup> baseService):base(baseService)
        {
            _baseService = baseService;
        }

    }
}
