﻿namespace Api.Models.Authentication
{
    public readonly struct AuthenticationData
    {
        public string Token { get; }
        public long TokenExpirationTime { get; }
        public int Id { get; }

        public AuthenticationData(string token, long tokenExpirationTime, int id)
        {
            Token = token;
            TokenExpirationTime = tokenExpirationTime;
            Id = id;
        }
    }
}
