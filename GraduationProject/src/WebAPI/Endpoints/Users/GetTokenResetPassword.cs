using Ardalis.ApiEndpoints;
using Core.Interfaces;
using WebAPI.ApiModels;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace WebAPI.Endpoints.Users
{
    public class GetTokenResetPassword : BaseAsyncEndpoint<GetTokenResetPasswordRequest, UserResponse>
    {
        private readonly IUserServices _userservice;

        public GetTokenResetPassword(IUserServices userService)
        {
            _userservice = userService;
        }

        [HttpPost("/GetTokenResetPassword")]
        [SwaggerOperation(
            Summary = "GetTokenResetPassword",
            Description = "When reset your password, it will default to 123456.",
            OperationId = "User.GetTokenResetPassword",
            Tags = new[] { "UserEndpoints" })
        ]
        public override async Task<ActionResult<UserResponse>> HandleAsync(GetTokenResetPasswordRequest getTokenResetPasswordRequest, CancellationToken cancellationToken)
        {
            var message = await _userservice.ForgetPasswordAsync(getTokenResetPasswordRequest.Email);

            return Ok(message);
        }
    }
}
