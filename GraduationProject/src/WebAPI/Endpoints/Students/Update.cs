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

namespace WebAPI.Endpoints.Students
{
    public class Update: BaseAsyncEndpoint
    {
        private readonly IStudentService _studentService;

        public Update(IStudentService studentService)
        {
            _studentService = studentService;
        }

        [HttpPut("/Student")]
        [SwaggerOperation(
            Summary = "Update Students",
            Description = "Update Students",
            OperationId = "Student.Update",
            Tags = new[] { "StudentEndpoints" })
        ]
        public async Task<ActionResult<StudentResponse>> UpdateAsync([FromBody]StudentRequest request, CancellationToken cancellationToken)
        {

            var existingItem = await _studentService.GetByIdAsync(request.Id);

            existingItem.IsStatus = request.IsStatus;

            await _studentService.Update(existingItem);

            var response = new StudentResponse
            {
                Id = existingItem.Id,
                UserName = existingItem.UserName,
                Email = existingItem.Email,
                IsStatus = existingItem.IsStatus
            };
            return Ok(response);
        }
    }
}
