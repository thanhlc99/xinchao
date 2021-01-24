using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;
using MISA.ApplicationCore.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Services
{
    public class EmployeeService : BaseService<Employee>, IEmployeeService
    {
        IEmployeeRepository _employeeRepository;

        #region constructor
        public EmployeeService(IEmployeeRepository employeeRepository):base(employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        #endregion

        #region method
        public List<Employee> GetEmployeesFilter(string specs, Guid? departmentId, Guid? positionId)
        {
            return _employeeRepository.GetEmployeesFilter(specs,departmentId,positionId);
        }

        public string GetEmployeeCodeMax()
        {
           
                var employeeCode = "NV"+(_employeeRepository.GetEmployeeCodeMax() + 1);
                return employeeCode;
          
        }

        public int GetEmployeeCount()
        {
            return _employeeRepository.GetEmployeeCount();
        }

        public IEnumerable<Employee> GetEmployeesByPage(int pager)
        {
            Pager p = new Pager(pager);
            return _employeeRepository.GetEmployeesByPage(p);
        }

        #endregion

    }
}
