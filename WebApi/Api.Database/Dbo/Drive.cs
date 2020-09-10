using System;
using System.Collections.Generic;

namespace Api.Database.Dbo
{
    public class Drive
    {
        public int Id { get; set; }

        public virtual UserGroup Group { get; set; }
        public virtual ICollection<UserAccount> Passengers { get; set; }
        public virtual UserAccount Driver { get; set; }

        public int DistanceInKm { get; set; }
        public int DurationInSeconds { get; set; }

        public string Timestamp { get; set; }
    }
}
