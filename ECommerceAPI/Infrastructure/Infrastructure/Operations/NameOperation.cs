using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Operations
{
    public static class NameOperation
    {
        public static string CharacterRegulatory(string name) =>

      name.Replace("\"", "")
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
                .Replace(":", "")
                .Replace("Ö", "o")
                .Replace("ö", "o")
                .Replace("Ş", "s")
                .Replace("ş", "s")
                .Replace("Ç", "c")
                .Replace("ç", "c")
                .Replace("Ğ", "g")
                .Replace("ğ", "g")
                .Replace("Ü", "u")
                .Replace("ü", "u");


    }
}
