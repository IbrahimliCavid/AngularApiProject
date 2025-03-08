using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Queries.ProductImageFileQueries.GetProductImage
{
    public class GetProductImageQueryResponse
    {
        public string Path { get; set; }    
        public string FileName { get; set; }
        public Guid Id { get; set; }
        public bool Showcase { get; set; }
        
    }
}
