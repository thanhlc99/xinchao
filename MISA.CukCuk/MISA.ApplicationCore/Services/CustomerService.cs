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
        ICustomerRepository _customerRepository;
        #region constructor
        public CustomerService(ICustomerRepository customerRepository):base(customerRepository)
        {
            _customerRepository = customerRepository;
        }

       
        #endregion

        //public override int Add(Customer entity)
        //{
        //    //validate thông tin
        //    var isValid = true;
        //    //check trùng mã khách hàng
        //    var customerDuplicate = _customerRepository.GetCustomerByCode(entity.CustomerCode);
        //    if(customerDuplicate!=null)
        //    {
        //        isValid = false;
        //    }    
        //    if(isValid)
        //    {
        //        var res = base.Add(entity);
        //        return res;
        //    }
        //    else
        //    {
        //        return 0;
        //    }
        //}

        public List<Customer> GetCustomersFilter(string specs)
        {
            return _customerRepository.GetCustomersFilter(specs);
        }

        public IEnumerable<Customer> GetCustomerByPage(int page)
        {
            Pager p = new Pager(page);
            return _customerRepository.GetCustomerByPage(p);
        }

        public int GetCustomerCount()
        {
            return _customerRepository.GetCustomerCount();
        }
    }
}
