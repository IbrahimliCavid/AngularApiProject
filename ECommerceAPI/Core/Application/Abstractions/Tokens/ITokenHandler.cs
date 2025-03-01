using Application.Dtos;
using Domain.Entites.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Abstractions.Tokens
{
    public interface ITokenHandler
    {
        TokenDto CreateAccessToken(int second, AppUser user);
        string CreateRefreshToken();
    }
}
