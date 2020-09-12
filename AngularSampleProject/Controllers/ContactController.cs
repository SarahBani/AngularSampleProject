using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AngularSampleProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {

        [HttpPost("SendAsync")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> SendAsync(string email, string message)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //bool isSent = await Task.Run(() => SendMail());
            bool isSent = await SendMail();
            if (isSent)
            {
                return Ok(); // Http status code 200
            }
            else
            {
                return BadRequest();
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
