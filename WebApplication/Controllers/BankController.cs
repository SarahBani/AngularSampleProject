using Core.DomainModel.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication.Controllers
{
    [Route("[controller]")]
    public class BankController : BaseUploaderAPIController
    {

        #region Constructors

        public BankController()
        {
        }

        #endregion /Constructors

        #region Actions

        [HttpGet("ItemAsync/{id}")]
        public async Task<Bank> GetItemAsync([FromRoute] int id)
        {
            await Task.Run(() => { });
            return GetBanks().AsQueryable().Single(q => q.Id.Equals(id));
        }

        [HttpGet("ListAsync")]
        public async Task<IEnumerable<Bank>> GetListAsync()
        {
            await Task.Run(() => { });
            return GetBanks().ToArray();
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
                return base.GetInvalidModelResult();
            }
            await Task.Run(() => { });
            return base.GetCreatedActionResult<Bank, int>("GetListAsync", bank);
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

        [HttpPost("UploadLogo"), DisableRequestSizeLimit]
        public IActionResult UploadLogo()
        {
            return base.UploadImage("Banks");
        }

        #endregion /Actions

        #region Methods

        private IEnumerable<Bank> GetBanks()
        {
            return Enumerable.Range(1, 5).Select(index => new Bank
            {
                Id = index,
                Name = $"Bank {index}",
                LogoUrl = $"banks/{index}.png"
            });
        }

        #endregion /Methods

    }
}