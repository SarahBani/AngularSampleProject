using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System;
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

        [HttpGet("ListAsync/{id}")]
        public async Task<IEnumerable<Branch>> GetListByBankIdAsync([FromRoute] int bankId)
        {
            await Task.Run(() => { });
            return GetBranches(bankId).ToArray();
        }

        [HttpGet("CountByBankIdAsync/{id}")]
        public async Task<int> GetCountAsync([FromRoute] int bankId)
        {
            await Task.Run(() => { });
            return GetBranches(bankId).Count(q => q.BankId.Equals(bankId));
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

        [HttpPut("UpdateAsync")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateAsync([FromRoute] int id, [FromBody] Branch branch)
        {
            if (id <= 0)
            {
                return base.GetInvalidRequestResult();
            }
            await Task.Run(() => { });
            return base.GetOKResult();
        }

        [HttpDelete("DeleteAsync")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> DeleteAsync([FromRoute] int id)
        {
            if (id <= 0)
            {
                return base.GetInvalidRequestResult();
            }
            await Task.Run(() => { });
            return base.GetOKResult();
        }

        [HttpDelete("DeleteByBankIdAsync")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> DeleteByBankIdAsync([FromRoute] int bankId)
        {
            if (bankId <= 0)
            {
                return base.GetInvalidRequestResult();
            }
            await Task.Run(() => { });
            return base.GetOKResult();
        }

        #endregion /Actions

        private IEnumerable<Branch> GetBranches(int bankId)
        {
            int count = new Random().Next(0, 10);
            return Enumerable.Range(1, count).Select(index => new Branch
            {
                Id = index,
                BankId = bankId,
                Name = $"Branch {index}",
                Code = GenerateCode()
            });
        }

        private string GenerateCode()
        {
            string activationCode = Guid.NewGuid().ToString();
            int length = 10; // Number of characters to generate
            return activationCode.Substring(0, length);
        }

    }
}