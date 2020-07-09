using Api.Models.Dbo;

namespace Api.Services.Database.Repositories
{
    public interface IUserAccountRepository : IRepository<UserAccount>
    {
        bool IsUsernameUnique(string username);
    }
}
