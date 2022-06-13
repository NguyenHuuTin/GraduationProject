using Ardalis.ApiEndpoints;
using Ardalis.Result;
using Core.Interfaces;
using WebAPI.ApiModels;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Security.Claims;

namespace WebAPI.Endpoints.Users
{
    public class GetRoleByToken : BaseAsyncEndpoint
    {
        private readonly IUserServices _userServices;
        public GetRoleByToken(IUserServices userServices)
        {
            this._userServices = userServices;
        }

        [HttpPost("/GetRole")]
        [SwaggerOperation(
            Summary = "Get role User",
            Description = "Get role User",
            OperationId = "User.getRole",
            Tags = new[] { "UserEndpoints" })
        ]
        public async Task<ActionResult<string>> GetRoleAsync([FromBody] LoginRequest res, CancellationToken cancellationToken = default)
        {
            var user = await _userServices.Login(res.Email, res.Password);
            string roleName = _userServices.GetRoleNameByRoleId(user.RoleId);

            return Ok(roleName);
        }



        private Guid GetLoggedUserId()
        {
            if (!User.Identity.IsAuthenticated)
                throw new System.Security.Authentication.AuthenticationException();

            string userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;

            return Guid.Parse(userId);
        }
    }
}
