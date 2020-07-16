using System;
using System.Linq;
using System.Security.Cryptography;

namespace Api.Services.Authentication
{
    public class PasswordHasher : IPasswordHasher
    {
        private const int SaltSize = 16;
        private const int KeySize = 32;
        private const int Iterations = 10000;

        public string HashPassword(string password)
        {
            using var algorithm = new Rfc2898DeriveBytes(
                password,
                SaltSize,
                Iterations,
                HashAlgorithmName.SHA256);

            var key = Convert.ToBase64String(algorithm.GetBytes(KeySize));
            var salt = Convert.ToBase64String(algorithm.Salt);

            return $"{salt}.{key}";
        }

        public bool VerifyHashedPassword(string hashedPassword, string password)
        {
            var splitHash = hashedPassword.Split('.');

            if (splitHash.Length != 2)
                throw new FormatException("Hashed Password is in the wrong format");

            var salt = Convert.FromBase64String(splitHash[0]);
            var key = Convert.FromBase64String(splitHash[1]);

            using var algorithm = new Rfc2898DeriveBytes(password, salt, Iterations, HashAlgorithmName.SHA256);
            var keyToCheck = algorithm.GetBytes(KeySize);
            return keyToCheck.SequenceEqual(key);
        }
    }
}
