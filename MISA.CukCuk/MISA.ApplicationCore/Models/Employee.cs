using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Models
{
    /// <summary>
    /// Bảng nhân viên
    /// </summary>
    /// createdBy: MVThanh(12/01/2021)
    public class Employee : BaseEntiy
    {
        #region Declare
        #endregion

        #region Constructor
        #endregion

        #region property
        /// <summary>
        /// khóa chính
        /// </summary>
        public Guid EmployeeId { get; set; }
        /// <summary>
        /// mã nhân viên
        /// </summary>
        public string EmployeeCode { get; set; }
        /// <summary>
        /// tên đầy đủ nhân viên
        /// </summary>
        public string FullName { get; set; }
        /// <summary>
        /// ngày tháng năm sinh
        /// </summary>
        public DateTime DateOfBirth { get; set; }
        /// <summary>
        /// giới tính
        /// </summary>
        public int Gender { get; set; }
        /// <summary>
        /// config giới tính
        /// </summary>
        public string GenderName
        {
            get
            {
                var name = string.Empty;
                switch (Gender)
                {
                    case (int)Enums.Gender.female:
                        name = Properties.Resources.female;
                        break;
                    case (int)Enums.Gender.male:
                        name = Properties.Resources.male;
                        break;
                    case (int)Enums.Gender.other:
                        name = Properties.Resources.other;
                        break;
                }
                return name;
            }
        }
        /// <summary>
        /// Số chứng minh nhân dân/ thẻ căn cước
        /// </summary>
        public string IdentityCardNumber { get; set; }
        /// <summary>
        /// Ngày cấp thẻ chứng minh thư nhân dân/căn cước
        /// </summary>
        public DateTime LevelDate { get; set; }
        /// <summary>
        /// Nơi cấp chứng minh thư nhân dân/căn cước
        /// </summary>
        public string PlaceOfIssue { get; set; }
        /// <summary>
        /// địa chỉ email
        /// </summary>
        public string Email { get; set; }
        /// <summary>
        /// số điện thoại nhân viên
        /// </summary>
        public string PhoneNumber { get; set; }
        /// <summary>
        /// Vị trí làm việc trong công ty
        /// </summary>
        public Guid PositionGroupId { get; set; }
        /// <summary>
        /// Tên vị trí làm việc
        /// </summary>
        public string PositionGroupName { get; set; }
        /// <summary>
        /// phòng ban làm việc
        /// </summary>
        public Guid DepartmentGroupId { get; set; }
        /// <summary>
        /// tên phòng ban làm việc
        /// </summary>
        public string DepartmentGroupName { get; set; }
        /// <summary>
        /// Mã số thuế cá nhân
        /// </summary>
        public string PersonalTaxCode { get; set; }
        /// <summary>
        /// Mức lương cơ bản
        /// </summary>
        public float Salary { get; set; }
        /// <summary>
        /// ngày gia nhập
        /// </summary>
        public DateTime JoinDate { get; set; }
        /// <summary>
        /// tình trạng công việc
        /// </summary>
        public int WorkStatus { get; set; }
        public string WorkStatusName
        {
            get
            {
                var name = string.Empty;
                switch (WorkStatus)
                {
                    case (int)Enums.WorkStatus.working:
                        name = Properties.Resources.working;
                        break;
                    case (int)Enums.Gender.male:
                        name = Properties.Resources.quitJob;
                        break;
                }
                return name;
            }
        }
        #endregion

        #region Method
        #endregion

    }
}
