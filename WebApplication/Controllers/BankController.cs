using Core.DomainModel.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.ApplicationService.Contracts;

namespace WebApplication.Controllers
{
    [Route("[controller]")]
    public class BankController : BaseUploaderAPIController
    {

        #region Properties

        public IBankService _bankService { get; set; }

        #endregion /Properties

        #region Constructors

        public BankController(IBankService bankService)
        {
            this._bankService = bankService;
        }

        #endregion /Constructors

        #region Actions

        [HttpGet("ItemAsync/{id}")]
        public async Task<Bank> GetItemAsync([FromRoute] int id)
        {
            return await this._bankService.GetByIdAsync(id);
        }

        [HttpGet("ListAsync")]
        public async Task<IEnumerable<Bank>> GetListAsync()
        {
            var banks = await this._bankService.GetAllAsync();
            return banks.ToArray();
        }

        [HttpGet("CountAsync")]
        public async Task<int> GetCountAsync()
        {
            return await this._bankService.GetCountAsync();
        }

        [HttpPost("InsertAsync")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> InsertAsync([FromBody] Bank bank)
        {
            if (!ModelState.IsValid)
            {
                return base.GetInvalidModelResult();
            }
            var result = await this._bankService.InsertAsync(bank);
            if (result.IsSuccessful)
            {
                return base.GetCreatedActionResult<Bank, int>("GetListAsync", bank);
            }
            else
            {
                return base.GetErrorResult(result.ExceptionContentResult);
            }
        }

        [HttpPut("UpdateAsync/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateAsync([FromRoute] int id, [FromBody] Bank bank)
        {
            if (!ModelState.IsValid)
            {
                return base.GetInvalidModelResult();
            }
            if (id <= 0)
            {
                return base.GetInvalidRequestResult();
            }
            var result = await this._bankService.UpdateAsync(bank);
            if (result.IsSuccessful)
            {
                return base.GetOKActionResult();
            }
            else
            {
                return base.GetErrorResult(result.ExceptionContentResult);
            }
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
            var result = await this._bankService.DeleteAsync(id);
            if (result.IsSuccessful)
            {
                return base.GetOKActionResult();
            }
            else
            {
                return base.GetErrorResult(result.ExceptionContentResult);
            }
        }

        [HttpPost("UploadLogo"), DisableRequestSizeLimit]
        public IActionResult UploadLogo()
        {
            return base.UploadImage("Banks");
        }

        #endregion /Actions

        #region Methods

        //private IEnumerable<Bank> GetBanks()
        //{
        //    return Enumerable.Range(1, 5).Select(index => new Bank
        //    {
        //        Id = index,
        //        Name = $"Bank {index}",
        //        LogoUrl = $"banks/{index}.png"
        //    });
        //}

        #endregion /Methods

    }
}