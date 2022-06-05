using Ardalis.ApiEndpoints;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace WebAPI.Endpoints.Courses
{
    public class ListActiveCourse : BaseAsyncEndpoint<List<ListActiveCourseResponse>>
    {
        private readonly ICourseService _courseService;

        public ListActiveCourse(ICourseService courseService)
        {
            _courseService = courseService;
        }
        [HttpGet("/ActiveCourse")]
        [SwaggerOperation(
            Summary = "Gets a list of Active Course",
            Description = "Gets a list of Active Course",
            OperationId = "Course.ListActiveCourse",
            Tags = new[] { "CourseEndpoints" })
        ]
        public override async Task<ActionResult<List<ListActiveCourseResponse>>> HandleAsync(CancellationToken cancellationToken)
        {
            var items = (await _courseService.GetActiveCourse<Course>())
                .Select(item => new ListActiveCourseResponse
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
