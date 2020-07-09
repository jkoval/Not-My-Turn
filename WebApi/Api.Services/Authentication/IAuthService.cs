using Api.Models.Authentication;
using System.Security;

namespace Api.Services.Authentication
{
    public interface IAuthService
    {
        AuthenticationData GetAuthenticationData(string id);

        string GetPasswordHash(string password);
        bool VerifyPassword(string password, string passwordHash);
    }
}
