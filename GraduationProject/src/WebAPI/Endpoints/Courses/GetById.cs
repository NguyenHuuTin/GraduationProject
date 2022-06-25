using Ardalis.ApiEndpoints;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;

namespace WebAPI.Endpoints.Courses
{
    public class GetById : BaseAsyncEndpoint
    {
        private readonly ICourseService _courseService;

        public GetById(ICourseService courseService)
        {
            _courseService = courseService;
        }

        [HttpGet("/Course/{id}")]
        [SwaggerOperation(
            Summary = "Gets a single Course",
            Description = "Gets a single Course by Id",
            OperationId = "Course.GetById",
            Tags = new[] { "CourseEndpoints" })
        ]
        public async Task<ActionResult<CourseResponse>> GetCourseByIdAsync(Guid id, CancellationToken cancellationToken)
        {
            var item = (await _courseService.GetDetailCourse(id));
            List<Quizz> resultQuizz = item.Sections.Select(x => _courseService.GetQuizz(x.Id)).ToList();

            var response = new CourseResponse
            {
                Id = item.Id,
                Price = item.OriginPrice,
                Title = item.Title,
                Section = item.Sections,
                Quizzs = resultQuizz,
            };
            return Ok(response);
        }


        [HttpGet("/CourseStudent/{id}")]
        [SwaggerOperation(
            Summary = "Gets a single Course",
            Description = "Gets a single Course by Id",
            OperationId = "Course.GetCourseById",
            Tags = new[] { "CourseEndpoints" })
        ]
        public async Task<ActionResult<CourseStudentResponse>> GetCourseByIdStudentAsync(Guid id, CancellationToken cancellationToken)
        {
            var item = (await _courseService.GetDetailCourse(id));

            /* List<Quizz> resultQuizz = new List<Quizz>();
             List<Section> x = item.Sections.ToList();
             foreach (var section in x)
             {
                 if (_courseService.GetQuizz(section.Id) != null)
                 {
                     resultQuizz.Add(_courseService.GetQuizz(section.Id));
                 }
             }*/
            List<Quizz> resultQuizz = item.Sections.Select(x => _courseService.GetQuizz(x.Id)).ToList();
            var response = new CourseStudentResponse
            {
                Id = item.Id,
                Price = item.OriginPrice,
                Title = item.Title,
                Image = item.ImageUrl,
                Description = item.Description,
                Section = item.Sections,
                Quizzs= resultQuizz,
            };
            return Ok(response);
        }


        [HttpGet("/Course/Creating")]
        [SwaggerOperation(
            Summary = "Gets a single Course",
            Description = "Gets a single Course by UserId",
            OperationId = "Course.Get",
            Tags = new[] { "CourseEndpoints" })
        ]
        public ActionResult<Course> CourseCreatingAsync(CancellationToken cancellationToken)
        {
            if (ModelState.IsValid)
            {  
                return Ok(_courseService.GetCourseCreating(GetLoggedUserId()));
            }

            return BadRequest();
        }

        [HttpGet("/Course/TopCourse")]
        [SwaggerOperation(
            Summary = "Gets a list of Top Course by Instructor ID",
            Description = "Gets a list of all Course",
            OperationId = "Course.TopCourse",
            Tags = new[] { "CourseEndpoints" })
        ]
        public async Task<ActionResult<List<CourseResponse>>> GetTopCourseAsync(CancellationToken cancellationToken)
        {
            var userId = GetLoggedUserId();
            var listOrder = await _courseService.GetTopCourse(userId);
            List<TopCourse> result = (from p in listOrder
                                      group p.Price by p.CourseId into g
                                      select new TopCourse { id = g.Key, price = g.Sum() }).OrderByDescending(x => x.price).ToList();

            var item = (await _courseService.GetDetailCourse(result[0].id));
            var response = new CourseResponse
            {
                Id = item.Id,
                Price = item.OriginPrice,
                Title = item.Title,
                Section = item.Sections,
            };
            return Ok(response);
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