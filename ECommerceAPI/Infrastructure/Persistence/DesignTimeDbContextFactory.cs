using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Persistence.DbContexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence
{
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<ECommerceDbContext>
    {
        public ECommerceDbContext CreateDbContext(string[] args)
        {
           DbContextOptionsBuilder<ECommerceDbContext> optionsBuilder = new ();
            optionsBuilder.UseNpgsql(Configuration.ConnectionString);
            return new ECommerceDbContext(optionsBuilder.Options);
        }
    }
}
