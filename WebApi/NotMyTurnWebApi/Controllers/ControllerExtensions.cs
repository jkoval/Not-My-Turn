using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace NotMyTurnWebApi.Controllers
{
    public static class ControllerExtensions
    {
        public static int GetJwtUserId(this ControllerBase controllerBase)
        {
            var claimsIdentity = controllerBase.User.Identity as ClaimsIdentity;
            return int.Parse(claimsIdentity.FindFirst(ClaimTypes.Name)?.Value);
        }
    }
}
