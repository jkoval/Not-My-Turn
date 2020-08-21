namespace Api.Services.Routing
{
    public interface IRouteParser
    {
        void LoadRoute(string jsonRoute);

        int DistanceInKm { get; }
        int DurationInSeconds { get; }
    }
}
