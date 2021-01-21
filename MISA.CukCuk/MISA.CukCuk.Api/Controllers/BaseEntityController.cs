using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MISA.ApplicationCore.Enums;
using MISA.ApplicationCore.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.CukCuk.Api.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class BaseEntityController<TEntity> : ControllerBase
    {
        IBaseService<TEntity> _baseService;

        #region constructor
        public BaseEntityController(IBaseService<TEntity> baseService)
        {
            _baseService = baseService;
        }
        #endregion

        #region method
        /// <summary>
        /// Lấy toàn bộ
        /// </summary>
        /// <returns>Danh sách</returns>
        /// CreatedBy: MVThanh(09/01/2021)
        [HttpGet]
        public IActionResult Get()
        {
            var customers = _baseService.GetEntities();
            return Ok(customers);
        }

        /// <summary>
        /// lấy thông tin theo khóa chính
        /// </summary>
        /// <param name="id">khóa chính</param>
        /// <returns>một obj</returns>
        /// createdBy MVThanh(12/01/2021)
        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            var entity = _baseService.GetEntityById(Guid.Parse(id));
            return Ok(entity);
        }

       /// <summary>
       /// Thêm mới một thông tin
       /// </summary>
       /// <param name="entity">object</param>
       /// <returns>một thông tin nghiệp vụ</returns>
        [HttpPost]
        public IActionResult Post(TEntity entity)
        {
            var serviceResult = _baseService.Add(entity);
            if (serviceResult.MISACode == ApplicationCore.Enums.MISACode.IsValid)
            {
                return Ok(serviceResult);
                
            }
            else
            {
                return BadRequest(serviceResult);
            }
        }

        /// <summary>
        /// Sửa (cập nhật) thông tin của 1 đối tượng
        /// </summary>
        /// <param name="id">Khóa chính của đối tượng đó</param>
        /// <param name="entity">object (đối tượng)</param>
        /// <returns>một thông tin nghiệp vụ</returns>
        [HttpPut("{id}")]
        public IActionResult Put([FromRoute] string id,[FromBody] TEntity entity)
        {
            var keyProperty = entity.GetType().GetProperty($"{typeof(TEntity).Name}Id");
            if(keyProperty.PropertyType == typeof(Guid))
            {
                keyProperty.SetValue(entity,Guid.Parse(id));
            }
            else if(keyProperty.PropertyType == typeof(int))
            {
                keyProperty.SetValue(entity, int.Parse(id));
            }
            else
            {
                keyProperty.SetValue(entity, id);
            }

            var serviceResult = _baseService.Update(entity);
            if (serviceResult.MISACode == ApplicationCore.Enums.MISACode.IsValid)
            {
               
                return Ok(serviceResult);
            }
            else
            {
                return BadRequest(serviceResult);
            }
        }

        /// <summary>
        /// Xóa thông tin một đối tượng
        /// </summary>
        /// <param name="id">Khóa chính của đối tượng đó</param>
        /// <returns>Trạng thái nghiệp vụ</returns>
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var serviceResult = _baseService.Delete(Guid.Parse(id));
            if (serviceResult.MISACode == ApplicationCore.Enums.MISACode.Success)
            {
                return Ok(serviceResult);
               
            }
            else
            {
                return BadRequest(serviceResult);
            }
        }
        #endregion
    }
}
