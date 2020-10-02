using Microsoft.AspNetCore.Mvc;
using WebApplication.Models;
using WebApplication.Common;
using System;
using Core.DomainModel;

namespace WebApplication.Controllers
{
    public abstract class BaseUploaderAPIController : BaseAPIController
    {

        #region Properties

        [TempData]
        protected string FilePath { get; private set; }

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
                    this.FilePath = Helper.UploadImage(file, subFolderName);
                    return Ok(new CustomActionResult(this.FilePath));
                }
                else
                {
                    return BadRequest(new CustomActionResult(new CustomException(Constant.Exception_EmptyFile)));
                }
            }
            catch (Exception)
            {
                //return StatusCode(500, $"Internal server error: {ex}");
                return base.GetErrorResult();
            }
        }

        private void DeletePreviousFile()
        {
            if (!string.IsNullOrEmpty(this.FilePath))
            {
                Helper.DeleteFile(this.FilePath);
            }
        }

        #endregion /Methods

        //#region Image

        //[HttpPut]
        //public virtual ActionResult _SetImageFile(string imageName)
        //{
        //    this.ImageFileName = null;
        //    if (Request.Files.Count > 0)
        //    {
        //        var imageFile = Request.Files["file" + imageName];
        //        if (imageFile != null)
        //        {
        //            if (Regex.IsMatch(imageFile.FileName.ToLower(), Constant.ImageRegularExpression))
        //            {
        //                ImageFileName = imageFile;
        //            }
        //        }
        //    }
        //    return null;
        //}

        //#endregion /Image

        //#region File

        //protected void DeleteFile(string fileName)
        //{
        //    if (!string.IsNullOrEmpty(fileName))
        //    {
        //        string filePhysicalPath = Server.MapPath(fileName);
        //        if (System.IO.File.Exists(filePhysicalPath))
        //        {
        //            System.IO.File.Delete(filePhysicalPath);
        //        }
        //    }
        //}

        //protected void DeleteFullPathFile(string filePhysicalPath)
        //{
        //    if (!string.IsNullOrEmpty(filePhysicalPath))
        //    {
        //        if (System.IO.File.Exists(filePhysicalPath))
        //        {
        //            System.IO.File.Delete(filePhysicalPath);
        //        }
        //    }
        //}

        //protected string GetDirectoryPhysicalPath(string directoryRelativePath)
        //{
        //    string directoryPhysicalPath = Server.MapPath(directoryRelativePath);
        //    if (!Directory.Exists(directoryPhysicalPath))
        //    {
        //        Directory.CreateDirectory(directoryPhysicalPath);
        //    }
        //    return directoryPhysicalPath;
        //}

        //#region Image

        //protected string GetImageFile(HttpPostedFileBase file, string imagePath, string directoryRelativePath)
        //{
        //    if (file != null)
        //    {
        //        if (Regex.IsMatch(file.FileName.ToLower(), Constant.ImageRegularExpression))
        //        {
        //            DeleteFile(imagePath);
        //            string fileName = Guid.NewGuid() + file.FileName.Substring(file.FileName.LastIndexOf("."));
        //            string filePath = GetDirectoryPhysicalPath(directoryRelativePath) + fileName;
        //            //file.SaveAs(filePath);
        //            Bitmap bmpImage = Utility.ResizeRatioImage(file.InputStream, this._uploadImageMaxSize, this._uploadImageMaxSize);
        //            bmpImage.Save(filePath);
        //            bmpImage.Dispose();
        //            imagePath = directoryRelativePath + fileName;
        //        }
        //    }
        //    return imagePath;
        //}

        //#endregion /Image

        //#endregion /File




    }
}
