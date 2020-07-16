using Api.Models.Authentication;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Web.Helpers;

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

        public AuthenticationData GetAuthenticationData(int id)
        {
            var tokenExpirationTime = DateTime.UtcNow.AddSeconds(_jwtLifespan);

            var securityTokenDescriptor = GetSecurityTokenDescriptor(id, tokenExpirationTime);
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.WriteToken(tokenHandler.CreateToken(securityTokenDescriptor));

            return new AuthenticationData(token, ((DateTimeOffset)tokenExpirationTime).ToUnixTimeSeconds(), id);
        }

        public string GetPasswordHash(string password)
        {
            return Crypto.HashPassword(password);
        }

        public bool VerifyPassword(string password, string passwordHash)
        {
            return Crypto.VerifyHashedPassword(passwordHash, password);
        }

        private SecurityTokenDescriptor GetSecurityTokenDescriptor(int id, DateTime expirationTime)
        {
            return new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, id.ToString())
                }),
                Expires = expirationTime,
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey)),
                    SecurityAlgorithms.HmacSha256Signature)
            };
        }
    }
}
