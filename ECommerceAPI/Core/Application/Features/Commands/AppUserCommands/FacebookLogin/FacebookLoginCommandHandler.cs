using Application.Abstractions.Tokens;
using Application.Dtos;
using Application.Dtos.Facebook;
using Domain.Entites.Identity;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Application.Features.Commands.AppUserCommands.FacebookLogin
{
    public class FacebookLoginCommandHandler : IRequestHandler<FacebookLoginCommandRequest, FacebookLoginCommandResponse>
    {
        readonly UserManager<AppUser> _userManager;
        readonly ITokenHandler _tokenHandler;
        readonly HttpClient _httpClient;
        readonly IConfiguration _configuration;

        public FacebookLoginCommandHandler(UserManager<AppUser> userManager, ITokenHandler tokenHandler, IHttpClientFactory httpClientFactory, IConfiguration configuration)
        {
            _userManager = userManager;
            _tokenHandler = tokenHandler;
            _httpClient = httpClientFactory.CreateClient();
            _configuration = configuration;
        }

        public async Task<FacebookLoginCommandResponse> Handle(FacebookLoginCommandRequest request, CancellationToken cancellationToken)
        {
            string accessTokenResponse = await _httpClient.GetStringAsync($"https://graph.facebook.com/oauth/access_token?client_id={_configuration["Authentication:Facebook:AppId"]}&client_secret={_configuration["Authentication:Facebook:AppSecret"]}&grant_type=client_credentials");

            FacebookAccessTokenResponseDto facebookAccessTokenResponse = JsonSerializer.Deserialize<FacebookAccessTokenResponseDto>(accessTokenResponse);
           string userAccessTokenValidation =  await _httpClient.GetStringAsync($"https://graph.facebook.com/debug_token?input_token={request.AuthToken}&access_token={facebookAccessTokenResponse.AccessToken}");

            FacebookUserAccessTokenvalidationDto validation = JsonSerializer.Deserialize<FacebookUserAccessTokenvalidationDto>(userAccessTokenValidation);

            if (validation.Data.IsValid)
            {
                string userInfoResponse = await _httpClient.GetStringAsync($"https://graph.facebook.com/v10.0/me?fields=email,name&access_token={request.AuthToken}");

                FacebookUserInfoResponseDto userInfo = JsonSerializer.Deserialize<FacebookUserInfoResponseDto>(userInfoResponse);
                UserLoginInfo info = new UserLoginInfo("FACEBOOK", validation.Data.UserId, "FACEBOOK");

                AppUser user = await _userManager.FindByLoginAsync(info.LoginProvider, info.ProviderKey);

                bool result = user != null;
                if (user == null)
                {
                    user = await _userManager.FindByEmailAsync("cavid@gmail.com");
                    if (user == null)
                    {
                        user = new AppUser()
                        {
                            Id = Guid.NewGuid().ToString(),
                            Email = "cavid@gmail.com",
                            UserName = "cavid@gmail.com",
                            Fullname = userInfo.Name,
                        };

                        var identityResult = await _userManager.CreateAsync(user);
                        result = identityResult.Succeeded;
                    }
                    else
                        result = true;
                }
                if (result)
                {
                    await _userManager.AddLoginAsync(user, info);
               

                Token token = _tokenHandler.CreateAccessToken(5);

                 return new()
                 {
                    Token = token
                 };
                }

            }
            throw new Exception("Google login failed");


        }
    }
}
