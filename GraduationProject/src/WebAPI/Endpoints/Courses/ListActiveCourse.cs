using Ardalis.ApiEndpoints;
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
    public class ListActiveCourse : BaseAsyncEndpoint
    {
        private readonly ICourseService _courseService;
        private readonly IOrderDetailService _orderDetailService;

        public ListActiveCourse(ICourseService courseService, IOrderDetailService orderDetailService)
        {
            _courseService = courseService;
            _orderDetailService = orderDetailService;
        }

        [HttpGet("/ActiveCourse")]
        [SwaggerOperation(
            Summary = "Gets a list of Active Course",
            Description = "Gets a list of Active Course",
            OperationId = "Course.ListActiveCourse",
            Tags = new[] { "CourseEndpoints" })
        ]
        public async Task<ActionResult<List<ListActiveCourseResponse>>> GetListActiveCourseAsync(CancellationToken cancellationToken)
        {
            var items = (await _courseService.GetActiveCourse<Course>())
                .Select(item => new ListActiveCourseResponse
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

        [HttpGet("/ActiveCourseStudentPage")]
        [SwaggerOperation(
            Summary = "Gets a list of Active Course",
            Description = "Gets a list of Active Course",
            OperationId = "Course.ActiveCourseStudentPage",
            Tags = new[] { "CourseEndpoints" })
        ]
        public async Task<ActionResult<List<ListActiveCourseStudentPageResponse>>> GetListActiveCourseStudentPageAsync(CancellationToken cancellationToken)
        {
            var items = (await _courseService.GetActiveCourseStudent<Course>())
                .Select(item => new ListActiveCourseStudentPageResponse
                {
                    Id = item.Id,
                    Price = item.OriginPrice,
                    Title = item.Title,
                    Status = item.Status,
                    UpdateAt = Convert.ToDateTime(item.UpdateAt).ToString("dd MMMM yyyy"),
                    User = item.User.UserName,
                    Image = item.ImageUrl,
                    Avatar = item.User.Avatar
                });

            return Ok(items);
        }


        [HttpGet("/MyCourseStudentPage")]
        [SwaggerOperation(
            Summary = "Gets a list of Active Course",
            Description = "Gets a list of Active Course",
            OperationId = "Course.ActiveCourseStudentPage",
            Tags = new[] { "CourseEndpoints" })
        ]
        public async Task<ActionResult<List<ListActiveCourseStudentPageResponse>>> GetListMyCourseStudentPageAsync(CancellationToken cancellationToken)
        {
            var userId = GetLoggedUserId();

            var items = (await _orderDetailService.GetAllOrderDetailWithStudent(userId))
                .Select(item => new ListActiveCourseStudentPageResponse
                {
                    Id = item.Course.Id,
                    Price = item.Course.OriginPrice,
                    Title = item.Course.Title,
                    Status = item.Course.Status,
                    UpdateAt = Convert.ToDateTime(item.Course.UpdateAt).ToString("dd MMMM yyyy"),
                    User = item.Course.User.UserName,
                    Image = item.Course.ImageUrl,
                    Avatar = item.Course.User.Avatar
                });

            return Ok(items);
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
