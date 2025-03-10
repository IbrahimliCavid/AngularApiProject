﻿using Application.Abstractions.Services.Authentifications;
using MediatR;

namespace Application.Features.Commands.AppUserCommands.LoginUser
{
    public class LoginUserCommandHandler : IRequestHandler<LoginUserCommandRequest, LoginUserCommandResponse>
    {
       readonly IInternalAuthentication _authService;

        public LoginUserCommandHandler(IInternalAuthentication authService)
        {
            _authService = authService;
        }

        public async Task<LoginUserCommandResponse> Handle(LoginUserCommandRequest request, CancellationToken cancellationToken)
        {
           var token = await _authService.LoginAsync(request.UsernameOrEmail, request.Password, 5000);
            return new LoginUserSuccessCommandResponse()
            {
                Token = token
            };
        }
    }
}
