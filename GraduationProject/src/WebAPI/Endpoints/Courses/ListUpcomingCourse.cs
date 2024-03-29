﻿using Ardalis.ApiEndpoints;
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
    public class ListUpcomingCourse : BaseAsyncEndpoint<Guid, List<ListResponse>>
    {
        private readonly ICourseService _courseService;

        public ListUpcomingCourse(ICourseService courseService)
        {
            _courseService = courseService;
        }

        [HttpGet("/UpcomingCourse/Instructor/{id}")]
        [SwaggerOperation(
            Summary = "Gets a list of upcoming Course",
            Description = "Gets a list of upcoming Course",
            OperationId = "Course.ListUpcomingCourse",
            Tags = new[] { "CourseEndpoints" })
        ]
        public override async Task<ActionResult<List<ListResponse>>> HandleAsync(Guid id, CancellationToken cancellationToken)
        {
            var items = (await _courseService.GetUpcomingCourse<Course>(id))
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
