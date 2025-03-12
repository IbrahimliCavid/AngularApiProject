﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.Order
{
    public class CreateOrderDto
    {
        public string? BasketId { get; set; }
        public string Description { get; set; }
        public string Address { get; set; }
    }
}
