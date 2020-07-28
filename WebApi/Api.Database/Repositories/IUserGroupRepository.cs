using Api.Database.Dbo;
using System.Collections.Generic;

namespace Api.Database.Repositories
{
    public interface IUserGroupRepository : IRepository<UserGroup>
    {
        UserGroup CreateAndAddNewGroup(string name, UserAccount admin);

        void AddUserToGroup(UserAccount user, UserGroup group);

        UserGroup LoadUserGroup(int id);

        IEnumerable<UserGroup> LoadUserGroupsByUserId(int userId);
    }
}
