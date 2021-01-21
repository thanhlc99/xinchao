using MISA.ApplicationCore.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Entities
{
    /// <summary>
    /// chứa các thông tin nghiệp vụ trả về
    /// </summary>
    public class ServiceResult
    {
        /// <summary>
        /// các dữ liệu mong muốn truyền về
        /// </summary>
        public Object Data { get; set; }
        /// <summary>
        /// câu thông báo sẽ gửi về
        /// </summary>
        public string  Messenger { get; set; }
        /// <summary>
        /// Mã tùy chỉnh(quy định chung trong dự án), định nghĩa mã này là trạng thái thành công hay thất bại 
        /// </summary>
        public MISACode MISACode { get; set; }

    }
}
