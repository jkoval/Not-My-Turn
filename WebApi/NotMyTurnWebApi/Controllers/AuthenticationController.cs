using Api.Models.Authentication;
using Api.Services.Authentication;
using Microsoft.AspNetCore.Mvc;

namespace NotMyTurnWebApi.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthenticationController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public ActionResult<AuthenticationData> Post([FromBody]LoginModel loginModel)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var usernameTest = loginModel.Username;
            var passwordTest = loginModel.Password;

            return _authService.GetAuthenticationData("1");
        }
    }
}