using Application.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Abstractions.Services.Authentifications
{
    public interface IInternalAuthentication
    {
        Task<TokenDto> LoginAsync(string usernameOrEmail, string password, int accessTokenLifeTime);
    }
}
