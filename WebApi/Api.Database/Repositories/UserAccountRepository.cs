using Api.Database.Dbo;

namespace Api.Database.Repositories
{
    public class UserAccountRepository : BaseRepository<UserAccount>, IUserAccountRepository
    {
        public UserAccountRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
        }

        public bool IsUsernameUnique(string username)
        {
            return GetSingle(x => x.Username == username) == null;
        }
    }
}
