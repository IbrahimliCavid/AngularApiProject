using Application.Dtos.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Abstractions.Services
{
    public interface IUserService
    {
        Task<CreateUserResponseDto> CreateUserAsync(CreateUserDto dto);
        Task UpdateRefreshToken(string refreshToken, string userId, DateTime accessTokenDate, int refreshTokenLifeTime);
    }
}
