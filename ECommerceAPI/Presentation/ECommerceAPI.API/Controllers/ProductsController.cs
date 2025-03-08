using Application.Features.Commands.ProductCommands.CreateProduct;
using Application.Features.Commands.ProductCommands.DeleteProduct;
using Application.Features.Commands.ProductCommands.UpdateProduct;
using Application.Features.Commands.ProductImageFileCommands.ChangeShowcaseImage;
using Application.Features.Commands.ProductImageFileCommands.DeleteProductImage;
using Application.Features.Commands.ProductImageFileCommands.UploadProductImage;
using Application.Features.Queries.ProductImageFileQueries.GetProductImage;
using Application.Features.Queries.ProductQueries.GetAllProducts;
using Application.Features.Queries.ProductQueries.GetByIdProduct;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace ECommerceAPI.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class ProductsController : ControllerBase
    {

        private readonly IMediator _mediator;
        public ProductsController(IMediator mediator)
        {
          
            _mediator = mediator;
        }

        [HttpGet]
        public  async Task<IActionResult> Get([FromQuery] GetAllProductsQueryRequest request)
        {
       GetAllProductsQueryResponse response =  await  _mediator.Send(request);

            return Ok(response);
        }

        [HttpGet("{Id}")]
        public async Task<IActionResult> Get([FromRoute]GetByIdProductQueryRequest request)
        {
          GetByIdProductQueryResponse response = await _mediator.Send(request);
            return Ok(response);
        }



        [HttpPost]
        [Authorize(AuthenticationSchemes = "Admin")]
        public async Task<IActionResult> Post(CreateProductCommandRequest request)
        {
           CreateProductCommandResponse response =   await _mediator.Send(request);
            return StatusCode((int)HttpStatusCode.Created);
        }

        [HttpPut]
        [Authorize(AuthenticationSchemes = "Admin")]
        public async Task<IActionResult> Put([FromBody]UpdateProductCommandRequest request)
        {
         UpdateProductCommandResponse response =await  _mediator.Send(request);
            return Ok();
        }


        [HttpDelete("{Id}")]
        [Authorize(AuthenticationSchemes = "Admin")]
        public async Task<IActionResult> Delete([FromRoute]DeleteProductCommandRequest request)
        {
            await _mediator.Send(request);  
            return Ok();
        }

        [HttpPost("[action]")]
        [Authorize(AuthenticationSchemes = "Admin")]
        public async Task<IActionResult> Upload([FromQuery] UploadProductImageCommandRequest request)
        {
            request.Files = Request.Form.Files;

         UploadProductImageCommandResponse response =   await _mediator.Send(request);
            return Ok();
        }

        [HttpGet("[action]/{Id}")]
        [Authorize(AuthenticationSchemes = "Admin")]
        public async Task<IActionResult> GetProductImages([FromRoute]GetProductImageQueryRequest request)
        {
         List<GetProductImageQueryResponse> response = await _mediator.Send(request);
           
            return Ok(response);
        }

        [HttpDelete("[action]/{Id}")]
        [Authorize(AuthenticationSchemes = "Admin")]
        public async Task<IActionResult> DeleteProductImage([FromRoute] DeleteProductImageCommandRequest request, [FromQuery] string imageId)
        {
            request.ImageId = imageId;
            DeleteProductImageCommandResponse response = await _mediator.Send(request);
            return Ok();
        }

        [HttpGet("[action]")]
        [Authorize(AuthenticationSchemes = "Admin")]
        public async Task<IActionResult> ChangeShowcaseImage([FromQuery] ChangeShowcaseImageCommandRequest request)
        {
            ChangeShowcaseImageCommandResponse response = await _mediator.Send(request);
            return Ok(response);
        }
    }
}
