using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.Order
{
    public class ListOrderDto
    {
        public int TotalCount {  get; set; }
        public object Orders { get; set; }
    }
}
