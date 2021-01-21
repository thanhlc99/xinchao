using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Models
{
    /// <summary>
    /// Phòng ban làm việc
    /// </summary>
    /// CreatedBy: MVThanh(20/01/2021)
    public class DepartmentGroup:BaseEntiy
    {
        #region Declare
        #endregion

        #region Constructor
        #endregion

        #region property
        /// <summary>
        /// Khóa chính
        /// </summary>
        public Guid DepartmentGroupId { get; set; }
        /// <summary>
        /// Tên phòng ban làm việc
        /// </summary>
        public string DepartmentGroupName { get; set; }
        /// <summary>
        /// Mô tả về phòng ban làm việc
        /// </summary>
        public string Description { get; set; }

        #endregion

        #region method

        #endregion
    }
}
