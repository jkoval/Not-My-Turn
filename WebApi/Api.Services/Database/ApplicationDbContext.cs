using Api.Models.Dbo;
using Microsoft.EntityFrameworkCore;

namespace Api.Services.Database
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<UserAccount> UserAccounts { get; set; }
    }
}
