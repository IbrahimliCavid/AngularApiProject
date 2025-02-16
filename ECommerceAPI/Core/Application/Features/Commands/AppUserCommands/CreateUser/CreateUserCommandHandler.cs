﻿using Application.Exceptions;
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
        readonly UserManager<AppUser> _userManager;

        public CreateUserCommandHandler(UserManager<AppUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<CreateUserCommandResponse> Handle(CreateUserCommandRequest request, CancellationToken cancellationToken)
        {
          IdentityResult result =  await _userManager.CreateAsync(new()
            {
              Id = Guid.NewGuid().ToString(),
                Fullname = request.Fullname,
                UserName = request.Username,
                Email = request.Email,
            }, request.Password);

            CreateUserCommandResponse response = new() { Succeeded =  result.Succeeded };

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


            //throw new UserCreateFailedException();
        }
    }
}
