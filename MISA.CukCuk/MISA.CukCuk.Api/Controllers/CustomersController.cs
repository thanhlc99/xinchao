using Microsoft.AspNetCore.Mvc;
using MISA.ApplicationCore.Interfaces;
using MISA.ApplicationCore.Models;
using MISA.ApplicationCore.Enums;

namespace MISA.CukCuk.Api.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class CustomersController : BaseEntityController<Customer>
    {
        ICustomerService _customerService;
        public CustomersController(ICustomerService customerService):base(customerService)
        {
            _customerService = customerService;
        }

        /// <summary>
        /// lấy danh sách khách hàng theo các tiêu chí
        /// </summary>
        /// <param name="specs">theo mã, tên hoặc số điện thoại của khách hàng</param>
        /// <returns>Danh sách khách hàng theo các tiêu chí</returns>
        /// createdBy:MVThanh (15/01/2021)
        [HttpGet("filter")]
        public IActionResult GetCustomersFilter([FromQuery] string specs)
        {
            return Ok(_customerService.GetCustomersFilter(specs));
        }
        /// <summary>
        /// thực hiện lấy thông tin theo số trang truyền lên
        /// </summary>
        /// <param name="page">số trang</param>
        /// <returns>dữ liệu Json danh sách thông tin 10 khách hàng</returns>
        [HttpGet("pagination")]
        public IActionResult GetCustomerByPage([FromQuery] int page)
        {
            return Ok(_customerService.GetCustomerByPage(page));
        }
        /// <summary>
        /// thực hiện lấy số lượng bản ghi
        /// </summary>
        /// <returns>tổng số lượng bản ghi</returns>
        [HttpGet("count")]
        public IActionResult GetCountPage()
        {
            return Ok(_customerService.GetCustomerCount());
        }

    }
}
