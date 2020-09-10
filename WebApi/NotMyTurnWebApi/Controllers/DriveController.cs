using Api.Database.Dbo;
using Api.Database.Repositories;
using Api.Models.Drives;
using Api.Services.Routing;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace NotMyTurnWebApi.Controllers
{
    [Route("api/drive")]
    [ApiController]
    public class DriveController : ControllerBase
    {
        private readonly IDriveRepository _driveRepository;
        private readonly IUserAccountRepository _userAccountRepository;
        private readonly IUserGroupRepository _userGroupRepository;
        private readonly IRouteFinder _routeFinder;
        private readonly IRouteParser _routeParser;

        public DriveController(IDriveRepository driveRepository,
                               IUserAccountRepository userAccountRepository,
                               IUserGroupRepository userGroupRepository,
                               IRouteFinder routeFinder,
                               IRouteParser routeParser)
        {
            _driveRepository = driveRepository;
            _userAccountRepository = userAccountRepository;
            _userGroupRepository = userGroupRepository;
            _routeFinder = routeFinder;
            _routeParser = routeParser;
        }

        [HttpPost("create")]
        public ActionResult<Drive> Create([FromBody] AddDriveModel addDriveModel)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var driverUserAccount = _userAccountRepository.GetSingle(x => x.Id == addDriveModel.DriverUserId);
            if (driverUserAccount == null)
            {
                return BadRequest();
            }

            var passengers = new List<UserAccount>();

            foreach (var userId in addDriveModel.PassengerUserIds)
            {
                var userAccount = _userAccountRepository.GetSingle(x => x.Id == userId);
                if (userAccount == null)
                {
                    return BadRequest();
                }

                passengers.Add(userAccount);
            }

            var userGroup = _userGroupRepository.GetSingle(x => x.Id == addDriveModel.UserGroupId);
            if (userGroup == null)
            {
                return BadRequest();
            }

            var route = _routeFinder.GetRoute(addDriveModel.Locations.Select(Location.FromString));
            _routeParser.LoadRoute(route);

            var drive = new Drive
            {
                Driver = driverUserAccount,
                Passengers = passengers,
                Group = userGroup,
                DistanceInKm = _routeParser.DistanceInKm,
                DurationInSeconds = _routeParser.DurationInSeconds,
                Timestamp = addDriveModel.Timestamp
            };

            _driveRepository.Add(drive);
            _driveRepository.Commit();
            return drive;
        }
    }
}