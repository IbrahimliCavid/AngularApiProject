using Application.Abstractions.Services;
using Application.Dtos.User;
using Application.Features.Commands.AppUserCommands.CreateUser;
using Domain.Entites.Identity;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Services
{
    public class UserService : IUserService
    {
        readonly UserManager<AppUser> _userManager;

        public UserService(UserManager<AppUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<CreateUserResponseDto> CreateUserAsync(CreateUserDto dto)
        {
            IdentityResult result = await _userManager.CreateAsync(new()
            {
                Id = Guid.NewGuid().ToString(),
                Fullname = dto.Fullname,
                UserName = dto.Username,
                Email = dto.Email,
            }, dto.Password);

            CreateUserResponseDto response = new() { Succeeded = result.Succeeded };

            if (result.Succeeded)
                response.Message = "User created successfully";
            else
            {
                foreach (var error in result.Errors)
                {
                    response.Message += $"{error.Code} - {error.Description}\n";
                }
            }
            return response;
        }

        public async Task UpdateRefreshToken(string refreshToken, string userId, DateTime accessTokenDate, int refreshTokenLifeTime)
        {
           AppUser user = await _userManager.FindByEmailAsync(userId);
            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = accessTokenDate.AddSeconds(refreshTokenLifeTime);
        }
    }
}
