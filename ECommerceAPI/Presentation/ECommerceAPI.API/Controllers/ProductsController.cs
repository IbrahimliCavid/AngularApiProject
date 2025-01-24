﻿using Application.Repositories;
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

        public ProductsController(IProductWriteRepository writeRepository, IProductReadRepository readRepository)
        {
            _writeRepository = writeRepository;
            _readRepository = readRepository;
        }

        [HttpGet]
        public  IActionResult Get([FromQuery]Paginaton paginaton)
        {
            int totalCount = _readRepository.GetAll(false).Count();
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

    }
}
