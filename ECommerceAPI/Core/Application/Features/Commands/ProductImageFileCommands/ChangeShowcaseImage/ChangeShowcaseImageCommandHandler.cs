using Application.Repositories;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Commands.ProductImageFileCommands.ChangeShowcaseImage
{
    public class ChangeShowcaseImageCommandHandler : IRequestHandler<ChangeShowcaseImageCommandRequest, ChangeShowcaseImageCommandResponse>
    {
        readonly IProductImageFileWriteRepository _productImageFileWriteRepository;

        public ChangeShowcaseImageCommandHandler(IProductImageFileWriteRepository productImageFileWriteRepository)
        {
            _productImageFileWriteRepository = productImageFileWriteRepository;
        }

        public async Task<ChangeShowcaseImageCommandResponse> Handle(ChangeShowcaseImageCommandRequest request, CancellationToken cancellationToken)
        {

            var query = _productImageFileWriteRepository.Table
             .Where(x => x.Products.Any(p => p.Id == Guid.Parse(request.ProductId)));

           var data = await query
             .FirstOrDefaultAsync(pif => pif.Showcase == true);

            if(data != null)
            data.Showcase = false;

           var image = await query.FirstOrDefaultAsync(pif => pif.Id == Guid.Parse(request.ImageId));
            if(image !=null)
            image.Showcase = true;

            await _productImageFileWriteRepository.SaveAsync();

            return new();

        }
    }
}
