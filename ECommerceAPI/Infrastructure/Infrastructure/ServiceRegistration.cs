using Application.Services;
using Infrastructure.Services;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure
{
    public static class ServiceRegistration
    {
        public static void AddInfrastutuctureServices(this IServiceCollection services) { 
        services.AddScoped<IFileService, FileService>();
        }
    }
}
