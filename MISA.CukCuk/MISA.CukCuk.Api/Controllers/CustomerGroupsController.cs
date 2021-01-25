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
    /// <summary>
    /// điều khiển lấy dữ liệu bảng CustomerGroups
    /// </summary>
    public class CustomerGroupsController : BaseEntityController<CustomerGroup>
    {
        #region Declare
        IBaseService<CustomerGroup> _baseService;
        #endregion

        #region constructor
        public CustomerGroupsController(IBaseService<CustomerGroup> baseService):base(baseService)
        {
            _baseService = baseService;
        }
        #endregion
    }
}
