using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Queries.ProductImageFileQueries.GetProductImage
{
    public class UploadProductImageQueryHandler : IRequestHandler<UploadProductImageQueryRequest, UploadProductImageQueryResponse>
    {
        public Task<UploadProductImageQueryResponse> Handle(UploadProductImageQueryRequest request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
