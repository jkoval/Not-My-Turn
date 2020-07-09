using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace NotMyTurnWebApi.Controllers
{
    [Route("api/test")]
    [Authorize]
    [ApiController]
    public class TestController : ControllerBase
    {
        [HttpGet("test")]
        public ActionResult<string> Get()
        {
            var userId = this.GetJwtUserId();

            return new ActionResult<string>(userId);
        }
    }
}