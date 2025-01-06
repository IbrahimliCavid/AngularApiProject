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
        public async Task Get()
        {
            //_writeRepository.AddRangeAsync(new()
            //{
            //    new (){ Id = Guid.NewGuid(), Name = "Alma", Price = 2, Stock=3,},
            //    new (){ Id = Guid.NewGuid(), Name = "Armud", Price = 3, Stock=12,},
            //    new (){ Id = Guid.NewGuid(), Name = "Ananas", Price = 4, Stock=8,},

            //});
            var product = await _readRepository.GetByIdAsync("34bfd7b2-a87e-4183-9a32-7ea16dcbe72c");
            product.Name = "Zogal";
            _writeRepository.Update(product);
            await _writeRepository.SaveAsync();
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
