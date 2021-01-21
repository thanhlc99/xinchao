using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Enums
{
    /// <summary>
    /// MISACode xác định trạng thái làm việc của value
    /// </summary>
    public enum MISACode
    {
        /// <summary>
        /// Dữ liệu hợp lệ
        /// </summary>
        IsValid=100,
        /// <summary>
        /// Dữ liệu chưa hợp lệ
        /// </summary>
        NotValid=900,
        /// <summary>
        /// Thành công
        /// </summary>
        Success=200,
        /// <summary>
        /// xảy ra lỗi khi xử lý
        /// </summary>
        Exception = 500
    }
    /// <summary>
    /// xác định trạng thái làm việc của obj
    /// </summary>
    public enum EntityState
    {
        /// <summary>
        /// Thêm  mới
        /// </summary>
        AddNew = 1,
        /// <summary>
        /// sửa (cập nhật)
        /// </summary>
        Update = 2,
        /// <summary>
        /// xóa
        /// </summary>
        Delete = 3
    }
    /// <summary>
    /// Giới tính
    /// </summary>
    public enum Gender
    {
        /// <summary>
        /// nữ
        /// </summary>
        female = 0,
        /// <summary>
        /// nam
        /// </summary>
        male = 1,
        /// <summary>
        /// khác
        /// </summary>
        other = 2
    }
    /// <summary>
    /// Tình trạng công việc
    /// </summary>
    public enum WorkStatus
    {
        /// <summary>
        /// đang làm việc
        /// </summary>
        working = 0,
        /// <summary>
        /// đã nghỉ việc
        /// </summary>
        quitJob=1
    }
}
