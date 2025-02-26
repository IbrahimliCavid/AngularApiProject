using Application.Abstractions.Services;
using Application.Abstractions.Services.Authentifications;
using Application.Dtos;
using MediatR;

namespace Application.Features.Commands.AppUserCommands.GoogleLogin
{
    public class GoogleLoginCommandHandler : IRequestHandler<GoogleLoginCommandRequest, GoogleLoginCommandResponse>
    {
        readonly IExternalAuthentication _authService;

        public GoogleLoginCommandHandler(IAuthService authService)
        {
            _authService = authService;
        }

        public async Task<GoogleLoginCommandResponse> Handle(GoogleLoginCommandRequest request, CancellationToken cancellationToken)
        {
         TokenDto token =  await _authService.GoogleLoginAsync(request.IdToken, 15);

            return new()
            {
                Token = token
            };
        }
    }
}
