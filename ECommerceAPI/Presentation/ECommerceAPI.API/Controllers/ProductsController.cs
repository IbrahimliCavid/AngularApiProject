using Application.Repositories;
using Domain.Entites;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ECommerceAPI.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        //Test Repository design pattern
        private readonly IProductWriteRepository _writeRepository;
        private readonly IProductReadRepository _readRepository;

        public ProductsController(IProductWriteRepository writeRepository, IProductReadRepository readRepository)
        {
            _writeRepository = writeRepository;
            _readRepository = readRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            
            var products =  _readRepository.GetAll();
            return Ok(products);
        }
        [HttpGet("{id}")]

        public async Task<IActionResult> GetById(string id)
        {
            //Tracking test
            Product product = await _readRepository.GetByIdAsync(id, false);
            product.Name = "Agac";
            await _writeRepository.SaveAsync();
            return Ok();
        }
    }
}
