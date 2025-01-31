using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Operations
{
    public static class NameOperation
    {
        public static string CharacterRegulatory(string name)

          => name.Replace("\"", "")
                .Replace("|", "")
                .Replace(">", "")
                .Replace("<", "")
                .Replace(",", "-")
                .Replace(".", "-")
                .Replace("_", "-")
                .Replace("!", "")
                .Replace("@", "")
                .Replace("#", "")
                .Replace("$", "")
                .Replace("%", "")
                .Replace("^", "")
                .Replace("&", "")
                .Replace("*", "")
                .Replace("(", "")
                .Replace(")", "")
                .Replace("+", "-")
                .Replace("~", "")
                .Replace("}", "")
                .Replace("]", "")
                .Replace("[", "")
                .Replace(";", "")
                .Replace("'", "")
                .Replace("", "")
                .Replace(":", "")
                .Replace("Ö", "ö")
                .Replace("ö", "ö")
                .Replace("Ş", "ş")
                .Replace("ş", "ş")
                .Replace("Ç", "ç")
                .Replace("ç", "ç")
                .Replace("Ğ", "ğ")
                .Replace("ğ", "ğ")
                .Replace("Ü", "ü")
                .Replace("ü", "ü");
    }
}
