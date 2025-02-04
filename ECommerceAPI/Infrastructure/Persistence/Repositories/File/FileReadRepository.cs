using Application.Repositories;
using Persistence.DbContexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Repositories
{
    public class FileReadRepository : ReadRepository<Domain.Entites.File>, IFileReadRepository
    {
        public FileReadRepository(ECommerceDbContext context) : base(context)
        {
        }
    }
}
