using Api.Database.Dbo;
using Api.Database.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;

namespace NotMyTurnWebApi.Controllers
{
    [Route("api/calculate")]
    [ApiController]
    public class CalculateDriverController : ControllerBase
    {
        private readonly IDriveRepository _driveRepository;
        private readonly IUserAccountRepository _userAccountRepository;
        private readonly Random _random;

        public CalculateDriverController(IDriveRepository driveRepository, IUserAccountRepository userAccountRepository)
        {
            _driveRepository = driveRepository;
            _userAccountRepository = userAccountRepository;

            _random = new Random();
        }

        public (IEnumerable<Drive>, Dictionary<int, T>, IList<int>) GetDrives<T>(int groupId)
        {
            var drives = _driveRepository.GetDrivesByUserGroup(groupId).ToList();
            var drivers = drives.Select(x => x.Driver.Id).Distinct().ToDictionary(x => x, y => default(T));

            var noDrivesAtAll = drives.Count > 0 ? drives[0].Group.Users.Select(x => x.UserId).Where(x => !drivers.ContainsKey(x)).ToList() : new List<int>();
            return (drives, drivers, noDrivesAtAll);
        }

        [HttpGet("bydistance/{groupId:int}")]
        public UserAccount CalculateByDistance(int groupId)
        {
            var (drives, drivers, noDrivesAtAll) = GetDrives<decimal>(groupId);

            foreach (var drive in drives)
            {
                drivers[drive.Driver.Id] += drive.DistanceInKm;
            }

            var lowestDistanceUserId = drivers.OrderBy(x => x.Value).FirstOrDefault().Key;

            if (noDrivesAtAll.Count > 0)
            {
                lowestDistanceUserId = noDrivesAtAll[_random.Next(noDrivesAtAll.Count)];
            }

            return _userAccountRepository.GetSingle(x => x.Id == lowestDistanceUserId);
        }

        [HttpGet("bytime/{groupId:int}")]
        public UserAccount CalculateByLeastRecent(int groupId)
        {
            var (drives, drivers, noDrivesAtAll) = GetDrives<DateTime>(groupId);

            foreach (var drive in drives)
            {
                var dateTime = DateTime.Parse(drive.Timestamp);

                if (dateTime > drivers[drive.Driver.Id])
                {
                    drivers[drive.Driver.Id] = dateTime;
                }
            }

            var leastRecentDriverId = drivers.OrderBy(x => x.Value).FirstOrDefault().Key;

            if (noDrivesAtAll.Count > 0)
            {
                leastRecentDriverId = noDrivesAtAll[_random.Next(noDrivesAtAll.Count)];
            }

            return _userAccountRepository.GetSingle(x => x.Id == leastRecentDriverId);
        }

        [HttpGet("byduration/{groupId:int}")]
        public UserAccount CalculateByDuration(int groupId)
        {
            var (drives, drivers, noDrivesAtAll) = GetDrives<decimal>(groupId);

            foreach (var drive in drives)
            {
                drivers[drive.Driver.Id] += drive.DurationInSeconds;
            }

            var lowestDurationUserId = drivers.OrderBy(x => x.Value).FirstOrDefault().Key;

            if (noDrivesAtAll.Count > 0)
            {
                lowestDurationUserId = noDrivesAtAll[_random.Next(noDrivesAtAll.Count)];
            }

            return _userAccountRepository.GetSingle(x => x.Id == lowestDurationUserId);
        }
    }
}
