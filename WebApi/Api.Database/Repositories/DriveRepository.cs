using Api.Database.Dbo;
using Microsoft.EntityFrameworkCore;
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
                .Include(x => x.Driver)
                .Include(x => x.Group)
                .ThenInclude(x => x.Users)
                .Where(x => x.Group.Id == userGroupId);
        }
    }
}
