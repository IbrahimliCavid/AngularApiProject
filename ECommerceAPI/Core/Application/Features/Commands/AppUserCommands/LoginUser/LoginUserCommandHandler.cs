using Application.Abstractions.Tokens;
using Application.Dtos;
using Application.Exceptions;
using Domain.Entites.Identity;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Commands.AppUserCommands.LoginUser
{
    public class LoginUserCommandHandler : IRequestHandler<LoginUserCommandRequest, LoginUserCommandResponse>
    {
        readonly UserManager<AppUser> _userManager;
        readonly SignInManager<AppUser> _signInManager;
        readonly ITokenHandler _tokenHandler;

        public LoginUserCommandHandler(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, ITokenHandler tokenHandler)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenHandler = tokenHandler;
        }

        public async Task<LoginUserCommandResponse> Handle(LoginUserCommandRequest request, CancellationToken cancellationToken)
        {

            AppUser user = await _userManager.FindByNameAsync(request.UsernameOrEmail) ?? await _userManager.FindByEmailAsync(request.UsernameOrEmail);
            if(user == null) 
                throw new NotFoundUserException();

          SignInResult result =  await _signInManager.PasswordSignInAsync(user, request.Password, false,false);
            if (result.Succeeded)
            {
              Token token =  _tokenHandler.CreateAccessToken(30);
                return new LoginUserSuccessCommandResponse ()
                {
                    Token = token
                };
            }

            //return new LoginUserErrorCommandResponse()
            //{
            //    Message = "Authentication error occurred."
            //};
            throw new AuthenticationErrorException();
        }
    }
}
