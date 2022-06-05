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
    
    public class List : BaseAsyncEndpoint<List<UserResponse>>
    {
        public readonly IUserServices _userServices;
        public List(IUserServices userServices)
        {
            this._userServices = userServices;
        }

        [EnableCors("MyPolicy")]
        [HttpGet("/Users")]
        [SwaggerOperation(
            Summary = "Gets a list of all Users",
            Description = "Gets a list of all Users",
            OperationId = "Users.List",
            Tags = new[] { "UserEndpoints" })
        ]
        public override async Task<ActionResult<List<UserResponse>>> HandleAsync(CancellationToken cancellationToken = default)
        {
            var items = (await _userServices.GetAll())
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
