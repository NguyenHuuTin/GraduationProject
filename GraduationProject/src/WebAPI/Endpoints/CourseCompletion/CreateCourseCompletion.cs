using Ardalis.ApiEndpoints;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Mapper.CourseCompletionModel;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Authentication;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;

namespace WebAPI.Endpoints.Dashboard
{
    public class CreateCourseCompletion : BaseAsyncEndpoint<Guid, object>
    {
        private readonly ICourseCompletionService _courseCompletionService;
        private readonly IMapper _mapper;

        public CreateCourseCompletion(ICourseCompletionService courseCompletionService, IMapper mapper)
        {
            _courseCompletionService = courseCompletionService;
            _mapper = mapper;
        }


        [HttpPost("/coursecompletion/post")]
        [SwaggerOperation(
            Summary = "Gets a single InstructorItem",
            Description = "Gets a single InstructorItem by Id",
            OperationId = "Instructor.GetById",
            Tags = new[] { "DashboardEndpoints" })
        ]
        public override async Task<ActionResult<object>> HandleAsync(Guid courseId, CancellationToken cancellationToken)
        {
            //get id user current
            if (!User.Identity.IsAuthenticated)
                throw new AuthenticationException();
            string userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;
            var uId = Guid.Parse(userId);

            var response = await _courseCompletionService.CreateCourseCompletion(uId, courseId);
            return Ok(response);
        }

    }
}
