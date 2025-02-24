using Application.Abstractions.Services;
using Application.Dtos.User;
using Application.Exceptions;
using Domain.Entites.Identity;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Commands.AppUserCommands.CreateUser
{
    public class CreateUserCommandHandler : IRequestHandler<CreateUserCommandRequest, CreateUserCommandResponse>
    {
        readonly IUserService _userService;

        public CreateUserCommandHandler(IUserService userService)
        {
            _userService = userService;
        }

        public async Task<CreateUserCommandResponse> Handle(CreateUserCommandRequest request, CancellationToken cancellationToken)
        {

           CreateUserResponseDto response = await  _userService.CreateUserAsync(new()
            {
                 Fullname = request.Fullname,
                 Username = request.Username,
                Email = request.Email,
                 Password = request.Password,
                 Repassword = request.Repassword,
             });


            return new()
            {
                Message = response.Message,
                Succeeded = response.Succeeded
            };
        }
    }
}
