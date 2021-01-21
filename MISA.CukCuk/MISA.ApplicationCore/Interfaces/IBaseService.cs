using MISA.ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Interfaces
{
    public interface IBaseService<TEntity>
    {
        /// <summary>
        /// Lấy toàn bộ dữ liệu
        /// </summary>
        /// <returns>một danh sách</returns>
        /// CreatedBy: MVThanh(30/12/2021)
        IEnumerable<TEntity> GetEntities();
        /// <summary>
        /// Lấy dữ liệu theo id truyên vào
        /// </summary>
        /// <returns>thông tin của một đối tượng</returns>
        /// CreatedBy: MVThanh(30/12/2021)
        TEntity GetEntityById(Guid entityId);
        /// <summary>
        /// Thêm mới một dữ liệu
        /// </summary>
        /// <returns>thông tin nghệp vụ(ServiceResult)</returns>
        /// CreatedBy: MVThanh(30/12/2021)
        ServiceResult Add(TEntity entity);
        /// <summary>
        /// Cập nhật lại dữ liệu
        /// </summary>
        /// <returns>thông tin nghệp vụ(ServiceResult)</returns>
        /// CreatedBy: MVThanh(30/12/2021)
        ServiceResult Update(TEntity entity);
        /// <summary>
        /// xóa một dữ liệu theo id
        /// </summary>
        /// <returns>thông tin nghệp vụ(ServiceResult)</returns>
        /// CreatedBy: MVThanh(30/12/2021)
        ServiceResult Delete(Guid entityId);

    }
}
