using Application.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Commands.AppUserCommands.RefreshTokenLogin
{
    public class RefreshTokenLoginCommandResponse
    {
        public TokenDto Token { get; set; }
    }
}
