using Application.Repositories;
using Application.RequestParametrs;
using Application.ViewModules.Products;
using Domain.Entites;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Persistence.Repositories;
using System.Net;

namespace ECommerceAPI.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        //Test Repository design pattern
        private readonly IProductWriteRepository _writeRepository;
        private readonly IProductReadRepository _readRepository;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public ProductsController(IProductWriteRepository writeRepository, IProductReadRepository readRepository, IWebHostEnvironment webHostEnvironment)
        {
            _writeRepository = writeRepository;
            _readRepository = readRepository;
            _webHostEnvironment = webHostEnvironment;
        }

        [HttpGet]
        public  IActionResult Get([FromQuery]Paginaton paginaton)
        {
            int totalCount = _readRepository.GetCount();
            var products =  _readRepository.GetAll(false).Select(p => new
            {
                p.Id,
                p.Name,
                p.Price,
                p.Stock,
                p.CreatedDate,
                p.LastUpdateDate
            }).Skip(paginaton.Page * paginaton.Size).Take(paginaton.Size);
            return Ok(new
            {
                totalCount,
                products
            });
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            return Ok(await _readRepository.GetByIdAsync(id, false));
        }



        [HttpPost]

        public async Task<IActionResult> Post(VM_Create_Product model)
        {
            await _writeRepository.AddAsync(new Product
            {
                Name = model.Name,
                Stock = model.Stock,
                Price = model.Price
            });
            await _writeRepository.SaveAsync();
            return StatusCode((int)HttpStatusCode.Created);
        }

        [HttpPut]
        public async Task<IActionResult> Put(VM_Update_Product model)
        {
            var product = await _readRepository.GetByIdAsync(model.Id);
            product.Stock = model.Stock;
            product.Name = model.Name;
            product.Price = model.Price;
            await _writeRepository.SaveAsync();
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            await _writeRepository.DeleteAsync(id);
            await _writeRepository.SaveAsync();
            return Ok();
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Upload()
        {
            string uploadPath = Path.Combine(_webHostEnvironment.WebRootPath, "resource/product-images");
            if (!Directory.Exists(uploadPath))
                Directory.CreateDirectory(uploadPath);
           
                Random r = new Random();
            foreach (IFormFile file in Request.Form.Files)
            {
                string fullPath = Path.Combine(uploadPath, $"{r.Next()}{Path.GetExtension(file.Name)}");
                using FileStream fileStream  = new(fullPath,FileMode.Create,FileAccess.Write, FileShare.None,1024 * 1024, useAsync : true);
                await file.CopyToAsync(fileStream);
                await fileStream.FlushAsync();
            }

            return Ok();
        }
    }
}
