﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace Application.Exceptions
{
    public class AuthenticationErrorException : Exception
    {
        public AuthenticationErrorException() : base("Authentication error occurred.")
        {
        }

        public AuthenticationErrorException(string? message) : base(message)
        {
        }

        protected AuthenticationErrorException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}
