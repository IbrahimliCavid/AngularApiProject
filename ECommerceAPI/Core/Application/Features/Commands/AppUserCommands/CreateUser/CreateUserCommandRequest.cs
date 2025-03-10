﻿using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Commands.AppUserCommands.CreateUser
{
    public class CreateUserCommandRequest : IRequest<CreateUserCommandResponse>
    {
        public string Fullname { get; set; }
        public string Username { get; set; }    
        public string Email { get; set; }
        public string Password { get; set; }
        public  string Repassword { get; set; }
    }
}
