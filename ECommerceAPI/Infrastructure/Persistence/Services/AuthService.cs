using Application.Abstractions.Services;
using Application.Abstractions.Tokens;
using Application.Dtos;
using Application.Dtos.Facebook;
using Application.Exceptions;
using Application.Features.Commands.AppUserCommands.LoginUser;
using Domain.Entites.Identity;
using Google.Apis.Auth;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Persistence.Services
{
    public class AuthService : IAuthService
    {
        readonly HttpClient _httpClient;
        readonly IConfiguration _configuration;
        readonly UserManager<AppUser> _userManager;
        readonly ITokenHandler _tokenHandler;
        readonly SignInManager<AppUser> _signInManager;
        readonly IUserService _userService;

        public AuthService(IHttpClientFactory httpClientFactory, IConfiguration configuration, UserManager<AppUser> userManager, ITokenHandler tokenHandler, SignInManager<AppUser> signInManager, IUserService userService)
        {
            _httpClient = httpClientFactory.CreateClient();
            _configuration = configuration;
            _userManager = userManager;
            _tokenHandler = tokenHandler;
            _signInManager = signInManager;
            _userService = userService;
        }

        async Task<TokenDto> CreateUserExternalAsync(AppUser user, string email, string name, UserLoginInfo info, int accessTokenLifeTime)
        {
            
            bool result = user != null;
            if (user == null)
            {
                user = await _userManager.FindByEmailAsync(email);
                if (user == null)
                {
                    user = new AppUser()
                    {
                        Id = Guid.NewGuid().ToString(),
                        Email = email,
                        UserName = email,
                        Fullname = name,
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


                TokenDto token = _tokenHandler.CreateAccessToken(accessTokenLifeTime, user);
               await _userService.UpdateRefreshToken(token.RefreshToken, user, token.Expiration, 10);

                return token;
            }
            throw new Exception($"{info.LoginProvider} login failed");

        }
        public async Task<TokenDto> FacebookLoginAsync(string authToken, int accessTokenLifeTime)
        {
            string accessTokenResponse = await _httpClient.GetStringAsync($"https://graph.facebook.com/oauth/access_token?client_id={_configuration["ExternalLoginSettings:Facebook:AppId"]}&client_secret={_configuration["ExternalLoginSettings:Facebook:AppSecret"]}&grant_type=client_credentials");

            FacebookAccessTokenResponseDto? facebookAccessTokenResponse = JsonSerializer.Deserialize<FacebookAccessTokenResponseDto>(accessTokenResponse);
            string userAccessTokenValidation = await _httpClient.GetStringAsync($"https://graph.facebook.com/debug_token?input_token={authToken}&access_token={facebookAccessTokenResponse?.AccessToken}");

            FacebookUserAccessTokenvalidationDto? validation = JsonSerializer.Deserialize<FacebookUserAccessTokenvalidationDto>(userAccessTokenValidation);
            if (validation?.Data.IsValid != null)
            {
                string userInfoResponse = await _httpClient.GetStringAsync($"https://graph.facebook.com/v10.0/me?fields=email,name&access_token={authToken}");

                FacebookUserInfoResponseDto? userInfo = JsonSerializer.Deserialize<FacebookUserInfoResponseDto>(userInfoResponse);
                UserLoginInfo info = new UserLoginInfo("FACEBOOK", validation.Data.UserId, "FACEBOOK");
                
                AppUser? user = await _userManager.FindByLoginAsync(info.LoginProvider, info.ProviderKey);

            return await CreateUserExternalAsync(user, userInfo.Email, userInfo.Name, info, accessTokenLifeTime);
            }
            throw new Exception("External login failed");


        }
        
        public async Task<TokenDto> GoogleLoginAsync(string idToken, int accessTokenLifeTime)
        {
            var settings = new GoogleJsonWebSignature.ValidationSettings()
            {
                Audience = new List<string> { _configuration["ExternalLoginSettings:Google:ClientId"]}
            };

            var payload = await GoogleJsonWebSignature.ValidateAsync(idToken, settings);
            UserLoginInfo info = new UserLoginInfo("GOOGLE", payload.Subject, "GOOGLE");


            var user = await _userManager.FindByLoginAsync(info.LoginProvider, info.ProviderKey);

          return await CreateUserExternalAsync(user, payload.Email, payload.Name, info, accessTokenLifeTime);

        }


        public async Task<TokenDto> LoginAsync(string usernameOrEmail, string password, int accessTokenLifeTime)
        {
            AppUser? user = await _userManager.FindByNameAsync(usernameOrEmail) ?? await _userManager.FindByEmailAsync(usernameOrEmail);
            if (user == null)
                throw new NotFoundUserException();

            SignInResult result = await _signInManager.PasswordSignInAsync(user, password, false, false);
            if (result.Succeeded)
            {
                TokenDto token = _tokenHandler.CreateAccessToken(accessTokenLifeTime, user);
              await  _userService.UpdateRefreshToken(token.RefreshToken, user, token.Expiration, 10);

                return token;
            }

           
            throw new AuthenticationErrorException();
        }

        public async Task<TokenDto> RefreshTokenLoginAsync(string refreshToken)
        {
            AppUser? user = await _userManager.Users.FirstOrDefaultAsync(user => user.RefreshToken == refreshToken);
            if(user !=null && user.RefreshTokenExpiryTime > DateTime.UtcNow)
            {
                TokenDto token = _tokenHandler.CreateAccessToken(15, user);
                await _userService.UpdateRefreshToken(token.RefreshToken, user, token.Expiration, 15);
                return token;
            }else
            throw new NotFoundUserException();
        }
    }
}
