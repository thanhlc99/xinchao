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
    /// Quản lý các api thao tác với  bảng DepartmentGroups
    /// </summary>
    public class DepartmentGroupsController : BaseEntityController<DepartmentGroup>
    {
        #region Declare
        IBaseService<DepartmentGroup> _baseService;
        #endregion

        #region constructor
        public DepartmentGroupsController(IBaseService<DepartmentGroup> baseService):base(baseService)
        {
            _baseService = baseService;
        }
        #endregion
    }
}
