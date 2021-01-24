using Dapper;
using Microsoft.Extensions.Configuration;
using MISA.ApplicationCore.Enums;
using MISA.ApplicationCore.Interfaces;
using MISA.ApplicationCore.Models;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text;

namespace MISA.Infrastructure.Repository
{
    public class BaseRepository<TEntity> : IBaseRepository<TEntity>, IDisposable where TEntity : BaseEntiy
    {
        #region declare
        IConfiguration _configuration;
        string _connectionString = string.Empty;
        protected IDbConnection dbConnection = null;
        protected string tableName;
        #endregion

        #region constructor
        public BaseRepository(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("MISACukCukConnectionString");
            dbConnection = new MySqlConnection(_connectionString);
            tableName = typeof(TEntity).Name;
        }
        #endregion

        #region Method
        public int Add(TEntity entity)
        {
            var res = 0;
            //mở kết nối
            dbConnection.Open();
            using (var transaction = dbConnection.BeginTransaction())
            {
                    var parameters = MappingDbType(entity);
                    //thi thi câu lệnh
                    res = dbConnection.Execute($"Proc_Insert{tableName}", parameters, commandType: CommandType.StoredProcedure);
                    transaction.Commit();
            }
            //trả về kết quả (số bản ghi thêm mới được)
            return res;
        }

        public int Delete(Guid entityId)
        {
            var res = 0;
            //mở kết nối
            dbConnection.Open();
            using (var transaction = dbConnection.BeginTransaction())
            {
                 var param = new DynamicParameters();
                param.Add($"@{tableName}Id", dbType: DbType.String, value: entityId.ToString(), direction: ParameterDirection.Input);
                    //thi thi câu lệnh
                    res = dbConnection.Execute($"Proc_Delete{tableName}ById", param,commandType: CommandType.StoredProcedure);
                transaction.Commit();
            }
            //trả về kết quả(số bản ghi bị ảnh hưởng)
            return res;
        }

        public  IEnumerable<TEntity> GetEntities()
        {
             //khởi tạo commandText
            var entitys = dbConnection.Query<TEntity>($"Proc_Get{tableName}s", commandType: CommandType.StoredProcedure);
            //trả về dữ liệu
            return entitys;
        }

        public TEntity GetEntityById(Guid entityId)
        {
            //khởi tạo commandText
            var param = new DynamicParameters();
            param.Add($"@{tableName}Id", dbType: DbType.String, value: entityId.ToString(), direction: ParameterDirection.Input);
            var entitys = dbConnection.Query<TEntity>($"Proc_Get{tableName}ById",param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            //trả về dữ liệu
            return entitys;
        }

        public int Update(TEntity entity)
        {
            var res = 0;
            //mở kết nối
            dbConnection.Open();
            using (var transaction = dbConnection.BeginTransaction())
            {
                    var parameters = MappingDbType(entity);
                    //khởi tạo commandText
                    res = dbConnection.Execute($"Proc_Update{tableName}", parameters, commandType: CommandType.StoredProcedure);
                    //trả về dữ liệu
                    transaction.Commit();
            }
            return res;
        }
        /// <summary>
        ///Hàm thực hiện Chuyển kiểu dữ liệu Guid sang kiểu dữ liệu string
        /// </summary>
        /// <param name="entity">một obj</param>
        /// <returns>obj đã được chuyển đổi các thành phần có kiểu dữ liệu guid sang string</returns>
        private DynamicParameters MappingDbType(TEntity entity)
        {
            //Chuyển Guid sang string (Xử lý các kiểu dữ liệu)
            var properties = entity.GetType().GetProperties();
            var parameters = new DynamicParameters();
            foreach (var property in properties)
            {
                //lấy ra key (tên)
                var propertyName = property.Name;
                //lấy ra value (giá trị)
                var propertyValue = property.GetValue(entity);
                //lấy ra kiểu dữ liệu
                var propertyType = property.PropertyType;

                if (propertyType == typeof(Guid) || propertyType == typeof(Guid?))
                {
                    parameters.Add($"@{propertyName}", propertyValue, DbType.String);
                }
                else
                {
                    parameters.Add($"@{propertyName}", propertyValue);
                }
            }
            return parameters;
        }
   
        public TEntity GetEntityByProperty(TEntity entity, PropertyInfo property)
        {
            //lấy tên
            var propertyName = property.Name;
            //lấy giá trị
            var propertyValue = property.GetValue(entity);
            var keyValue = entity.GetType().GetProperty($"{tableName}Id").GetValue(entity);
            var query = string.Empty;
            //nếu là thêm mới
            if (entity.EntityState == EntityState.AddNew)
            {
                query = $"select * from {tableName} where {propertyName} = '{propertyValue}'";
            }
            else if (entity.EntityState == EntityState.Update)//nếu là cập nhật (chỉnh sửa)
            {
                query = $"select * from {tableName} where {propertyName} = '{propertyValue}' and {tableName}Id <> '{keyValue}'";
            }
            else
            {
                return null;
            }
            var entityReturn = dbConnection.Query<TEntity>(query, commandType: CommandType.Text).FirstOrDefault();
            return entityReturn;
        }

        //đóng kết nối
        public void Dispose()
        {
            if (dbConnection.State == ConnectionState.Open)
            {
                dbConnection.Close();
            }
        }

        #endregion
    }
}
