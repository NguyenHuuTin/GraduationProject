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
using Microsoft.AspNetCore.Cors;

namespace WebAPI.Endpoints.Users
{
    
    public class ListAdmin : BaseAsyncEndpoint
    {
        public readonly IUserServices _userServices;
        public ListAdmin(IUserServices userServices)
        {
            this._userServices = userServices;
        }

        [EnableCors("MyPolicy")]
        [HttpGet("/Admin")]
        [SwaggerOperation(
            Summary = "Gets a list of all Admin",
            Description = "Gets a list of all Admin",
            OperationId = "Admin.List",
            Tags = new[] { "UserEndpoints" })
        ]
        public async Task<ActionResult<List<UserResponse>>> ListTotalAdmin(CancellationToken cancellationToken = default)
        {
            var items = (await _userServices.GetAllAdmin())
                .Select(item => new UserResponse
                {
                    Id = item.Id,
                    UserName = item.UserName,
                    RoleName = item.Role.Name,
                    Email = item.Email
                });
            return Ok(items);
        }
    }
}
