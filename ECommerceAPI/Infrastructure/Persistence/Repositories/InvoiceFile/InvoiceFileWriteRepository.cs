using Application.Repositories;
using Domain.Entites;
using Persistence.DbContexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Repositories
{
    public class InvoiceFileWriteRepository : WriteRepository<InvoiceFile>, IInvoiceFileWriteRepository
    {
        public InvoiceFileWriteRepository(ECommerceDbContext context) : base(context)
        {
        }
    }
}
