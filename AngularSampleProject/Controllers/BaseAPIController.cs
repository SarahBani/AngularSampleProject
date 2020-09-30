using Microsoft.AspNetCore.Mvc;
using AngularSampleProject.Models;
using AngularSampleProject.Common;

namespace AngularSampleProject.Controllers
{
    [ApiController]
    public abstract class BaseAPIController : ControllerBase
    {

        #region Properties

        #endregion /Properties

        #region Constructors

        public BaseAPIController()
        {
        }

        #endregion /Constructors

        #region Actions

        protected IActionResult GetOKActionResult()
        {
            return Ok(new CustomActionResult()); // Http status code 200
        }

        protected IActionResult GetActionResult<T>(T value)
        {
            return Ok(new CustomActionResult(value));
        }

        protected IActionResult GetCreatedActionResult<TEntity, TKey>(string actionName,
            TEntity createdObject)
            where TEntity : Entity<TKey>
        {
            return CreatedAtAction(actionName,
                new { id = createdObject.Id },
                createdObject);
        }

        protected IActionResult GetInvalidModelResult()
        {
            return BadRequest(new CustomActionResult(new CustomException(Constant.Exception_InvalidModelState), ModelState));
        }

         protected IActionResult GetInvalidRequestResult()
        {
            return BadRequest(new CustomActionResult(new CustomException(Constant.Exception_InvalidRequestData), ModelState));
        }

        protected IActionResult GetErrorResult()
        {
            return BadRequest(new CustomActionResult(new CustomException(Constant.Exception_HasError)));
        }

        #endregion /Actions

    }
}
