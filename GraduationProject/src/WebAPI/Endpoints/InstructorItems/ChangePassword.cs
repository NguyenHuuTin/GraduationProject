using Ardalis.ApiEndpoints;
using Core.Interfaces;
using SharedKernel.Interfaces;
using WebAPI.ApiModels.InstructorItemDTO;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Authentication;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;

namespace WebAPI.Endpoints.InstructorItems
{
    public class ChangePassword : BaseAsyncEndpoint<UpdatePasswordRequest, bool>
    {
        private readonly IInstructorService _instructorService;

        public ChangePassword(IInstructorService instructorService)
        {
            _instructorService = instructorService ;
        }

        [HttpPut("/instructor/change-password")]
        [SwaggerOperation(
            Summary = "Updates a ToDoItem",
            Description = "Updates a ToDoItem with a longer description",
            OperationId = "ToDoItem.Update",
            Tags = new[] { "InstructorItemEndpoints" })
        ]
        public override async Task<ActionResult<bool>> HandleAsync([FromForm]UpdatePasswordRequest request, CancellationToken cancellationToken)
        {
            //get id user current
            if (!User.Identity.IsAuthenticated)
                throw new AuthenticationException();
            string userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;
            var id = Guid.Parse(userId);
            //change password
            //var id = new Guid ("041c5bf5-58e5-48fe-9360-ab167d0fe4a9");
            var response = await _instructorService.ChangePasswordAsync(id, request.CurrentPassword, request.NewPassword, request.ConfirmPassword);
            return Ok(response);
        }
    }
}

