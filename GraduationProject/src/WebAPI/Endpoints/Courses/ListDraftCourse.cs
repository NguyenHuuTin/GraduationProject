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
    public class ListDraftCourse : BaseAsyncEndpoint<Guid, List<ListResponse>>
    {
        private readonly ICourseService _courseService;

        public ListDraftCourse(ICourseService courseService)
        {
            _courseService = courseService;
        }

        [HttpGet("/DraftCourse/Instructor/{id}")]
        [SwaggerOperation(
            Summary = "Gets a list of all draft Course",
            Description = "Gets a list of all draft course",
            OperationId = "Course.ListDraftCourse",
            Tags = new[] { "CourseEndpoints" })
        ]
        public override async Task<ActionResult<List<ListResponse>>> HandleAsync(Guid id, CancellationToken cancellationToken)
        {
            var items = (await _courseService.GetDraftCourse<Course>(id))
                .Select(item => new ListResponse
                {
                    Id = item.Id,
                    Price = item.OriginPrice,
                    Title = item.Title,
                    Status = item.Status,
                    UpdateAt = item.UpdateAt,
                    Category = item.SubCategory.Name
                });

            return Ok(items);
        }
    }
}
