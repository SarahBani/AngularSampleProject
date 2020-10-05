using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Core.DomainModel.Entities;
using Core.ApplicationService.Contracts;

namespace WebApplication.Controllers
{
    [Route("[controller]")]
    public class BranchController : BaseAPIController
    {
        #region Properties

        public IBranchService _branchService { get; set; }

        #endregion /Properties

        #region Constructors

        public BranchController(IBranchService branchService)
        {
            this._branchService = branchService;
        }

        #endregion /Constructors

        #region Actions

        [HttpGet("ItemAsync/{id}")]
        public async Task<Branch> GetItemAsync([FromRoute] int id)
        {
            return await this._branchService.GetByIdAsync(id);
        }

        [HttpGet("ListAsync")]
        public async Task<IEnumerable<Branch>> GetListByBankIdAsync([FromQuery] int bankId)
        {
            return await this._branchService.GetListByBankIdAsync(bankId);
        }

        [HttpGet("CountAsync")]
        public async Task<int> GetCountAsync([FromQuery] int bankId)
        {
            return await this._branchService.GetCountByBankIdAsync(bankId);
        }

        [HttpPost("InsertAsync")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> InsertAsync([FromBody] Branch branch)
        {
            var result = await this._branchService.InsertAsync(branch);
            if (result.IsSuccessful)
            {
                return base.GetOKResult();
            }
            else
            {
                return base.GetErrorResult(result.ExceptionContentResult);
            }
        }

        [HttpPut("UpdateAsync/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateAsync([FromRoute] int id, [FromBody] Branch branch)
        {
            if (id <= 0)
            {
                return base.GetInvalidRequestResult();
            }
            var result = await this._branchService.UpdateAsync(branch);
            if (result.IsSuccessful)
            {
                return base.GetOKResult();
            }
            else
            {
                return base.GetErrorResult(result.ExceptionContentResult);
            }
        }

        [HttpDelete("DeleteAsync/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> DeleteAsync([FromRoute] int id)
        {
            if (id <= 0)
            {
                return base.GetInvalidRequestResult();
            }
            var result = await this._branchService.DeleteAsync(id);
            if (result.IsSuccessful)
            {
                return base.GetOKResult();
            }
            else
            {
                return base.GetErrorResult(result.ExceptionContentResult);
            }
        }

        [HttpDelete("DeleteByBankIdAsync")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> DeleteByBankIdAsync([FromQuery] int bankId)
        {
            if (bankId <= 0)
            {
                return base.GetInvalidRequestResult();
            }
            if (bankId <= 0)
            {
                return base.GetInvalidRequestResult();
            }
            var result = await this._branchService.DeleteByBankIdAsync(bankId);
            if (result.IsSuccessful)
            {
                return base.GetOKResult();
            }
            else
            {
                return base.GetErrorResult(result.ExceptionContentResult);
            }
        }

        #endregion /Actions

    }
}