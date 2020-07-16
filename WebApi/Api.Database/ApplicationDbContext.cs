using Api.Database.Dbo;
using Microsoft.EntityFrameworkCore;

namespace Api.Database
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<UserAccount> UserAccounts { get; set; }
    }
}
