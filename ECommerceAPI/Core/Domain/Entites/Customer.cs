﻿using Domain.Entites.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entites
{
    public class Customer : BaseEntity
    {
        public string Name { get; set; }
    }
}
