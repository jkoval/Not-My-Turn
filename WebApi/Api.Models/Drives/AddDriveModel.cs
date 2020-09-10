namespace Api.Models.Drives
{
    public class AddDriveModel
    {
        public int[] PassengerUserIds { get; set; }
        public int DriverUserId { get; set; }
        public int UserGroupId { get; set; }
        public string[] Locations { get; set; }
        public string Timestamp { get; set; }
    }
}
