﻿using Core.DomainModel;
using Core.DomainModel.Entities;
using Microsoft.AspNetCore.Mvc;
using WebApplication.Models;

namespace WebApplication.Controllers
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

        protected IActionResult GetOKResult()
        {
            return Ok(new CustomActionResult()); // Http status code 200
        }

        protected IActionResult GetActionResult<T>(T value)
        {
            return Ok(new CustomActionResult(value));
        }

        protected IActionResult GetCreatedActionResult<TEntity, TKey>(string actionName,
            TEntity createdObject)
            where TEntity : BaseEntity<TKey>
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
            return GetErrorResult(Constant.Exception_HasError);
        }

        protected IActionResult GetErrorResult(string exceptionContentResult)
        {
            return BadRequest(new CustomActionResult(new CustomException(exceptionContentResult)));
        }

        #endregion /Actions

    }
}