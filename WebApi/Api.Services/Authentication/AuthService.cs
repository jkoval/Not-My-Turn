using Api.Models.Authentication;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security;
using System.Security.Claims;
using System.Text;

namespace Api.Services.Authentication
{
    public class AuthService : IAuthService
    {
        private readonly string _secretKey;
        private readonly int _jwtLifespan;

        public AuthService(string secretKey, int jwtLifespan)
        {
            _secretKey = secretKey;
            _jwtLifespan = jwtLifespan;
        }

        public AuthenticationData GetAuthenticationData(string id)
        {
            var tokenExpirationTime = DateTime.UtcNow.AddSeconds(_jwtLifespan);

            var securityTokenDescriptor = GetSecurityTokenDescriptor(id, tokenExpirationTime);
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.WriteToken(tokenHandler.CreateToken(securityTokenDescriptor));

            return new AuthenticationData(token, ((DateTimeOffset)tokenExpirationTime).ToUnixTimeSeconds(), id);
        }

        private SecurityTokenDescriptor GetSecurityTokenDescriptor(string id, DateTime expirationTime)
        {
            return new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, id)
                }),
                Expires = expirationTime,
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey)),
                    SecurityAlgorithms.HmacSha256Signature)
            };
        }

        public string GetPasswordHash(SecureString password) => throw new System.NotImplementedException();
    }
}
