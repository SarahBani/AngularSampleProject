using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Core.ApplicationService.Contracts;
using UserInterface.Models;
using Microsoft.AspNetCore.Authorization;
using Core.DomainModel;

namespace WebApplication.Controllers
{
    [Route("Auth")]
    [ApiController]
    public class AuthenticationController : BaseAPIController
    {

        #region Properties

        private readonly IAuthService _authService;

        #endregion /Properties

        #region Constructors

        public AuthenticationController(IAuthService authService)
        {
            this._authService = authService;
        }

        #endregion /Constructors

        #region Actions

        [AllowAnonymous]
        [HttpGet("HasEmailExisted/{email}")]
        public bool HasEmailExisted([FromRoute] string email)
        {
            return this._authService.HasEmailAlreadyExisted(email);
        }

        [AllowAnonymous]
        [HttpPost, Route("SignUp")]
        public async Task<IActionResult> SignUpAsync([FromBody] AuthModel model)
        {
            if (model == null)
            {
                return base.GetInvalidRequestResult();
            }
            var transactionResult = await this._authService.SignUp(model.Email, model.Password);
            if (transactionResult.IsSuccessful)
            {
                return base.GetOKResult();
            }
            return base.GetErrorResult(transactionResult);
        }

        [AllowAnonymous]
        [HttpPost, Route("Login")]
        public async Task<IActionResult> LoginAsync([FromBody] AuthModel model)
        //public async Task<IActionResult> RequestToken([FromBody] UserCredential request)
        {
            if (model == null)
            {
                return base.GetInvalidRequestResult();
            }
            var transactionResult = await this._authService.GetAuthenticationToken(model.Email, model.Password);
            if (transactionResult.IsSuccessful)
            {
                var response = transactionResult.Content;
                return base.GetActionResult(response);
            }
            return base.GetErrorResult(transactionResult);
            //return Unauthorized();
        }

        [Authorize]
        [HttpGet, Route("GetTest")]
        public IActionResult GetTest()
        {
            var data = new string[] { "value1", "value2", "value3", "value4", "value5" };
            return Ok(data);
        }

        #endregion /Actions

    }
}
