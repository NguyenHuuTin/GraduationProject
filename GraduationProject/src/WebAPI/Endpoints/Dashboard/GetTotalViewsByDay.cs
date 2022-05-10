using Ardalis.ApiEndpoints;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Authentication;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;

namespace WebAPI.Endpoints.Dashboard
{
    public class GetTotalViewsByDay : BaseAsyncEndpoint<object>
    {
        private readonly IDashboardService _dashboardService;

        public GetTotalViewsByDay(IDashboardService dashboardService)
        {
            _dashboardService = dashboardService;
        }


        [HttpGet("/dashboard/get-total-view-by-day")]
        [SwaggerOperation(
            Summary = "Gets a single InstructorItem",
            Description = "Gets a single InstructorItem by Id",
            OperationId = "Instructor.GetById",
            Tags = new[] { "DashboardEndpoints" })
        ]
        public override async Task<ActionResult<object>> HandleAsync(CancellationToken cancellationToken)
        {
            //get id user current
            if (!User.Identity.IsAuthenticated)
                throw new AuthenticationException();
            string userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;
            var id = Guid.Parse(userId);

            var response = await _dashboardService.GetTotalViewsByDay(id);
            return Ok(response);
        }

    }
}
