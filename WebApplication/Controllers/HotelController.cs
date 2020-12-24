using Core.DomainModel;
using Core.DomainService;
using Microsoft.AspNetCore.Mvc;
using System;

namespace WebApplication.Controllers
{
    [Route("[controller]")]
    public class HotelController : BaseAPIController
    {

        #region Properties

        #endregion /Properties

        #region Constructors

        public HotelController()
        {
        }

        #endregion /Constructors

        #region Actions              

        [HttpPost("UploadPhoto/{hotelId}"), DisableRequestSizeLimit]
        public IActionResult UploadPhoto(long hotelId)
        {
            return UploadImage(@$"Hotels\{hotelId}");
        }

        [HttpDelete("DeletePhoto")]
        public IActionResult DeletePhoto(string filePath)
        {
            return DeleteImage(filePath);
        }

        #endregion /Actions   

        #region Methods

        private IActionResult UploadImage(string subFolderName)
        {
            try
            {
                var file = Request.Form.Files[0];
                if (file.Length > 0)
                {
                    string filePath = Utility.UploadImage(file, subFolderName);
                    return Ok(new TransactionResult(filePath));
                }
                return BadRequest(new TransactionResult(new CustomException(Constant.Exception_EmptyFile)));
            }
            catch (Exception ex)
            {
                return base.GetErrorResult();
            }
        }

        private IActionResult DeleteImage(string filePath)
        {
            try
            {
                if (!string.IsNullOrEmpty(filePath))
                {
                    Utility.DeleteFile(filePath);
                }
                return Ok(new TransactionResult());
            }
            catch (Exception ex)
            {
                return base.GetErrorResult();
            }
        }

        #endregion /Methods

    }
}