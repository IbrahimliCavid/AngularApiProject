using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.RequestParametrs
{
    public record Paginaton
    {
        public int Page { get; set; } = 0;
        public int Size { get; set; } = 5;
    }
}
