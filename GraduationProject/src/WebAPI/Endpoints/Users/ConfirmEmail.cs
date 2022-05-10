using Ardalis.ApiEndpoints;
using Core.Entities;
using Core.Interfaces;
using WebAPI.ApiModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace WebAPI.Endpoints.Users
{
    public class ConfirmEmail : BaseAsyncEndpoint<ConfirmEmailRequest, UserResponse>
    {
        private readonly IUserServices _userservice;
        private readonly UserManager<User> _userManager;
        public ConfirmEmail(IUserServices userService)
        {
            _userservice = userService;
        }

        [HttpPost("/ConfirmEmail")]
        [SwaggerOperation(
            Summary = "ConfirmEmail",
            Description = "When Confirm your Email , it will default to 123456.",
            OperationId = "User.ConfirmEmail",
            Tags = new[] { "UserEndpoints" })
        ]
        public override async Task<ActionResult<UserResponse>> HandleAsync(ConfirmEmailRequest confirmEmailRequest, CancellationToken cancellationToken)
        {

            var message = await _userservice.ConfirmEmail(confirmEmailRequest.Email, confirmEmailRequest.Token);

            return Ok(message);
        }
    }
}
