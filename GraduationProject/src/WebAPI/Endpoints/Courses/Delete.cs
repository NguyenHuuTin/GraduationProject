using System.Threading;
using Ardalis.ApiEndpoints;
using Core.Entities;
using SharedKernel.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Threading.Tasks;
using System;
using Core.Interfaces;
using System.Linq;
using System.Security.Claims;

namespace WebAPI.Endpoints.Courses
{
    public class Delete : BaseAsyncEndpoint
    {
        private readonly ICourseService _courseService;

        public Delete(ICourseService courseService)
        {
            _courseService = courseService;
        }

        [HttpDelete("/Courses/Section/{Id}")]
        [SwaggerOperation(
            Summary = "Delete a Section of a Course",
            Description = "Delete a Section of a Course by SectionId",
            OperationId = "CourseSection.Delete.Section",
            Tags = new[] { "CourseEndpoints" })
        ]
        public async Task<ActionResult<bool>> SectionByIdAsync(Guid Id, CancellationToken cancellationToken)
        {
            //check value of request
            if (ModelState.IsValid)
            {
                return Ok(await _courseService.DeleteSection(Id));
            }

            return BadRequest();
        }


        [HttpDelete("/Courses/Lecture/{Id}")]
        [SwaggerOperation(
            Summary = "Delete a Leture of a Course",
            Description = "Delete a Leture of a Course by SectionId",
            OperationId = "CourseSection.Delete.Leture",
            Tags = new[] { "CourseEndpoints" })
        ]
        public async Task<ActionResult<bool>> LectureByIdAsync(Guid Id, CancellationToken cancellationToken)
        {
            //check value of request
            if (ModelState.IsValid)
            {
                return Ok(await _courseService.DeleteLeture(Id));
            }

            return BadRequest();
        }


        [HttpDelete("/Course/{id}")]
        [SwaggerOperation(
            Summary = "Delete a Course",
            Description = "Delete a Course by CourseId",
            OperationId = "Course.Delete",
            Tags = new[] { "CourseEndpoints" })
        ]
        public async Task<ActionResult<bool>> DeleteCourseAsync(Guid Id, CancellationToken cancellationToken)
        {
            //check Section must be owned by User logged in
            if (GetLoggedUserId() == await _courseService.GetUserIdByCourseId(Id))
            {
                //check value of request
                if (ModelState.IsValid)
                {
                    return Ok(await _courseService.DeleteCourse(Id));
                }

                return BadRequest();
            }

            return Unauthorized();
        }

        [HttpDelete("/Course/Question/{id}")]
        [SwaggerOperation(
            Summary = "Delete a Course",
            Description = "Delete a Course's Question by CourseId",
            OperationId = "Course.Delete.Question",
            Tags = new[] { "CourseEndpoints" })
        ]
        public async Task<ActionResult<bool>> DeleteQuestionAsync(Guid Id, CancellationToken cancellationToken)
        {
            //check value of request
            if (ModelState.IsValid)
            {
                return Ok(await _courseService.DeleteQuestion(Id));
            }

            return BadRequest();

        }

        [HttpDelete("/Course/Quizz/{id}")]
        [SwaggerOperation(
            Summary = "Delete a Course",
            Description = "Delete a Course's Quizz by CourseId",
            OperationId = "Course.Delete.Quizz",
            Tags = new[] { "CourseEndpoints" })
        ]
        public async Task<ActionResult<bool>> DeleteQuizzAsync(Guid Id, CancellationToken cancellationToken)
        {
            //check value of request
            if (ModelState.IsValid)
            {
                return Ok(await _courseService.DeleteQuizz(Id));
            }

            return BadRequest();

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
