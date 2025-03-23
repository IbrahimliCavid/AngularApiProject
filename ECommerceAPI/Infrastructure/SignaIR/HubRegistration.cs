using Microsoft.AspNetCore.Builder;
using SignalR.Hubs;

namespace SignalR
{
    public static class HubRegistration
    {
        public static void MapHubs(this WebApplication app)
        {
            app.MapHub<ProductHub>("/products-hub");
            app.MapHub<OrderHub>("/orders-hub");
        }
    }
}
