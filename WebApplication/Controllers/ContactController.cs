using System.Threading.Tasks;
using WebApplication.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApplication.Controllers
{
    [Route("[controller]")]
    public class ContactController : BaseAPIController
    {

        [HttpPost("SendAsync")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> SendAsync([FromBody] Contact contact)
        {
            //bool isSent = await Task.Run(() => SendMail());
            bool isSent = await SendMail();
            if (isSent)
            {
                return base.GetOKActionResult();
            }
            else
            {
                return base.GetErrorResult();
            }
        }

        /// <summary>
        /// a fake method
        /// </summary>
        /// <returns></returns>
        private async Task<bool> SendMail()
        {
            await Task.Delay(1000);
            return true;
        }

    }
}
