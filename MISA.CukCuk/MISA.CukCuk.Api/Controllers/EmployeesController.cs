using MISA.ApplicationCore.Interfaces;
using MISA.ApplicationCore.Models;

namespace MISA.CukCuk.Api.Controllers
{

    public class EmployeesController : BaseEntityController<Employee>
    {

        IBaseService<Employee> _baseService;
        public EmployeesController(IBaseService<Employee> baseService):base(baseService)
        {
            _baseService = baseService;
        }


    }
}
