using Api.Database.Dbo;
using Api.Database.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
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

        [HttpGet("bytime/{groupId:int}")]
        public UserAccount CalculateByLeastRecent(int groupId)
        {
            var drives = _driveRepository.GetDrivesByUserGroup(groupId);
            var drivers = new Dictionary<int, DateTime>();

            foreach (var drive in drives)
            {
                var dateTime = DateTime.Parse(drive.Timestamp);

                if (!drivers.ContainsKey(drive.Driver.Id))
                {
                    drivers.Add(drive.Driver.Id, dateTime);
                }
                else
                {
                    if (dateTime < drivers[drive.Driver.Id])
                    {
                        drivers[drive.Driver.Id] = dateTime;
                    }
                }
            }

            var leastRecentDriverId = drivers.OrderBy(x => x.Value).FirstOrDefault().Key;
            return _userAccountRepository.GetSingle(x => x.Id == leastRecentDriverId);
        }

        [HttpGet("byduration/{groupId:int}")]
        public UserAccount CalculateByDuration(int groupId)
        {
            var drives = _driveRepository.GetDrivesByUserGroup(groupId);
            var drivers = new Dictionary<int, decimal>();

            foreach (var drive in drives)
            {
                if (!drivers.ContainsKey(drive.Driver.Id))
                {
                    drivers.Add(drive.Driver.Id, 0m);
                }

                drivers[drive.Driver.Id] += drive.DurationInSeconds;
            }

            var lowestDurationUserId = drivers.OrderBy(x => x.Value).FirstOrDefault().Key;
            return _userAccountRepository.GetSingle(x => x.Id == lowestDurationUserId);
        }
    }
}
