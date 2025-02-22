using Application.Abstractions.Tokens;
using Application.Dtos;
using Domain.Entites.Identity;
using Google.Apis.Auth;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Commands.AppUserCommands.GoogleLogin
{
    public class GoogleLoginCommandHandler : IRequestHandler<GoogleLoginCommandRequest, GoogleLoginCommandResponse>
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenHandler _tokenHandler;

        public GoogleLoginCommandHandler(UserManager<AppUser> userManager, ITokenHandler tokenHandler)
        {
            _userManager = userManager;
            _tokenHandler = tokenHandler;
        }

        public async Task<GoogleLoginCommandResponse> Handle(GoogleLoginCommandRequest request, CancellationToken cancellationToken)
        {
          var settings =  new GoogleJsonWebSignature.ValidationSettings()
          {
              Audience = new List<string> { "484971171608-3tl4n0dptrqd94f68dvue6o5ilr8gd5m.apps.googleusercontent.com" }
          };

          var payload = await  GoogleJsonWebSignature.ValidateAsync(request.IdToken, settings);
          UserLoginInfo info =  new UserLoginInfo(request.Provider, payload.Subject, request.Provider);

            AppUser user = await _userManager.FindByLoginAsync(info.LoginProvider, info.ProviderKey);

            bool result = user != null; 
            if (user == null) { 
              user = await _userManager.FindByEmailAsync(payload.Email);
                if (user == null) {
                    user = new AppUser()
                    {
                        Id = Guid.NewGuid().ToString(),
                        Email = payload.Email,
                        UserName = payload.Email,
                        Fullname = payload.Name,
                    };

                    var identityResult = await _userManager.CreateAsync(user);
                    result = identityResult.Succeeded;
                }else
                    result = true;
            }

            if (result) 
                    await _userManager.AddLoginAsync(user, info);
                else
                    throw new Exception("Google login failed");

                Token token = _tokenHandler.CreateAccessToken(5);

                return new()
                {
                    Token = token
                };
        }
    }
}
