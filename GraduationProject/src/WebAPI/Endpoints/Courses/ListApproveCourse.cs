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
    public class ListApproveCourse : BaseAsyncEndpoint<List<ListApproveCourseResponse>>
    {
        private readonly ICourseService _courseService;

        public ListApproveCourse(ICourseService courseService)
        {
            _courseService = courseService;
        }
        [HttpGet("/ApproveCourse")]
        [SwaggerOperation(
            Summary = "Gets a list of Course waiting for approve",
            Description = "Gets a list of Course waiting for approve",
            OperationId = "Course.ListApproveCourse",
            Tags = new[] { "CourseEndpoints" })
        ]
        public override async Task<ActionResult<List<ListApproveCourseResponse>>> HandleAsync(CancellationToken cancellationToken)
        {
            var items = (await _courseService.GetApproveCourse<Course>())
                .Select(item => new ListApproveCourseResponse
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
