using MISA.ApplicationCore.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Models
{
    #region Các Attribute tùy chỉnh để validate dữ liệu (gán cờ)
    /// <summary>
    /// bắt buộc nhập
    /// </summary>
    [AttributeUsage(AttributeTargets.Property)]
    public class Required:Attribute
    {

    }
    /// <summary>
    /// kiểm tra trùng
    /// </summary>
    [AttributeUsage(AttributeTargets.Property)]
    public class CheckDuplicate:Attribute
    {

    }
    /// <summary>
    /// khóa chính
    /// </summary>
    [AttributeUsage(AttributeTargets.Property)]
    public class PrimaryKey : Attribute
    {

    }
    /// <summary>
    /// Lưu tên tiếng việt
    /// </summary>
    [AttributeUsage(AttributeTargets.Property)]
    public class DisplayName : Attribute
    {
        public string Name { get; set; }
        public DisplayName(string name=null)
        {
            this.Name = name;
        }
    }
    /// <summary>
    /// check max độ dài (kiểm tra độ dài lớn nhất)
    /// </summary>
    [AttributeUsage(AttributeTargets.Property)]
    public class MaxLength : Attribute
    {
        public int Value { get; set; }
        public string ErrorMsg { get; set; }
        public MaxLength(int length,string errorMsg = null){
            this.Value = length;
            this.ErrorMsg = errorMsg;
            }
    }
    #endregion

    #region hàm chức các thông tin chung của model(obj)
    public class BaseEntiy
    {
        /// <summary>
        /// xác định trang thái làm việc gửi lên là thêm, sửa hay xóa
        /// </summary>
        public EntityState EntityState { get; set; } = EntityState.AddNew;
        /// <summary>
        /// Ngày khởi tạo
        /// </summary>
        public DateTime? CreatedDate { get; set; }
        /// <summary>
        /// Người khởi tạo
        /// </summary>
        public string CreatedBy { get; set; }
        /// <summary>
        /// Ngày sửa
        /// </summary>
        public DateTime? ModifiedDate { get; set; }
        /// <summary>
        /// Người sửa
        /// </summary>
        public string ModifiedBy { get; set; }

    }
    #endregion
}
