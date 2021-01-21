using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Models
{
    /// <summary>
    /// Nhóm khách hàng
    /// </summary>
    public class CustomerGroup:BaseEntiy
    {
        #region Declare
        #endregion

        #region Constructor
        #endregion

        #region property
        /// <summary>
        /// khóa chính
        /// </summary>
        public Guid CustomerGroupId { get; set; }
        /// <summary>
        /// tên nhóm khách hàng
        /// </summary>
        public string CustomerGroupName { get; set; }
        /// <summary>
        /// Mô tả chi tiết
        /// </summary>
        public string Description { get; set; }

        #endregion

        #region method

        #endregion
    }
}
