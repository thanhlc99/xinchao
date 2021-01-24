using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Interfaces
{
    public interface IEmployeeService:IBaseService<Employee>
    {
        /// <summary>
        /// lấy danh sách nhân viên theo các tiêu chí theo mã, tên hoặc số điện thoại của nhân viên
        /// </summary>
        /// <param name="specs">mã nhân viên, tên hoặc số điện thoại của nhân viên</param>
        /// <param name="departmentId">Id phòng ban</param>
        /// <param name="positionId">Id vị trí</param>
        /// <returns>Danh sách nhân viên</returns>
        /// CreatedBy:MVThanh (22/01/2021)
        List<Employee> GetEmployeesFilter(string specs, Guid? departmentId, Guid? positionId);
        /// <summary>
        /// Lấy danh sách theo số trang truyền vào
        /// </summary>
        /// <param name="pager">số trang</param>
        /// <returns>Danh sách 10 phần tử</returns>
        /// CreatedBy:MVThanh (22/01/2021)
        IEnumerable<Employee> GetEmployeesByPage(int pager);
        /// <summary>
        /// lấy tổng số bản ghi trong database
        /// </summary>
        /// <returns>tổng số bản ghi trong database</returns>
        /// CreatedBy:MVThanh (22/01/2021)
        int GetEmployeeCount();
        /// <summary>
        /// Lấy ra mã nhân viên là lớn nhất
        /// </summary>
        /// <returns> mã nhân viên lớn nhất</returns>
        /// CreatedBy MVThanh(24/01/2021)
        string GetEmployeeCodeMax();
    }
}
