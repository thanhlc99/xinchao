using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Models
{
    /// <summary>
    /// Vị trí làm việc trong công ty
    /// </summary>
    /// CreatedBy: MVTHANH(20/01/2021)
    public class PositionGroup:BaseEntiy
    {
        #region Declare
        #endregion

        #region Constructor
        #endregion

        #region property
        /// <summary>
        /// Khóa chính
        /// </summary>
        public Guid PositionGroupId { get; set; }
        /// <summary>
        /// Tên vị trí làm việc trong công ty
        /// </summary>
        public string PositionGroupName { get; set; }
        /// <summary>
        /// Mô tả về vị trí làm việc
        /// </summary>
        public string Description { get; set; }

        #endregion

        #region method

        #endregion
    }
}
