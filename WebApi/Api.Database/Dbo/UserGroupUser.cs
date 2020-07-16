namespace Api.Database.Dbo
{
    public class UserGroupUser
    {
        public int UserId { get; set; }
        public virtual UserAccount User { get; set; }

        public int GroupId { get; set; }
        public virtual UserGroup Group { get; set; }

        public int Permissions { get; set; }
    }
}
