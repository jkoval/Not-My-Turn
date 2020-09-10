using Api.Database.Dbo;
using Api.Database.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace NotMyTurnWebApi.Controllers
{
    [Route("api/calculate")]
    [ApiController]
    public class CalculateDriverController : ControllerBase
    {
        private readonly IDriveRepository _driveRepository;
        private readonly IUserAccountRepository _userAccountRepository;

        public CalculateDriverController(IDriveRepository driveRepository, IUserAccountRepository userAccountRepository)
        {
            _driveRepository = driveRepository;
            _userAccountRepository = userAccountRepository;
        }

        [HttpGet("bydistance/{groupId:int}")]
        public UserAccount CalculateByDistance(int groupId)
        {
            var drives = _driveRepository.GetDrivesByUserGroup(groupId);
            var drivers = new Dictionary<int, decimal>();

            foreach (var drive in drives)
            {
                if (!drivers.ContainsKey(drive.Driver.Id))
                {
                    drivers.Add(drive.Driver.Id, 0m);
                }

                drivers[drive.Driver.Id] += drive.DistanceInKm;
            }

            var lowestDistanceUserId = drivers.OrderBy(x => x.Value).FirstOrDefault().Key;
            return _userAccountRepository.GetSingle(x => x.Id == lowestDistanceUserId);
        }
    }
}
