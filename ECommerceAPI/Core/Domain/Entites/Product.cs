﻿using Domain.Entites.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entites
{
    public class Product : BaseEntity
    {
        public string Name {  get; set; }
        public int Stock {  get; set; }
        public float Price {  get; set; }
        public ICollection<ProductImageFile> ProductImageFiles { get; set; }
        public ICollection<BasketItem> BasketItems { get; set; }
    }
}
