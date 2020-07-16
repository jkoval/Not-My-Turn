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
        public DbSet<UserGroup> UserGroups { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<UserGroupUser>().HasKey(x => new { x.UserId, x.GroupId });

            builder.Entity<UserGroupUser>()
                .HasOne(x => x.User)
                .WithMany(x => x.Groups)
                .HasForeignKey(x => x.UserId);

            builder.Entity<UserGroupUser>()
                .HasOne(x => x.Group)
                .WithMany(x => x.Users)
                .HasForeignKey(x => x.GroupId);
        }
    }
}
