using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using AngularSampleProject.Models;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System;

namespace AngularSampleProject.Controllers
{
    [Route("[controller]")]
    public class BranchController : BaseAPIController
    {

        [HttpGet("ItemAsync/{id}")]
        public async Task<Branch> GetItemAsync([FromRoute] int id)
        {
            await Task.Run(() => { });
            return new Branch
            {
                Id = id,
                BankId = 2,
                Name = "Branch2",
                Code = GenerateCode()
            };
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
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> InsertAsync([FromBody] Branch branch)
        {
            await Task.Run(() => { });
            return base.GetCreatedActionResult<Branch, int>("GetListAsync", branch);
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
            return base.GetOKActionResult();
        }

        [HttpPut("DeleteAsync")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> DeleteAsync([FromRoute] int id)
        {
            if (id <= 0)
            {
                return base.GetInvalidRequestResult();
            }
            await Task.Run(() => { });
            return base.GetOKActionResult();
        }

        [HttpPut("DeleteByBankIdAsync")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> DeleteByBankIdAsync([FromRoute] int bankId)
        {
            if (bankId <= 0)
            {
                return base.GetInvalidRequestResult();
            }
            await Task.Run(() => { });
            return base.GetOKActionResult();
        }

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
            string activationCode = System.Guid.NewGuid().ToString();
            int length = 10; // Number of characters to generate
            return activationCode.Substring(0, length);
        }

    }
}