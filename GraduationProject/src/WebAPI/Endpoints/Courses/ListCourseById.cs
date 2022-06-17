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
    public class ListCourseById : BaseAsyncEndpoint
    {
        private readonly ICourseService _courseService;


        public ListCourseById(ICourseService courseService)
        {
            _courseService = courseService;
        }

        [HttpGet("/Course/Instructor/{id}")]
        [SwaggerOperation(
            Summary = "Gets a list of all Course by Instructor ID",
            Description = "Gets a list of all Course",
            OperationId = "Course.ListCourseById",
            Tags = new[] { "CourseEndpoints" })
        ]
        public async Task<ActionResult<List<ListResponse>>> GetListCourseByIdAsync(Guid id, CancellationToken cancellationToken)
        {
            var items = (await _courseService.GetCourseByUser<Course>(id))
                .Select(item => new ListResponse
                {
                    Id = item.Id,
                    Price = item.OriginPrice,
                    Title = item.Title,
                    Status = item.Status,
                    UpdateAt = Convert.ToDateTime(item.UpdateAt).ToString("dd MMMM yyyy"),
                    Category = item.SubCategory.Name
                });

            return Ok(items);
        }


        
    }
}
