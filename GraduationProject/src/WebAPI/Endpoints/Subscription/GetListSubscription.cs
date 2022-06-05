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
    public class GetListSubscription : BaseAsyncEndpoint
    {
        private readonly ISubscriptionService _service;
        private readonly IUserServices _userServices;

        public GetListSubscription(ISubscriptionService service, IUserServices user)
        {
            _service = service;
            _userServices = user;
        }

        [HttpGet("/Subscription")]
        [SwaggerOperation(
            Summary = "Gets a list of all Subscription",
            Description = "Gets a list of all Subscription",
            OperationId = "Subscription.List",
            Tags = new[] { "SubscriptionEndpoints" })
        ]
        public async Task<ActionResult<List<SubscriptionResponse>>> GetAllAsync( CancellationToken cancellationToken = default)
        {
            var items = (await _service.GetAllSubscription())
                .Select(item => new SubscriptionResponse
                {
                    studentName = item.Subscriper.UserName,
                    instructorName = _userServices.GetNameUser(item.UserId),
                    dateTime = Convert.ToDateTime(item.CreateAt).ToString("dd MMMM yy"),
                }) ;
            return Ok(items);
        }
    }
}
