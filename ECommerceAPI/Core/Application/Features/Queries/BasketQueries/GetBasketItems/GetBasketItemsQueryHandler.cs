﻿using Application.Abstractions.Services;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Queries.BasketQueries.GetBasketItems
{
    public class GetBasketItemsQueryHandler : IRequestHandler<GetBasketItemsQueryRequest, List<GetBasketItemsQueryResponse>>
    {
        readonly IBasketService _basketService;

        public GetBasketItemsQueryHandler(IBasketService basketService)
        {
            _basketService = basketService;
        }

        public async Task<List<GetBasketItemsQueryResponse>> Handle(GetBasketItemsQueryRequest request, CancellationToken cancellationToken)
        {
          var basketItems = await _basketService.GetBasketItemsAsync();

            return basketItems.Select(bi => new GetBasketItemsQueryResponse
            {
                BasketItemId = bi.Id.ToString(),
                Name = bi.Product.Name,
                Price = bi.Product.Price,
                Quantity = bi.Quantity
            }).ToList();
        }
    }
  
}
