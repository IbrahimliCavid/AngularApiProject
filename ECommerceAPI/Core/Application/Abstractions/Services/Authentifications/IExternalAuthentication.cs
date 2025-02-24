using Application.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Abstractions.Services.Authentifications
{
    public interface IExternalAuthentication
    {
        Task<TokenDto> FacebookLoginAsync(string authToken, int accessTokenLifeTime);
        Task<TokenDto> GoogleLoginAsync(string idToken, int accessTokenLifeTime);
    }
}
