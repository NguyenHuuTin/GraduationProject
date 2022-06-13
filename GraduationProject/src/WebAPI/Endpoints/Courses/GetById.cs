﻿using Ardalis.ApiEndpoints;
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

            var response = new CourseResponse
            {
                Id = item.Id,
                Price = item.OriginPrice,
                Title = item.Title,
                Section = item.Sections,
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

            var response = new CourseStudentResponse
            {
                Id = item.Id,
                Price = item.OriginPrice,
                Title = item.Title,
                Image = item.ImageUrl,
                Description = item.Description,
                Section = item.Sections,
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

        private Guid GetLoggedUserId()
        {
            if (!User.Identity.IsAuthenticated)
                throw new System.Security.Authentication.AuthenticationException();

            string userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;

            return Guid.Parse(userId);
        }
    }
}