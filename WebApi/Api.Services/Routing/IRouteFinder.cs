using System;
using System.Collections.Generic;

namespace Api.Services.Routing
{
    public readonly struct Location
    {
        public float Latitude { get; }
        public float Longitude { get; }

        public Location(float latitude, float longitude)
        {
            Latitude = latitude;
            Longitude = longitude;
        }

        public static Location FromString(string location)
        {
            var parts = location.Split(',');

            if (parts.Length != 2)
            {
                throw new ArgumentException(nameof(location));
            }

            return new Location(float.Parse(parts[0]), float.Parse(parts[1]));
        }
    }

    public interface IRouteFinder
    {
        string GetRoute(IEnumerable<Location> locations);
    }
}
