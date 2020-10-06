using System.Threading.Tasks;
using WebApplication.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Core.ApplicationService.Contracts;

namespace WebApplication.Controllers
{
    [Route("[controller]")]
    public class ContactController : BaseAPIController
    {

        #region Properties

        public IEmailService _emailService { get; set; }

        #endregion /Properties

        #region Constructors

        public ContactController(IEmailService emailService)
        {
            this._emailService = emailService;
        }

        #endregion /Constructors

        #region Actions

        [HttpPost("SendAsync")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> SendAsync([FromBody] Contact contact)
        {
            var result =await this._emailService.SendEmailAsync(contact.Email, contact.Message);
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
