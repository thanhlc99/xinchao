using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Enums;
using MISA.ApplicationCore.Interfaces;
using MISA.ApplicationCore.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Services
{
    public class CustomerService : BaseService<Customer>, ICustomerService
    {
        #region Declare
        ICustomerRepository _customerRepository;
        #endregion

        #region constructor
        public CustomerService(ICustomerRepository customerRepository):base(customerRepository)
        {
            _customerRepository = customerRepository;
        }
        #endregion

        #region method
        public List<Customer> GetCustomersFilter(string specs)
        {
            return _customerRepository.GetCustomersFilter(specs);
        }

        public IEnumerable<Customer> GetCustomersByPage(int page)
        {
            Pager p = new Pager(page);
            return _customerRepository.GetCustomersByPage(p);
        }

        public int GetCustomerCount()
        {
            return _customerRepository.GetCustomerCount();
        }
        #endregion
    }
}
