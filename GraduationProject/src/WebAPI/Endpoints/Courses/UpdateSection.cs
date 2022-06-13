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
    public class UpdateSection : BaseAsyncEndpoint
    {
        private readonly ICourseService _courseService;

        public UpdateSection(ICourseService courseService)
        {
            _courseService = courseService;
        }

        [HttpPut("/Course/Section/Update")]
        [SwaggerOperation(
            Summary = "Updates a ToDoItem",
            Description = "Updates a ToDoItem with a longer description",
            OperationId = "Course.UpdateSection",
            Tags = new[] { "CourseEndpoints" })
        ]
        public async Task<ActionResult<Section>> UpdateSectionsync([FromBody] UpdateSectionRequest request, CancellationToken cancellationToken = default)
        {
            Section item = new Section()
            {
                Id = request.Id,
                Title = request.Title,
                TotalTime = request.TimeTotal,

            };

            await _courseService.UpdateSection(item);
            return Ok(item);
        }
    }
}
