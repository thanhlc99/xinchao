using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;
using MISA.ApplicationCore.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Reflection;
using System.Text;

namespace MISA.ApplicationCore.Services
{
    public class BaseService<TEntity> : IBaseService<TEntity> where TEntity:BaseEntiy
    {
        #region Declare
        IBaseRepository<TEntity> _baseRepository;
        ServiceResult _serviceResult;
        #endregion

        #region constructor
        public BaseService(IBaseRepository<TEntity> baseRepository)
        {
            _baseRepository = baseRepository;
            _serviceResult = new ServiceResult() { MISACode=Enums.MISACode.Success};
        }
        #endregion

        #region method
        public virtual ServiceResult Add(TEntity entity)
        {
            //Gán trạng thái
            entity.EntityState = Enums.EntityState.AddNew;
            //thực hiện validate
            var isValidate = Validate(entity);
            
            if (isValidate)
            {
               var a= _baseRepository.Add(entity);
                //check xem dữ liệu được lưu vào db chưa
                if (a > 0)
                {
                    //thành công
                    _serviceResult.Data = a;
                    _serviceResult.MISACode = Enums.MISACode.IsValid;
                    _serviceResult.Messenger = Properties.Resources.Msg_Add_Success;
                    return _serviceResult;
                }
                else
                {
                    //thất bại
                    _serviceResult.Data = a;
                    _serviceResult.Messenger = Properties.Resources.MISA_Error;
                    _serviceResult.MISACode = Enums.MISACode.Exception;
                    return _serviceResult;
                }
            }
            else
            {
                return _serviceResult;
            }
        }

        public ServiceResult Delete(Guid entityId)
        {
            
            var res = _baseRepository.Delete(entityId);
            //check xem dữ liệu được xóa trong db chưa
            if (res > 0)
            {
            //thành công
                _serviceResult.Data = res;
                _serviceResult.Messenger = Properties.Resources.Msg_Delete_Success;
                _serviceResult.MISACode = Enums.MISACode.Success;
            }
            else
            {
                //thất bại
                _serviceResult.Data = res;
                _serviceResult.Messenger = Properties.Resources.MISA_Error;
                _serviceResult.MISACode = Enums.MISACode.Exception;
            }    
            return _serviceResult;
        }

        public IEnumerable<TEntity> GetEntities()
        {
            return _baseRepository.GetEntities();
        }

        public TEntity GetEntityById(Guid entityId)
        {
            return _baseRepository.GetEntityById(entityId);
        }

        public ServiceResult Update(TEntity entity)
        {
            entity.EntityState = Enums.EntityState.Update;
            //thực hiện validate
            var isValidate = Validate(entity);

            if (isValidate)
            {
                  var res = _baseRepository.Update(entity);
                if (res > 0)
                {
                    //thành công
                    _serviceResult.Data = res;
                    _serviceResult.MISACode = Enums.MISACode.IsValid;
                    _serviceResult.Messenger = Properties.Resources.Msg_Update_Success;
                    return _serviceResult;
                }
                else
                {
                    //thất bại
                    _serviceResult.Data = res;
                    _serviceResult.Messenger = Properties.Resources.MISA_Error;
                    _serviceResult.MISACode = Enums.MISACode.Exception;
                    return _serviceResult;
                }
            }
            else
            {
                return _serviceResult;
            }
        }

        /// <summary>
        /// Hàm thực hiện kiểm tra dữ liệu
        /// </summary>
        /// <param name="entity">1 obj</param>
        /// <returns>true(dữ liệu hợp lệ) - false (dữ liệu không hợp lệ)</returns>
        private bool Validate(TEntity entity)
        {
            var isValidate = true;
            //mảng chứa các thông báo lỗi
            var misaArrayError = new List<string>();
            //đọc các property
            var properties = entity.GetType().GetProperties();

            foreach(var property in properties)
            {
                //lấy giá trị của property
                var propertyValue = property.GetValue(entity);

                var displayName = string.Empty;
                var displayNameAttributes = property.GetCustomAttributes(typeof(DisplayName),true);
                if(displayNameAttributes.Length > 0 )
                {
                    displayName = (displayNameAttributes[0] as DisplayName).Name;
                }    
                //kiểm tra xem có các attribute cần phải validate không
                //check bắt buộc nhập
                if (property.IsDefined(typeof(Required),false))
                {
                    
                    if(propertyValue == null)
                    {
                        isValidate = false;
                        misaArrayError.Add(string.Format(Properties.Resources.Msg_Required,displayName));
                        _serviceResult.Messenger = Properties.Resources.Msg_IsNotValid;
                        _serviceResult.MISACode = Enums.MISACode.NotValid;
                    }
                }
                //check trùng dữ liệu
                if (property.IsDefined(typeof(CheckDuplicate),false))
                    {
                       
                        var entityDulicate = _baseRepository.GetEntityByProperty(entity,property);
                        if(entityDulicate!=null)
                        {
                            isValidate = false;
                            misaArrayError.Add(string.Format(Properties.Resources.Msg_Duplicate,displayName));
                            _serviceResult.Messenger = Properties.Resources.Msg_IsNotValid;
                            _serviceResult.MISACode = Enums.MISACode.NotValid;
                        }    
                    }
                //check độ dài chuỗi
                if (property.IsDefined(typeof(MaxLength), false))
                {
                    //lấy độ dài đã khai báo
                    var attributeMaxLength = property.GetCustomAttributes(typeof(MaxLength), true)[0];
                    var length = (attributeMaxLength as MaxLength).Value;
                    var msg = (attributeMaxLength as MaxLength).ErrorMsg;
                    if(propertyValue.ToString().Trim().Length>20)
                    {
                        isValidate = false;
                        misaArrayError.Add(string.Format(Properties.Resources.Msg_MaxLength,displayName,length));
                        _serviceResult.Messenger = Properties.Resources.Msg_IsNotValid;
                        _serviceResult.MISACode = Enums.MISACode.NotValid;
                    }

                }

            }
            _serviceResult.Data = misaArrayError;
            return isValidate;
        }
        #endregion
    }
}
