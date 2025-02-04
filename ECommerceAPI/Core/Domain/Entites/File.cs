using Domain.Entites.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entites
{
    public class File : BaseEntity
    {
        public string FileName { get; set; }
        public string Path { get; set; }    
        [NotMapped]
        public override DateTime LastUpdateDate { get => base.LastUpdateDate; set => base.LastUpdateDate = value; }
    }
}
