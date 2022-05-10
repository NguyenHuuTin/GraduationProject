using Ardalis.ApiEndpoints;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace WebAPI.Endpoints.Roles
{
    public class Create : BaseAsyncEndpoint
    {

        private readonly IRoleService _RoleService;

        public Create(IRoleService RoleService)
        {
            _RoleService = RoleService;
        }

        [HttpPost("/Role/Post")]
        [SwaggerOperation(
            Summary = "Creates a new Role",
            Description = "Creates a new Role",
            OperationId = "Role.Create",
            Tags = new[] { "RoleEndpoints" })
        ]
        public async Task<ActionResult<RoleResponse>> RoleHandleAsync(RoleRequest request, CancellationToken cancellationToken)
        {
            

            try
            {
               

                foreach (string value in request.PermissionIds)
                {
                   
                    if (_RoleService.IsRoleNameExisted(value) == true)
                    {
                        return BadRequest("Permission is Already existed");
                    }
                    var userAdd = await _RoleService.AddRole(request.Name);
                    var rolePer = await _RoleService.AddRolePermission(userAdd.Id, value);
                }
            }
            catch (Exception e)
            {
                throw (e);
            }

            var createRole = new RoleResponse
            {
                Name = request.Name
            };
            return Ok(createRole);
        }
    }
}
