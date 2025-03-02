using Microsoft.AspNetCore.Diagnostics;
using System.Text.Json;
using System.Net.Mime;
using System.Net;

namespace ECommerceAPI.API.Extensions
{
    public static class ConfigureExceptionHandlerExtension
    {
        public static void ConfigureExceptionHandler(this WebApplication app)
        {
            app.UseExceptionHandler(builder =>
            {
                builder.Run(async context =>
                {
                    context.Response.StatusCode =(int) HttpStatusCode.InternalServerError;
                    context.Response.ContentType = MediaTypeNames.Application.Json;

                  var contextFeature =  context.Features.Get<IExceptionHandlerFeature>();

                    if (contextFeature != null)
                    {
                       app.Logger.LogError($"Something went wrong: {contextFeature.Error.Message}");

                      await  context.Response.WriteAsync(JsonSerializer.Serialize(new
                        {
                            StatusCode = context.Response.StatusCode,
                            Message = $"Something went wrong: {contextFeature.Error.Message}",
                            Title = "Internal Server Error"
                        }));
                    }
                });
            });
        }
    }
}
