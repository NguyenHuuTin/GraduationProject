using Ardalis.ApiEndpoints;
using Ardalis.Result;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Mapper.InstructorModel;
using WebAPI.ApiModels.InstructorItemDTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
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
    public class UpdateProfile : BaseAsyncEndpoint<UpdateProfileRequest, object>
    {
        private readonly IInstructorService _instructorService;
        private readonly IMapper _mapper; 
    
        public UpdateProfile(IInstructorService instructorService, IMapper mapper)
        {
            _instructorService = instructorService;
            _mapper = mapper;    
        }

        [HttpPut("/instructor/edit-profile")]
        [SwaggerOperation(
            Summary = "Updates a ToDoItem",
            Description = "Updates a ToDoItem with a longer description",
            OperationId = "ToDoItem.Update",
            Tags = new[] { "InstructorItemEndpoints" })
        ]
        [Authorize]
        public override async Task<ActionResult<object>> HandleAsync([FromForm] UpdateProfileRequest request, CancellationToken cancellationToken)
        {
            //get id usser
            if (!User.Identity.IsAuthenticated)
                throw new AuthenticationException();

            string userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;

            var id = Guid.Parse(userId);
            //update profile
            var response = await _instructorService.UpdateProfileAsync(id, request);

            if (response.Value != null)
            {
                var valueReturn = _mapper.Map<UpdateProfileResponse>(response.Value);
                var responseData = new Result<UpdateProfileResponse>(valueReturn);

                return Ok(responseData);
            }
          
            return Ok(Result<bool>.Error(response.Errors.First()));
        }

       

    }
}
