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
            return BadRequest(ModelState);
        }

        protected IActionResult GetBadRequestActionResult()
        {
            return BadRequest();
        }

        protected IActionResult GetActionResult<T>(T value)
        {
            return Ok(value);
        }

    }
}
