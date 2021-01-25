using Microsoft.AspNetCore.Mvc;
using MISA.ApplicationCore.Interfaces;
using MISA.ApplicationCore.Models;
using System;

namespace MISA.CukCuk.Api.Controllers
{
    /// <summary>
    /// điều khiển lấy dữ liệu bảng Employee
    /// </summary>
    public class EmployeesController : BaseEntityController<Employee>
    {

        IEmployeeService _employeeService;
        public EmployeesController(IEmployeeService employeeService) : base(employeeService)
        {
            _employeeService = employeeService;
        }
        /// <summary>
        /// lấy danh sách nhân viên theo các tiêu chí theo mã, tên hoặc số điện thoại của nhân viên
        /// </summary>
        /// <param name="specs">mã nhân viên, tên hoặc số điện thoại của nhân viên</param>
        /// <param name="departmentId">Id phòng ban</param>
        /// <param name="positionId">Id vị trí</param>
        /// <returns>Danh sách nhân viên</returns>
        /// CreatedBy:MVThanh (22/01/2021)
        [HttpGet("filters")]
        public IActionResult GetEmployeesFilter([FromQuery] string specs, [FromQuery] Guid? departmentId, [FromQuery] Guid? positionId)
        {
            return Ok(_employeeService.GetEmployeesFilter(specs, departmentId, positionId));
        }
        /// <summary>
        /// thực hiện lấy thông tin theo số trang truyền lên
        /// </summary>
        /// <param name="page">số trang</param>
        /// <returns>dữ liệu Json danh sách thông tin 10 khách hàng</returns>
        /// CreatedBy:MVThanh (22/01/2021)
        [HttpGet("paginations")]
        public IActionResult GetEmployeesByPage([FromQuery] int page)
        {
            return Ok(_employeeService.GetEmployeesByPage(page));
        }
        /// <summary>
        /// thực hiện lấy số lượng bản ghi
        /// </summary>
        /// <returns>tổng số lượng bản ghi</returns>
        /// CreatedBy:MVThanh (22/01/2021)
        [HttpGet("counts")]
        public IActionResult GetCountPage()
        {
            return Ok(_employeeService.GetEmployeeCount());
        }
        /// <summary>
        /// lấy ra mã nhân viên lớn nhất và thực hiện tự tăng lên 1 đơn vị
        /// </summary>
        /// <returns>trả về mã nhân viên đã tự tăng lên 1</returns>
        /// CreatedBy:MVThanh (24/01/2021)
        [HttpGet("maxs")]
        public IActionResult GetEmployeeCodeMax()
        {
            return Ok(_employeeService.GetEmployeeCodeMax());
        }

    }
}
