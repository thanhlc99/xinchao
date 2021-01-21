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
            dbConnection.Open();
            using (var transaction = dbConnection.BeginTransaction())
            {
                try
                {
                    var parameters = MappingDbType(entity);
                    //thi thi câu lệnh
                    res = dbConnection.Execute($"Proc_Insert{tableName}", parameters, commandType: CommandType.StoredProcedure);
                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                }
            }
            //trả về kết quả (số bản ghi thêm mới được)
            return res;
        }

        public int Delete(Guid entityId)
        {
            var res = 0;
            dbConnection.Open();
            using (var transaction = dbConnection.BeginTransaction())
            {
                res = dbConnection.Execute($"delete from {tableName} where {tableName}Id = '{entityId.ToString()}'", commandType: CommandType.Text);
                transaction.Commit();
            }
            return res;
        }

        public virtual IEnumerable<TEntity> GetEntities()
        {
             //khởi tạo commandText
            var entitys = dbConnection.Query<TEntity>($"Proc_Get{tableName}s", commandType: CommandType.StoredProcedure);
            //trả về dữ liệu
            return entitys;
        }

        public TEntity GetEntityById(Guid entityId)
        {
            //khởi tạo commandText
            var entitys = dbConnection.Query<TEntity>($"select * from {tableName} where {tableName}Id = '{entityId.ToString()}'", commandType: CommandType.Text).FirstOrDefault();
            //trả về dữ liệu
            return entitys;
        }

        public int Update(TEntity entity)
        {
            var res = 0;
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
                var propertyName = property.Name;
                var propertyValue = property.GetValue(entity);
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
            var propertyName = property.Name;
            var propertyValue = property.GetValue(entity);
            var keyValue = entity.GetType().GetProperty($"{tableName}Id").GetValue(entity);
            var query = string.Empty;
            if (entity.EntityState == EntityState.AddNew)
            {
                query = $"select * from {tableName} where {propertyName} = '{propertyValue}'";
            }
            else if (entity.EntityState == EntityState.Update)
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
