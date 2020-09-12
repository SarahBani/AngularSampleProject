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
    public class BankController : ControllerBase
    {

        [HttpGet("ItemAsync")]
        public async Task<Bank> GetItemAsync([FromRoute] int id)
        {
            await Task.Run(() => { });
            return new Bank
            {
                Id = 2,
                Name = "Bank2",
                LogoUrl = "2.png"
            };
        }

        [HttpGet("ListAsync")]
        public async Task<IEnumerable<Bank>> GetListAsync()
        {
            await Task.Run(() => { });
            return Enumerable.Range(1, 5).Select(index => new Bank
            {
                Id = index,
                Name = $"Bank{index}",
                LogoUrl = $"{index}.png"
            })
             .ToArray();
        }

        [HttpGet("CountAsync")]
        public async Task<int> GetCountAsync()
        {
            await Task.Run(() => { });
            return 5;
        }

        [HttpPost("InsertAsync")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> InsertAsync([FromBody] Bank bank)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            await Task.Run(() => { });
            return CreatedAtAction("GetListAsync", new { id = bank.Id }, bank);
        }

        [HttpPost("eee")]
        public async Task<IActionResult> eee([FromBody] Bank bank)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            await Task.Run(() => { });
            return Ok();
        }

        [HttpPut("UpdateAsync")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateAsync([FromRoute] int id, [FromBody] Bank bank)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (id <= 0)
            {
                return BadRequest();
            }
            await Task.Run(() => { });
            return Ok(); // Http status code 200
        }

        [HttpPut("DeleteAsync")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> DeleteAsync([FromRoute] int id)
        {
            if (id <= 0)
            {
                return BadRequest();
            }
            await Task.Run(() => { });
            return Ok(); // Http status code 200
        }

    }
}