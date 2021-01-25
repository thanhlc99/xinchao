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
    /// Quản lý các api thao tác với  bảng PositionGroups
    /// </summary>
    public class PositionGroupsController : BaseEntityController<PositionGroup>
    {

        #region Declare
        IBaseService<PositionGroup> _baseService;
        #endregion

        #region constructor
        public PositionGroupsController(IBaseService<PositionGroup> baseService):base(baseService)
        {
            _baseService = baseService;
        }
        #endregion

    }
}
