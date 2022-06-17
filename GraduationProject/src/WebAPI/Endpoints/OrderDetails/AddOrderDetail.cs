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
using WebAPI.Endpoints.OrderDetails;

namespace WebAPI.Endpoints.OrderDetails
{
    public class AddOrderDetail : BaseAsyncEndpoint
    {
        private readonly IOrderDetailService _service;
        private readonly ICourseService _courseService;
        private readonly IUserServices _userServices;

        public AddOrderDetail(IOrderDetailService service, ICourseService courseService, IUserServices userServices)
        {
            _service = service;
            _courseService = courseService;
            _userServices = userServices;
        }

        [HttpPost("/AddOrdeDetail")]
        [SwaggerOperation(
            Summary = "AddOrdeDetail",
            Description = "AddOrdeDetail",
            OperationId = "AddOrdeDetail.List",
            Tags = new[] { "OrderDetailEndpoints" })
        ]
        public async Task<ActionResult<bool>> AddOrderAsync([FromBody]AddOrderResponse order, CancellationToken cancellationToken = default)
        {
            var userId = GetLoggedUserId();
            var instructorId = await _courseService.GetUserIdByCourseId(order.courseId);
            User user = await _userServices.GetById(instructorId);
            user.AvailableAmount += (order.price - (order.price * Convert.ToDecimal(0.03)));
            await _userServices.Update(user);
            var result = await _service.AddOrder(userId, order.courseId, order.price);
            return Ok(result);
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
