namespace Api.Models.Dbo
{
    public class UserAccount
    {
        public string Id { get; set; }
        public string Username { get; set; }
        public string PasswordHash { get; set; }
        public string Name { get; set; }
    }
}
