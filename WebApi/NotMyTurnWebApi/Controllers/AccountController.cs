using Api.Database.Dbo;
using Api.Database.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace NotMyTurnWebApi.Controllers
{
    [Route("api/account")]
    [Authorize]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IUserAccountRepository _userAccountRepostiory;

        public AccountController(IUserAccountRepository userAccountRepository)
        {
            _userAccountRepostiory = userAccountRepository;
        }

        [HttpGet("details")]
        public ActionResult<UserAccount> Get()
        {
            var userId = this.GetJwtUserId();
            var userAccount = _userAccountRepostiory.GetSingle(x => x.Id == userId);
            return new ActionResult<UserAccount>(userAccount);
        }
    }
}