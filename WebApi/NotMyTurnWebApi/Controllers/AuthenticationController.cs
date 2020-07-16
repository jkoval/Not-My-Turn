using Api.Database.Dbo;
using Api.Database.Repositories;
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
        private readonly IUserAccountRepository _userAccountRepository;

        public AuthenticationController(IAuthService authService, IUserAccountRepository userAccountRepository)
        {
            _authService = authService;
            _userAccountRepository = userAccountRepository;
        }

        [HttpPost("login")]
        public ActionResult<AuthenticationData> Post([FromBody]LoginModel loginModel)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            if (!loginModel.IsValid)
                return Unauthorized(new { Error = "Invalid Username or Password" });

            var userAccount = _userAccountRepository.GetSingle(x => x.Username == loginModel.Username);
            if (userAccount == null)
                return Unauthorized(new { Error = "Invalid Username or Password" });

            if (!_authService.VerifyPassword(loginModel.Password, userAccount.PasswordHash))
                return Unauthorized(new { Error = "Invalid Username or Password" });

            return _authService.GetAuthenticationData(userAccount.Id);
        }

        [HttpPost("register")]
        public ActionResult<AuthenticationData> Post([FromBody]RegisterModel registerModel)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            if (!registerModel.IsValid)
                return BadRequest(new { Error = "Invalid fields" });

            if (!_userAccountRepository.IsUsernameUnique(registerModel.Username))
                return BadRequest(new { Error = "Username already exists" });

            var userAccount = new UserAccount
            {
                Id = 2,
                Username = registerModel.Username,
                PasswordHash = _authService.GetPasswordHash(registerModel.Password),
                Name = registerModel.Name
            };

            _userAccountRepository.Add(userAccount);
            _userAccountRepository.Commit();

            return _authService.GetAuthenticationData(userAccount.Id);
        }
    }
}