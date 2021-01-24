using Dapper;
using Microsoft.Extensions.Configuration;
using MISA.ApplicationCore.Interfaces;
using MISA.ApplicationCore.Models;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace MISA.Infrastructure.Repository
{
    public class EmployeeRepository : BaseRepository<Employee>, IEmployeeRepository
    {
        #region declare
       
        #endregion

        #region constructor
        public EmployeeRepository(IConfiguration configuration):base(configuration)
        {
           
        }
        #endregion
        #region Method
        public IEnumerable<Employee> GetEmployeesByPage(Pager pager)
        {
           
                var param = new DynamicParameters();
                param.Add("@Offset", dbType: DbType.Int32, value: pager.Offset, direction: ParameterDirection.Input);
                param.Add("@PageSize", dbType: DbType.Int32, value: pager.PageSize, direction: ParameterDirection.Input);
                var results = dbConnection.Query<Employee>("Proc_GetEmployeeByPage", param, commandType: CommandType.StoredProcedure);
                return results;
           
        }

        public int GetEmployeeCount()
        {
            var count = dbConnection.ExecuteScalar<int>("SELECT COUNT(*) AS 'Count' FROM Employee e;", commandType: CommandType.Text);
            return count;
        }

        public List<Employee> GetEmployeesFilter(string specs, Guid? departmentId, Guid? positionId)
        {
            //build tham số đầu vào cho store
            var input = specs != null ? specs : string.Empty;
            //if (string.IsNullOrEmpty(specs))
            //{
            //    var entity = dbConnection.Query<Employee>("Proc_GetEmployees", commandType: CommandType.StoredProcedure).ToList();
            //    return entity;
            //}
            var parameters = new DynamicParameters();
            parameters.Add("@EmployeeCode", input, DbType.String);
            parameters.Add("@FullName", input, DbType.String);
            parameters.Add("@PhoneNumber", input, DbType.String);
            parameters.Add("@PositionGroupId", positionId, DbType.String);
            parameters.Add("@DepartmentGroupId", departmentId, DbType.String);
            var employees = dbConnection.Query<Employee>("Proc_GetEmployeeFilter", parameters, commandType: CommandType.StoredProcedure).ToList();
            return employees;
        }

        public double GetEmployeeCodeMax()
        {
            var count = dbConnection.ExecuteScalar<double>(" SELECT MAX(CONVERT((SUBSTRING(e.EmployeeCode,3)),DOUBLE)) FROM Employee e;", commandType: CommandType.Text);
            return count;
        }

        #endregion

    }
}
