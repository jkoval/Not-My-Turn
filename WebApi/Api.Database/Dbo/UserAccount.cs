using System.Collections.Generic;

namespace Api.Database.Dbo
{
    public class UserAccount
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string PasswordHash { get; set; }

        public string Name { get; set; }

        public virtual ICollection<UserGroupUser> Groups { get; set; }
    }
}
