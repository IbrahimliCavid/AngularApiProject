﻿using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Commands.ProductImageFileCommands.DeleteProductImage
{
    public class DeleteProductImageCommandRequest : IRequest<DeleteProductImageCommandResponse>
    {
        public string Id { get; set; }
        public string? ImageId { get; set; }
    }
}
