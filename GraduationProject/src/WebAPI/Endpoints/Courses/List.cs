using Ardalis.ApiEndpoints;
using Core.Entities;
using Core.Interfaces;
using SharedKernel.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace WebAPI.Endpoints.Courses
{
    public class List : BaseAsyncEndpoint<List<ListResponse>>
    {
        private readonly ICourseService _courseService;

        public List(ICourseService courseService)
        {
            _courseService = courseService;
        }

        [HttpGet("/Course")]
        [SwaggerOperation(
            Summary = "Gets a list of all Course",
            Description = "Gets a list of all Course",
            OperationId = "Course.List",
            Tags = new[] { "CourseEndpoints" })
        ]
        public override async Task<ActionResult<List<ListResponse>>> HandleAsync(CancellationToken cancellationToken)
        {
            var items = (await _courseService.GetAllCourse<Course>()).OrderByDescending(x => x.UpdateAt);
            var result = items.Select(item => new ListResponse
                {
                    Id = item.Id,
                    Price = item.OriginPrice,
                    Title = item.Title,
                    Status = item.Status,
                    UpdateAt = Convert.ToDateTime(item.UpdateAt).ToString("dd MMMM yyyy"),
                    Category = item.SubCategory.Name
                });

            return Ok(result);
        } 
    }
}
