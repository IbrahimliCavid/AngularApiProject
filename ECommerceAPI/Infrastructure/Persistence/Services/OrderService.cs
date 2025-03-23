using Application.Abstractions.Services;
using Application.Dtos.Order;
using Application.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Services
{
    public class OrderService : IOrderService
    {
        readonly IOrderWriteRepository _orderWriteRepository;
        readonly IOrderReadRepository _orderReadRepository;
        public OrderService(IOrderWriteRepository orderWriteRepository, IOrderReadRepository orderReadRepository)
        {
            _orderWriteRepository = orderWriteRepository;
            _orderReadRepository = orderReadRepository;
        }

        public async Task CreateOrderAsync(CreateOrderDto createOrder)
        {
            string orderCode ="ORD-" + (new Random().Next(100000000, 999999999)).ToString();
            await _orderWriteRepository.AddAsync(new()
            {
                Id = Guid.Parse(createOrder.BasketId),
                Description = createOrder.Description,
                Address = createOrder.Address,
                OrderCode = orderCode
            });

            await _orderWriteRepository.SaveAsync();
        }

        public async Task<ListOrderDto> GetAllOrdersAsync(int page, int size)
        {
            var query = _orderReadRepository.Table.Include(o => o.Basket)
                   .ThenInclude(b => b.User)
                   .Include(o => o.Basket)
                   .ThenInclude(b => b.BasketItems)
                   .ThenInclude(bi => bi.Product);

            var data = query.Skip(page * size).Take(size);

            return new()
            {
                TotalCount = await query.CountAsync(),
                Orders = await data.Select(o => new
                {
                    OrderCode = o.OrderCode,
                    Username = o.Basket.User.UserName,
                    CreatedDate = o.CreatedDate,
                    TotalPrice = o.Basket.BasketItems.Sum(bi => bi.Product.Price * bi.Quantity)
                }).ToListAsync()
            };
        }
    }
}
