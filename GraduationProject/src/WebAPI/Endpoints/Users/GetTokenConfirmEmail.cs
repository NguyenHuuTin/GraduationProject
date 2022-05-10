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
    public class GetTokenConfirmEmail : BaseAsyncEndpoint<GetTokenConfirmEmailRequest, UserResponse>
    {
        private readonly IUserServices _userservice;

        public GetTokenConfirmEmail(IUserServices userService)
        {
            _userservice = userService;
        }

        [HttpPost("/GetTokenConfirmEmail")]
        [SwaggerOperation(
            Summary = "GetTokenConfirmEmail",
            Description = "Enter your Email to take Token send in your mail",
            OperationId = "User.GetTokenConfirmEmail",
            Tags = new[] { "UserEndpoints" })
        ]
        public override async Task<ActionResult<UserResponse>> HandleAsync([FromForm]GetTokenConfirmEmailRequest tokenConfirmEmailRequest, CancellationToken cancellationToken)
        {
            var message = await _userservice.ConfirmEmailAsync(tokenConfirmEmailRequest.Email);

            return Ok(message);
        }
    }
}
