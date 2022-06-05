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
    public class ListBlockCourse : BaseAsyncEndpoint<List<ListBlockCourseResponse>>
    {
        private readonly ICourseService _courseService;

        public ListBlockCourse(ICourseService courseService)
        {
            _courseService = courseService;
        }
        [HttpGet("/BlockCourse")]
        [SwaggerOperation(
            Summary = "Gets a list of Block Course",
            Description = "Gets a list of Blocked Course",
            OperationId = "Course.ListBlockedCourse",
            Tags = new[] { "CourseEndpoints" })
        ]
        public override async Task<ActionResult<List<ListBlockCourseResponse>>> HandleAsync(CancellationToken cancellationToken)
        {
            var items = (await _courseService.GetBlockCourse<Course>())
                .Select(item => new ListBlockCourseResponse
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
