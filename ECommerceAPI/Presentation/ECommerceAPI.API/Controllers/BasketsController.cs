﻿using Application.Features.Commands.BasketCommands.AddItemToBasket;
using Application.Features.Commands.BasketCommands.RemoveBasketItem;
using Application.Features.Commands.BasketCommands.UpdateQuantity;
using Application.Features.Queries.BasketQueries.GetBasketItems;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ECommerceAPI.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes ="Admin")]
    public class BasketsController : ControllerBase
    {
        readonly IMediator _mediator;

        public BasketsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetBasketItems([FromQuery]GetBasketItemsQueryRequest request)
        {
           List<GetBasketItemsQueryResponse> response =  await _mediator.Send(request);

            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> AddItemToBasket(AddItemToBasketCommandRequest request)
        {
           AddItemToBasketCommandResponse response = await _mediator.Send(request);

            return Ok(response);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateQuantity(UpdateQuantityCommandRequest request)
        {
            UpdateQuantityCommandResponse response = await _mediator.Send(request);

            return Ok(response);
        }

        [HttpDelete("{BasketItemId}")]
        public async Task<IActionResult> RemoveItemFromBasket([FromRoute]RemoveBasketItemCommandRequest request)
        {
            RemoveBasketItemCommandResponse response = await _mediator.Send(request);

            return Ok(response);
        }
    }
}
