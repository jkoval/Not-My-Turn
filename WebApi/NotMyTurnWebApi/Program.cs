using Api.Models.Dbo;
using Api.Services.Authentication;
using Api.Services.Database;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace NotMyTurnWebApi
{
    public static class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();

            using (var scope = host.Services.CreateScope())
            {
                var authService = scope.ServiceProvider.GetRequiredService<IAuthService>();

                var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
                context.UserAccounts.Add(new UserAccount
                {
                    Id = "1",
                    Username = "Jack",
                    PasswordHash = authService.GetPasswordHash("MyPassword"),
                    Name = "Jack"
                });
                context.SaveChanges();
            }

            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args)
        {
            return Host.CreateDefaultBuilder(args).ConfigureWebHostDefaults(webBuilder => webBuilder.UseStartup<Startup>());
        }
    }
}
