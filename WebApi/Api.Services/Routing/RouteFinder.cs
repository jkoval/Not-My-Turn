using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;

namespace Api.Services.Routing
{
    public class RouteFinder : IRouteFinder
    {
        private const string RouteRequestBase = "https://route.ls.hereapi.com/routing/7.2/calculateroute.json?";
        private const string ApiKey = "apiKey=PcNXuYqWpGF0R0JTIpCSglviIcbgxu1erQEK4_U4p6Y";
        private const string Mode = "mode=fastest;car";

        public string GetRoute(IEnumerable<Location> locations)
        {
            using var httpClient = new HttpClient();

            return httpClient.GetStringAsync(GetUrl(locations.ToList())).Result;
        }

        private string GetUrl(List<Location> locations)
        {
            var stringBuilder = new StringBuilder();

            stringBuilder
                .Append(RouteRequestBase)
                .Append(ApiKey)
                .AppendParam(Mode);

            for (var i = 0; i < locations.Count; i++)
            {
                var location = locations[i];
                stringBuilder.AppendParam("waypoint").Append(i).Append("=geo!").Append(location.Latitude).Append(',').Append(location.Longitude);
            }

            return stringBuilder.ToString();
        }
    }

    public static class StringBuilderExtensions
    {
        public static StringBuilder AppendParam(this StringBuilder stringBuilder, string param)
        {
            return stringBuilder.Append('&').Append(param);
        }
    }
}
