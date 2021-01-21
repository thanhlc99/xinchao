using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

namespace MISA.ApplicationCore.Interfaces
{
    public interface IBaseRepository<TEntity>
    {
        /// <summary>
        /// Lấy ra toàn bộ
        /// </summary>
        /// <returns>Danh sách</returns>
        /// CreatedBy: MVThanh (30/12/2021)
        IEnumerable<TEntity> GetEntities();
        /// <summary>
        /// Lấy ra một thông tin theo id (Khóa chính)
        /// </summary>
        /// <returns>một thông tin theo id(Khóa chính) truyền vào</returns>
        /// CreatedBy: MVThanh (30/12/2021)
        TEntity GetEntityById(Guid entityId);
        /// <summary>
        /// Thêm mới
        /// </summary>
        /// <returns>trả về kết quả (số bản ghi thêm mới được)</returns>
        /// CreatedBy: MVThanh (30/12/2021)
        int Add(TEntity entity);
        /// <summary>
        /// Cập nhật
        /// </summary>
        /// <returns>trả về kết quả (số bản ghi đã cập nhât)</returns>
        /// CreatedBy: MVThanh (30/12/2021)
        int Update(TEntity entity);
        /// <summary>
        /// Xóa theo id(Khóa chính)
        /// </summary>
        /// <returns>trả về kết quả (số bản ghi đã xóa)</returns>
        /// CreatedBy: MVThanh (30/12/2021)
        int Delete(Guid entityId);
        /// <summary>
        /// Lấy ra bản ghi
        /// </summary>
        /// <returns>Danh sách</returns>
        /// CreatedBy: MVThanh (30/12/2021)
        TEntity GetEntityByProperty(TEntity entity,PropertyInfo property);
    }
}
