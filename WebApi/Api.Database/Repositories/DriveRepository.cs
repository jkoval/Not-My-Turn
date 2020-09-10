using Api.Database.Dbo;
using System.Collections.Generic;
using System.Linq;

namespace Api.Database.Repositories
{
    public class DriveRepository : BaseRepository<Drive>, IDriveRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public DriveRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<Drive> GetDrivesByUserGroup(int userGroupId)
        {
            return _dbContext.Drives
                .Where(x => x.Group.Id == userGroupId);
        }
    }
}
