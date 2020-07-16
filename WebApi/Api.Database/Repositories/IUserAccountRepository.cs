using Api.Database.Dbo;

namespace Api.Database.Repositories
{
    public interface IUserAccountRepository : IRepository<UserAccount>
    {
        bool IsUsernameUnique(string username);
    }
}
