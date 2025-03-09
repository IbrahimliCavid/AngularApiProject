using MediatR;

namespace Application.Features.Queries.BasketQueries.GetBasketItems
{
    public class GetBasketItemsQueryRequest : IRequest<List<GetBasketItemsQueryResponse>>
    {
    }
}