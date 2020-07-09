using Api.Models.Dto;

namespace Api.Models.Authentication
{
    public class RegisterModel : BaseModel
    {
        public string Name { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }

        public override bool IsValid => !string.IsNullOrWhiteSpace(Username)
            && !string.IsNullOrWhiteSpace(Password)
            && !string.IsNullOrWhiteSpace(Name);
    }
}
