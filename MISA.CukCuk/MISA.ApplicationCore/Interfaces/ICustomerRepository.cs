using MISA.ApplicationCore.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Interfaces
{
    public interface ICustomerRepository:IBaseRepository<Customer>
    {
        /// <summary>
        /// Lấy thông tin khách hàng theo mã khách hàng
        /// </summary>
        /// <param name="customerCode">mã khách hàng</param>
        /// <returns>thông tin của một khách hàng</returns>
        /// CreatedBy MVThanh(15/01/2021)
        Customer GetCustomerByCode(string customerCode);

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
        /// <param name="pager">số trang</param>
        /// <returns>Danh sách 10 phần tử</returns>
        IEnumerable<Customer> GetCustomerByPage(Pager page);
        /// <summary>
        /// lấy tổng số bản ghi trong database
        /// </summary>
        /// <returns></returns>
        int GetCustomerCount();

    }
}
