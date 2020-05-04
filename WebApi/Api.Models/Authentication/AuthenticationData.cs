namespace Api.Models.Authentication
{
    public readonly struct AuthenticationData
    {
        public string Token { get; }
        public long TokenExpirationTime { get; }
        public string Id { get; }

        public AuthenticationData(string token, long tokenExpirationTime, string id)
        {
            Token = token;
            TokenExpirationTime = tokenExpirationTime;
            Id = id;
        }
    }
}
