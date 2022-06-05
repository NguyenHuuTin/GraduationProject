using Ardalis.ApiEndpoints;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace WebAPI.Endpoints.OrderDetail
{
    public class GetListCourseSeller : BaseAsyncEndpoint
    {
        private readonly IOrderDetailService _service;
        private readonly IUserServices _userServices;

        public GetListCourseSeller(IOrderDetailService service, IUserServices user)
        {
            _service = service;
            _userServices = user;
        }

        [HttpGet("/CourseSeller")]
        [SwaggerOperation(
            Summary = "Gets a list of all CourseSeller",
            Description = "Gets a list of all CourseSeller",
            OperationId = "CourseSeller.List",
            Tags = new[] { "CourseSellerEndpoints" })
        ]
        public async Task<ActionResult<List<CourseSellerResponse>>> GetAllAsync( CancellationToken cancellationToken = default)
        {
            var items = (await _service.GetAllOrderDetail())
                .Select(item => new CourseSellerResponse
                {
                    studentName = _userServices.GetNameUser(item.UserId),
                    courseTitle = item.Course.Title,
                    dateTime = Convert.ToDateTime(item.PurchasedDay).ToString("dd MMMM yy"),
                    price = item.Price
                }) ;
            return Ok(items);
        }
    }
}
