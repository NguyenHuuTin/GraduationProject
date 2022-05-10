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
    public class ForgotPassword : BaseAsyncEndpoint<ForgotPasswordRequest, UserResponse>
    {
        private readonly IUserServices _userservice;

        public ForgotPassword(IUserServices userService)
        {
            _userservice = userService;
        }

        [HttpPost("/ForgotPassword")]
        [SwaggerOperation(
            Summary = "ForgotPassword",
            Description = "When reset your password, it will default to 123456.",
            OperationId = "User.ForgotPassword",
            Tags = new[] { "UserEndpoints" })
        ]
        public override async Task<ActionResult<UserResponse>> HandleAsync(ForgotPasswordRequest forgotPasswordRequest, CancellationToken cancellationToken)
        {
            var message = await _userservice.ForgotPassword(forgotPasswordRequest.Email,forgotPasswordRequest.Token, forgotPasswordRequest.NewPassword);

            return Ok(message);
        }
    }
}
