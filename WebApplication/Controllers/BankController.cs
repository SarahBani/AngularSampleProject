using Core.DomainModel.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
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
            var bank = await this._bankService.GetByIdAsync(id);
            base.FilePath = bank?.LogoUrl ?? string.Empty;
            return bank;
        }

        [HttpGet("ListAsync")]
        public async Task<IEnumerable<Bank>> GetListAsync()
        {
            return await this._bankService.GetAllAsync();
        }

        [HttpGet("CountAsync")]
        public async Task<int> GetCountAsync()
        {
            return await this._bankService.GetCountAsync();
        }

        [HttpPost("InsertAsync")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> InsertAsync([FromBody] Bank bank)
        {
            var result = await this._bankService.InsertAsync(bank);
            if (result.IsSuccessful)
            {
                if (string.IsNullOrEmpty(bank.LogoUrl))
                {
                    base.DeletePreviousFile();
                }
                this.FilePath = string.Empty;
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
        public async Task<IActionResult> UpdateAsync([FromRoute] int id, [FromBody] Bank bank)
        {
            if (id <= 0)
            {
                return base.GetInvalidRequestResult();
            }
            var result = await this._bankService.UpdateAsync(bank);
            if (result.IsSuccessful)
            {
                if (string.IsNullOrEmpty(bank.LogoUrl))
                {
                    base.DeletePreviousFile();
                }
                this.FilePath = string.Empty;
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
            var result = await this._bankService.DeleteAsync(id);
            if (result.IsSuccessful)
            {
                base.DeletePreviousFile();
                return base.GetOKResult();
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

    }
}