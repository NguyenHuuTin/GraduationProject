using Ardalis.ApiEndpoints;
using Ardalis.Result;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace WebAPI.Endpoints.Instructor
{
    public class List : BaseAsyncEndpoint
    {
        private readonly IInstructorService _instructorService;

        public List(IInstructorService instructorService)
        {
            _instructorService = instructorService;
        }

        [HttpGet("/Instructor")]
        [SwaggerOperation(
            Summary = "Gets a list of all Instructor",
            Description = "Gets a list of all Instructor",
            OperationId = "Instructor.List",
            Tags = new[] { "InstructorEndpoints" })
        ]
        public async Task<ActionResult<List<InstructorResponse>>> GetAllAsync(string searchString, CancellationToken cancellationToken = default)
        {
            var items = (await _instructorService.GetAllIntructor(searchString))
            .Select(item => new InstructorResponse
            {
                Id = item.Id,
                Name = item.UserName,
                Email = item.Email,
                Professional = item.Professional,
                FacebookLink = item.FacebookLink,
                YoutubeLink = item.YoutubeLink,
                LinkedLink = item.LinkedLink,
                TwitterLink = item.TwitterLink,
                ProfileLink = item.ProfileLink,
                Avatar = item.Avatar,
                CountStudent = 2,
                CountCourse = 2,
                IsStatus = item.IsStatus,
                RegisterDate = Convert.ToDateTime(item.CreateAt).ToString("dd MMMM yyyy")
            });
            return Ok(items);
        }
    }
}
