using Newtonsoft.Json;

namespace Api.Services.Routing
{
    public class RouteParser : IRouteParser
    {
        private dynamic _route;

        public int DistanceInKm => _route.response.route[0].summary.distance;

        public int DurationInSeconds => _route.response.route[0].summary.baseTime;

        public void LoadRoute(string jsonRoute)
        {
            _route = JsonConvert.DeserializeObject(jsonRoute);
        }
    }
}
