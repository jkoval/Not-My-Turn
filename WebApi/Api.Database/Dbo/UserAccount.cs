namespace Api.Database.Dbo
{
    public class UserAccount
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string PasswordHash { get; set; }

        public string Name { get; set; }
    }
}
