using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using AngularSampleProject.Models;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace AngularSampleProject.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BranchController : BaseAPIController
    {

        //[HttpGet("ItemAsync")]
        [HttpGet("{id}")]
        public async Task<Branch> GetItemAsync([FromRoute] int id)
        {
            await Task.Run(() => { });
            return new Branch
            {
                Id = 5,
                BankId = 2,
                Name = "Branch5",
                Code = "a11"
            };
        }

        [HttpGet("ListByBankIdAsync")]
        public async Task<IEnumerable<Branch>> GetListByBankIdAsync([FromHeader] int bankId)
        {
            await Task.Run(() => { });
            return Enumerable.Range(1, 10).Select(index => new Branch
            {
                Id = index,
                BankId = bankId,
                Name = $"Branch{index}",
                Code = index.ToString()
            })
              .ToArray();
        }

        [HttpGet("CountByBankIdAsync")]
        public async Task<int> GetCountAsync([FromHeader] int bankId)
        {
            await Task.Run(() => { });
            return 5;
        }

        [HttpPost("InsertAsync")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> InsertAsync([FromBody] Branch branch)
        {
            if (!ModelState.IsValid)
            {
                return base.GetInvalidModelActionResult();
            }
            await Task.Run(() => { });
            return base.GetCreatedActionResult<Branch, int>("GetListAsync", branch);
        }

        [HttpPut("UpdateAsync")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateAsync([FromRoute] int id, [FromBody] Branch branch)
        {
            if (!ModelState.IsValid)
            {
                return base.GetInvalidModelActionResult();
            }
            if (id <= 0)
            {
                return base.GetInvalidRequestActionResult();
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
                return base.GetInvalidRequestActionResult();
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
                return base.GetInvalidRequestActionResult();
            }
            await Task.Run(() => { });
            return base.GetOKActionResult();
        }

    }
}