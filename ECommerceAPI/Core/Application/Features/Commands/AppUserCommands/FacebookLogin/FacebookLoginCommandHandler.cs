using Application.Abstractions.Services;
using Application.Abstractions.Services.Authentifications;
using Application.Dtos;
using MediatR;


namespace Application.Features.Commands.AppUserCommands.FacebookLogin
{
    public class FacebookLoginCommandHandler : IRequestHandler<FacebookLoginCommandRequest, FacebookLoginCommandResponse>
    {
       readonly IExternalAuthentication _authService;

        public FacebookLoginCommandHandler(IAuthService authService)
        {
            _authService = authService;
        }

        public async Task<FacebookLoginCommandResponse> Handle(FacebookLoginCommandRequest request, CancellationToken cancellationToken)
        {
         TokenDto token = await _authService.FacebookLoginAsync(request.AuthToken, 5000);
           
            return new()
            {
                Token = token
            };
        }
    }
}
