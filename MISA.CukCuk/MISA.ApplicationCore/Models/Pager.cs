using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Models
{
    /// <summary>
    /// Chứa các thuộc tính dùng trong chức năng phân rang
    /// </summary>
    public class Pager
    {
        #region property
        /// <summary>
        /// số trang truyền lên
        /// </summary>
        public int Page { get; set; }
        /// <summary>
        /// số lượng bản ghi muốn lấy ra để hiển thị
        /// </summary>
        public int PageSize { get; set; }
        /// <summary>
        /// vị trí bắt đầu lấy bản ghi
        /// </summary>
        public int Offset { get; set; }
        /// <summary>
        /// lưu giá trị số lượng bản ghi luốm lấy
        /// </summary>
        public int Next { get; set; }
        #endregion

        #region constructor
        public Pager(int page, int pageSize = 10)
        {
            Page = page < 1 ? 1 : page;
            PageSize = pageSize < 1 ? 10 : pageSize;

            Next = pageSize;
            Offset = (Page - 1) * Next;
        }
        #endregion
    }
}
