using Application.Abstractions.Services;
using Application.Dtos.Order;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Queries.OrderQueries.GetAllOrders
{
    public class GetAllOrdersQueryHandler : IRequestHandler<GetAllOrdersQueryRequest, GetAllOrdersQueryResponse>
    {
        readonly IOrderService _orderService;

        public GetAllOrdersQueryHandler(IOrderService orderService)
        {
            _orderService = orderService;
        }

        public async Task<GetAllOrdersQueryResponse> Handle(GetAllOrdersQueryRequest request, CancellationToken cancellationToken)
        {
          var orders =  await _orderService.GetAllOrdersAsync(request.Page, request.Size);

            return new GetAllOrdersQueryResponse()
            {
                TotalCount = orders.TotalCount,
                Orders = orders.Orders,
            };
            
        }
    }
}
