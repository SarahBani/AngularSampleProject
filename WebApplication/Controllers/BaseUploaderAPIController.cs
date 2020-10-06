using Microsoft.AspNetCore.Mvc;
using WebApplication.Models;
using System;
using Core.DomainModel;
using Core.DomainService;

namespace WebApplication.Controllers
{
    public abstract class BaseUploaderAPIController : BaseAPIController
    {

        #region Properties

        [TempData]
        public string FilePath { get; set; }

        #endregion /Properties

        #region Constructors

        public BaseUploaderAPIController()
        {
        }

        #endregion /Constructors

        #region Methods

        protected IActionResult UploadImage(string subFolderName)
        {
            try
            {
                var file = Request.Form.Files[0];
                if (file.Length > 0)
                {
                    DeletePreviousFile();
                    this.FilePath = Utility.UploadImage(file, subFolderName);
                    return Ok(new CustomActionResult(this.FilePath));
                }
                else
                {
                    return BadRequest(new CustomActionResult(new CustomException(Constant.Exception_EmptyFile)));
                }
            }
            catch (Exception ex)
            {
                //return StatusCode(500, $"Internal server error: {ex}");
                return base.GetErrorResult();
            }
        }

        protected void DeletePreviousFile()
        {
            if (!string.IsNullOrEmpty(this.FilePath))
            {
                Utility.DeleteFile(this.FilePath);
                this.FilePath = string.Empty;
            }
        }

        #endregion /Methods

    }
}
