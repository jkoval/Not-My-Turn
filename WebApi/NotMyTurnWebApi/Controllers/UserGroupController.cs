using Api.Database.Dbo;
using Api.Database.Repositories;
using Api.Models.Groups;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace NotMyTurnWebApi.Controllers
{
    [Route("api/group")]
    [ApiController]
    public class UserGroupController : ControllerBase
    {
        private readonly IUserAccountRepository _userAccountRepository;
        private readonly IUserGroupRepository _userGroupRepository;

        public UserGroupController(IUserAccountRepository userAccountRepository, IUserGroupRepository userGroupRepository)
        {
            _userAccountRepository = userAccountRepository;
            _userGroupRepository = userGroupRepository;
        }

        [HttpGet("byuser/{userId:int}")]
        public ActionResult<IEnumerable<UserGroup>> FetchByUserId(int userId)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var user = _userAccountRepository.GetSingle(x => x.Id == userId);
            if (user == null)
                return BadRequest(new { Error = "Not a valid user" });

            return _userGroupRepository.LoadUserGroupsByUserId(userId).ToList();
        }

        [HttpPost("create")]
        public ActionResult<UserGroup> Create([FromBody] CreateGroupModel createGroupModel)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var user = _userAccountRepository.GetSingle(x => x.Id == createGroupModel.UserId);
            if (user == null)
                return BadRequest(new { Error = "Not a valid user" });

            return _userGroupRepository.CreateAndAddNewGroup(createGroupModel.Name, user);
        }

        [HttpPost("adduser")]
        public ActionResult<UserGroup> AddUser([FromBody] AddUserToGroupModel addUserToGroupModel)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var user = _userAccountRepository.GetSingle(x => x.Id == addUserToGroupModel.UserId);
            if (user == null)
                return BadRequest(new { Error = "Not a valid user" });

            var group = _userGroupRepository.LoadUserGroup(addUserToGroupModel.GroupId);
            if (group == null)
                return BadRequest(new { Error = "Not a valid group" });

            _userGroupRepository.AddUserToGroup(user, group);
            return group;
        }

        [HttpPost("delete/{groupId:int}")]
        public ActionResult Delete(int groupId)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var group = _userGroupRepository.GetSingle(x => x.Id == groupId);
            if (group == null)
                return BadRequest(new { Error = "Not a valid group" });

            _userGroupRepository.Delete(group);
            _userGroupRepository.Commit();
            return Ok();
        }
    }
}