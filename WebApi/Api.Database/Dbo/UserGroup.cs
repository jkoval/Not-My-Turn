using System.Collections.Generic;

namespace Api.Database.Dbo
{
    public class UserGroup
    {
        public UserGroup()
        {
            Users = new HashSet<UserGroupUser>();
        }

        public int Id { get; set; }

        public string Name { get; set; }

        public virtual ICollection<UserGroupUser> Users { get; set; }
    }
}
