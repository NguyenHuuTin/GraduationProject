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
    public class GetTotalCoursesByDay : BaseAsyncEndpoint
    {
        private readonly IDashboardService _dashboardService;

        public GetTotalCoursesByDay(IDashboardService dashboardService)
        {
            _dashboardService = dashboardService;
        }


        [HttpGet("/dashboard/get-total-course-by-day")]
        [SwaggerOperation(
            Summary = "Gets a single InstructorItem",
            Description = "Gets a single InstructorItem by Id",
            OperationId = "Instructor.GetById",
            Tags = new[] { "DashboardEndpoints" })
        ]
        public async Task<ActionResult<object>> HandleGetTotalCourseAsync(CancellationToken cancellationToken)
        {
            //get id user current
            if (!User.Identity.IsAuthenticated)
                throw new AuthenticationException();
            string userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;
            var id = Guid.Parse(userId);

            var response = await _dashboardService.GetTotalCoursesByDay(id);
            return Ok(response);
        }


        [HttpGet("/dashboard/GetTotal")]
        [SwaggerOperation(
            Summary = "Gets a single InstructorItem",
            Description = "Gets a single InstructorItem by Id",
            OperationId = "Dashboard.GetById",
            Tags = new[] { "DashboardEndpoints" })
        ]
        public async Task<ActionResult<DashboardResponse>> GetTotalAsync(CancellationToken cancellationToken)
        {
            //get id user current
            if (!User.Identity.IsAuthenticated)
                throw new AuthenticationException();
            string userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;
            var id = Guid.Parse(userId);

            var response = await _dashboardService.GetTotal(id);
            var dashBoard = new DashboardResponse();
            dashBoard.TotalCourse = response.TotalCourse;
            dashBoard.TotalCourseByDay = response.TotalCourseByDay;
            dashBoard.TotalSale = response.TotalSale;
            dashBoard.TotalSaleByDay = response.TotalSaleByDay;
            dashBoard.TotalEnrollment = response.TotalEnrollment;
            dashBoard.TotalEnrollmentByDay = response.TotalEnrollmentByDay;
            dashBoard.TotalStudent = response.TotalStudent;
            dashBoard.TotalStuentByDay = response.TotalStuentByDay;
            dashBoard.TotalSubscriber = response.TotalSubscriber;
            dashBoard.TotalSubscriberByDay = response.TotalSubscriberByDay;
            return Ok(dashBoard);
        }


        [HttpGet("/dashboard/SaleOfYear")]
        [SwaggerOperation(
            Summary = "Gets a single InstructorItem",
            Description = "Gets a single InstructorItem by Id",
            OperationId = "Dashboard.SaleOfYear",
            Tags = new[] { "DashboardEndpoints" })
        ]
        public async Task<ActionResult<List<SaleResponse>>> SaleOfYearAsync(CancellationToken cancellationToken)
        {
            //get id user current
            if (!User.Identity.IsAuthenticated)
                throw new AuthenticationException();
            string userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;
            var id = Guid.Parse(userId);

            var item = (await _dashboardService.GetSaleOfYear(id))
                .Select(index => new SaleResponse
                {
                    month = Convert.ToInt32(index.month),
                    sale = index.sale
                });

            List<SaleResponse> result = (from p in item
                         group p.sale by p.month into g
                         select new SaleResponse { month = g.Key, sale = g.Sum() }).ToList();

            for(int i = 1; i <=12; i++)
            {
                bool status = false;
                foreach(var element in result)
                {
                    if(element.month == i)
                    {
                        status = true;
                    }
                }
                if (!status)
                {
                    result.Add(new SaleResponse { month = i, sale = 0 });
                }
            }
            var response = result.OrderBy(x => x.month);
            foreach (var itemres in response)
            {
                //"Jan","Feb", "Mar", "Apr", "May", "Jun", 'Jul',  "Aug", "Sep", "Oct", "Nov", "Dec"
                switch (itemres.month)
                {
                    case 1:
                        itemres.monthString = "Jan";
                        break;
                    case 2:
                        itemres.monthString = "Feb";
                        break;
                    case 3:
                        itemres.monthString = "Mar";
                        break;
                    case 4:
                        itemres.monthString = "Apr";
                        break;
                    case 5:
                        itemres.monthString = "May";
                        break;
                    case 6:
                        itemres.monthString = "Jun";
                        break;
                    case 7:
                        itemres.monthString = "Jul";
                        break;
                    case 8:
                        itemres.monthString = "Aug";
                        break;
                    case 9:
                        itemres.monthString = "Sep";
                        break;
                    case 10:
                        itemres.monthString = "Oct";
                        break;
                    case 11:
                        itemres.monthString = "Nov";
                        break;
                    case 12:
                        itemres.monthString = "Dec";
                        break;

                }
            }
            return Ok(response);
        }



        [HttpGet("/dashboard/InstructorEarning")]
        [SwaggerOperation(
            Summary = "Gets a single InstructorItem",
            Description = "Gets a single InstructorItem by Id",
            OperationId = "Dashboard.InstructorEarning",
            Tags = new[] { "DashboardEndpoints" })
        ]
        public async Task<ActionResult<List<SaleResponse>>> InstructorEarningAsync(CancellationToken cancellationToken)
        {


            var item = (await _dashboardService.InstructorEarning())
                .Select(index => new SaleResponse
                {
                    month = Convert.ToInt32(index.month),
                    sale = index.sale
                });

            List<SaleResponse> result = (from p in item
                                         group p.sale by p.month into g
                                         select new SaleResponse { month = g.Key, sale = g.Sum() }).ToList();

            for (int i = 1; i <= 12; i++)
            {
                bool status = false;
                foreach (var element in result)
                {
                    if (element.month == i)
                    {
                        status = true;
                    }
                }
                if (!status)
                {
                    result.Add(new SaleResponse { month = i, sale = 0 });
                }
            }
            var response = result.OrderBy(x => x.month);

            foreach (var itemres in response)
            {
                //"Jan","Feb", "Mar", "Apr", "May", "Jun", 'Jul',  "Aug", "Sep", "Oct", "Nov", "Dec"
                switch (itemres.month)
                {
                    case 1: 
                        itemres.monthString = "Jan";
                        break;
                    case 2: 
                        itemres.monthString = "Feb";
                        break;
                    case 3:
                        itemres.monthString = "Mar";
                        break;
                    case 4:
                        itemres.monthString = "Apr";
                        break;
                    case 5:
                        itemres.monthString = "May";
                        break;
                    case 6:
                        itemres.monthString = "Jun";
                        break;
                    case 7:
                        itemres.monthString = "Jul";
                        break;
                    case 8:
                        itemres.monthString = "Aug";
                        break;
                    case 9:
                        itemres.monthString = "Sep";
                        break;
                    case 10:
                        itemres.monthString = "Oct";
                        break;
                    case 11:
                        itemres.monthString = "Nov";
                        break;
                    case 12:
                        itemres.monthString = "Dec";
                        break;

                }
            }
            return Ok(response);
        }

    }
}
