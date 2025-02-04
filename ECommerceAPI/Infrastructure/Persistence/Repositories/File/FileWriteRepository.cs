using Application.Repositories;
using Persistence.DbContexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Repositories
{
    public class FileWriteRepository : WriteRepository<Domain.Entites.File>, IFileWriteRepository
    {
        public FileWriteRepository(ECommerceDbContext context) : base(context)
        {
        }
    }
}
