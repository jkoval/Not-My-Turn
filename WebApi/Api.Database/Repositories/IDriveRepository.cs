using Api.Database.Dbo;
using System.Collections.Generic;

namespace Api.Database.Repositories
{
    public interface IDriveRepository : IRepository<Drive>
    {
        IEnumerable<Drive> GetDrivesByUserGroup(int userGroupId);
    }
}
