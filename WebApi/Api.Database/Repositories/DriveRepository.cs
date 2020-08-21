using Api.Database.Dbo;
using System.Collections.Generic;

namespace Api.Database.Repositories
{
    public class DriveRepository : BaseRepository<Drive>, IDriveRepository
    {
        public DriveRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
        }
    }
}
