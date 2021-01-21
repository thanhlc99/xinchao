using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Interfaces
{
    public interface ICustomerService:IBaseService<Customer>
    {
        /// <summary>
        /// lấy danh sách khách hàng theo các tiêu chí theo mã, tên hoặc số điện thoại của khách hàng
        /// </summary>
        /// <param name="specs">mã khách hàng, tên hoặc số điện thoại của khách hàng</param>
        /// <returns>Danh sách khách hàng theo các tiêu chí</returns>
        /// createdBy:MVThanh (15/01/2021)
        List<Customer> GetCustomersFilter(string specs);

        /// <summary>
        /// Lấy danh sách theo số trang truyền vào
        /// </summary>
        /// <param name="page">số trang</param>
        /// <returns>Danh sách 10 phần tử</returns>
        IEnumerable<Customer> GetCustomerByPage(int page);
        /// <summary>
        /// lấy tổng số bản ghi trong database
        /// </summary>
        /// <returns></returns>
        int GetCustomerCount();
    }
}
