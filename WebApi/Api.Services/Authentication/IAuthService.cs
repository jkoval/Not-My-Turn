using Api.Models.Authentication;

namespace Api.Services.Authentication
{
    public interface IAuthService
    {
        AuthenticationData GetAuthenticationData(int id);

        string GetPasswordHash(string password);
        bool VerifyPassword(string password, string passwordHash);
    }
}
