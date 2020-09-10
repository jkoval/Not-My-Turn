using Api.Database.Dbo;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace Api.Database.Repositories
{
    public class UserGroupRepository : BaseRepository<UserGroup>, IUserGroupRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public UserGroupRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public void AddUserToGroup(UserAccount user, UserGroup group)
        {
            var userGroupUser = new UserGroupUser
            {
                Group = group,
                User = user,
                Permissions = 0
            };

            group.Users.Add(userGroupUser);
            Commit();
        }

        public UserGroup CreateAndAddNewGroup(string name, UserAccount admin)
        {
            var userGroup = new UserGroup
            {
                Name = name
            };

            var userGroupUser = new UserGroupUser
            {
                Group = userGroup,
                User = admin,
                Permissions = 1
            };

            userGroup.Users.Add(userGroupUser);

            Add(userGroup);
            Commit();
            return userGroup;
        }

        public UserGroup LoadUserGroup(int id)
        {
            return _dbContext.UserGroups
                .Include(x => x.Users)
                .ThenInclude(x => x.User)
                .FirstOrDefault(x => x.Id == id);
        }

        public IEnumerable<UserGroup> LoadUserGroupsByUserId(int userId)
        {
            return _dbContext.UserGroups
                .Include(x => x.Users)
                .ThenInclude(x => x.User)
                .Where(x => x.Users.Any(x => x.UserId == userId));
        }
    }
}
