using System.Threading;
using Ardalis.ApiEndpoints;
using Core.Entities;
using SharedKernel.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Threading.Tasks;
using Core.Interfaces;
using System;
using System.Linq;
using System.Security.Claims;
using Class;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;

namespace WebAPI.Endpoints.Courses
{
    public class Create : BaseAsyncEndpoint
    {
        private readonly ICourseService _courseService;

        public Create(ICourseService courseService)
        {
            _courseService = courseService;
        }

        [DisableRequestSizeLimit]
        [HttpPost("/Courses/Information")]
        [SwaggerOperation(
            Summary = "Creates a new Course",
            Description = "Creates a new Course",
            OperationId = "Course.Create",
            Tags = new[] { "CourseEndpoints" })
        ]
        public async Task<ActionResult<Guid>> CreateGenaralInformationAsync([FromForm]CourseMain request, CancellationToken cancellationToken)
        {
           
            if (ModelState.IsValid)
            {
                var userID = GetLoggedUserId();
                //var userID = Guid.Parse("585fc085-a50c-4427-81f9-08da43a4831b");

                //create course
                var createdItem = await _courseService.CreateCourseWithImg(request, userID);

                return Ok(createdItem.Id);
            }

            return Ok();
        }

        [DisableRequestSizeLimit]
        [HttpPost("/Courses/Content")]
        [SwaggerOperation(
            Summary = "Creates a Course Content",
            Description = "Creates the Sections and Lessons",
            OperationId = "CourseContent.Create",
            Tags = new[] { "CourseEndpoints" })
        ]
        public async Task<ActionResult<Guid>> CreateCourseContentAsync([FromBody] CourseContent request, CancellationToken cancellationToken)
        {
            //check Course must be owned by User logged in
            if (await _courseService.CheckCourseOfUser(request.CourseId, GetLoggedUserId()))
            {
                //check value of request
                if (ModelState.IsValid)
                {
                    //create and return to result of that
                    return Ok(await _courseService.CreateCourseContent(request));
                }

                return BadRequest();
            }

            return Unauthorized();
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
