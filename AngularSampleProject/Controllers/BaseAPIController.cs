using Microsoft.AspNetCore.Mvc;
using AngularSampleProject.Models;

namespace AngularSampleProject.Controllers
{
    [ApiController]
    public abstract class BaseAPIController : ControllerBase
    {

        protected IActionResult GetOKActionResult()
        {
            return Ok(new CustomActionResult()); // Http status code 200
        }

        protected IActionResult GetCreatedActionResult<TEntity, TKey>(string actionName,
            TEntity createdObject)
            where TEntity : Entity<TKey>
        {
            return CreatedAtAction(actionName,
                new { id = createdObject.Id },
                createdObject);
        }

        protected IActionResult GetInvalidModelActionResult()
        {
            return BadRequest(new CustomActionResult(new CustomException(Constant.Exception_InvalidModelState), ModelState));
        }

         protected IActionResult GetInvalidRequestActionResult()
        {
            return BadRequest(new CustomActionResult(new CustomException(Constant.Exception_InvalidRequestData), ModelState));
        }

        protected IActionResult GetErrorActionResult()
        {
            return BadRequest(new CustomActionResult(new CustomException(Constant.Exception_HasError)));
        }

        protected IActionResult GetActionResult<T>(T value)
        {
            return Ok(new CustomActionResult(value));
        }

    }
}
