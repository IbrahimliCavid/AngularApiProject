using MediatR;

namespace Application.Features.Commands.BasketCommands.RemoveBasketItem
{
    public class RemoveBasketItemCommandRequest : IRequest<RemoveBasketItemCommandResponse>
    {
        public string BasketItemId { get; set; }    
    }
}