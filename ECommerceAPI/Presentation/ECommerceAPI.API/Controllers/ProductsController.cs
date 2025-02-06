﻿using Application.Abstractions;
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
        private readonly IFileReadRepository _fileReadRepository;
        private readonly IFileWriteRepository _fileWriteRepository;
        private readonly IProductImageFileReadRepository _productImageFileReadRepository;
        private readonly IProductImageFileWriteRepository _productImageFileWriteRepository;
        private readonly IInvoiceFileReadRepository _invoiceFileReadRepository;
        private readonly IInvoiceFileWriteRepository _invoiceFileWriteRepository;
        private readonly IStorageService _storageService;

        public ProductsController(IProductWriteRepository writeRepository, IProductReadRepository readRepository, IWebHostEnvironment webHostEnvironment, IFileReadRepository fileReadRepository, IFileWriteRepository fileWriteRepository, IProductImageFileReadRepository productImageFileReadRepository, IProductImageFileWriteRepository productImageFileWriteRepository, IInvoiceFileReadRepository invoiceFileReadRepository, IInvoiceFileWriteRepository invoiceFileWriteRepository, IStorageService storageService)
        {
            _writeRepository = writeRepository;
            _readRepository = readRepository;
            _webHostEnvironment = webHostEnvironment;
            _fileReadRepository = fileReadRepository;
            _fileWriteRepository = fileWriteRepository;
            _productImageFileReadRepository = productImageFileReadRepository;
            _productImageFileWriteRepository = productImageFileWriteRepository;
            _invoiceFileReadRepository = invoiceFileReadRepository;
            _invoiceFileWriteRepository = invoiceFileWriteRepository;
            _storageService = storageService;
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
            var datas = await _storageService.UploadAsync("fiels", Request.Form.Files);
            //var datas =  await  _fileService.UploadAsync("resource/fiels", Request.Form.Files);
            await _productImageFileWriteRepository.AddRangeAsync(datas.Select(data => new ProductImageFile()
            {
                FileName = data.fileName,
                Path = data.pathOrContainerName,
                Storage = _storageService.StorageName
            }).ToList());

            await _productImageFileWriteRepository.SaveAsync();


            //await _invoiceFileWriteRepository.AddRangeAsync(datas.Select(data => new InvoiceFile()
            //{
            //    FileName = data.fileName,
            //    Path = data.path,
            //    Price = new Random().Next()
            //}).ToList());

            //await _invoiceFileWriteRepository.SaveAsync();

            //await _fileWriteRepository.AddRangeAsync(datas.Select(data => new Domain.Entites.File()
            //{
            //    FileName = data.fileName,
            //    Path = data.path
            //}).ToList());

            //await _productImageFileWriteRepository.SaveAsync();

            //var d1 = _fileReadRepository.GetAll(false);
            //var d2 = _invoiceFileReadRepository.GetAll(false);
            //var d3  = _productImageFileReadRepository.GetAll(false);

            return Ok();
        }
    }
}
