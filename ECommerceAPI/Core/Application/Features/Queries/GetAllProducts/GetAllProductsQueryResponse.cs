using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Queries.GetAllProducts
{
    public class GetAllProductsQueryResponse
    {
        public int ToatalCount { get; set; }
        public object Products { get; set; }
    }
}
