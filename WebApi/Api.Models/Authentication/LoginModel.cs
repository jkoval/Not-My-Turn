using Api.Models.Dto;

namespace Api.Models.Authentication
{
    public class LoginModel : BaseModel
    {
        public string Username { get; set; }
        public string Password { get; set; }

        public override bool IsValid => !string.IsNullOrWhiteSpace(Username) && !string.IsNullOrWhiteSpace(Password);
    }
}
