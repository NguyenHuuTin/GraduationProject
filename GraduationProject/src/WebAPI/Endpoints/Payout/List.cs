using Ardalis.ApiEndpoints;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace WebAPI.Endpoints.Payout
{
    public class List : BaseAsyncEndpoint
    {
        private readonly IPayoutService _payoutService;

        public List(IPayoutService payoutService)
        {
            _payoutService = payoutService;
        }

        [HttpGet("/Payout")]
        [SwaggerOperation(
            Summary = "Gets a list of all Payout",
            Description = "Gets a list of all Payout",
            OperationId = "Payout.List",
            Tags = new[] { "PayoutEndpoints" })
        ]
        public async Task<ActionResult<List<PayoutResponse>>> GetAllAsync(CancellationToken cancellationToken = default)
        {        
            var items = (await _payoutService.GetAllPayout())
                .Select(item => new PayoutResponse
                {
                    Id = item.Id,
                    Name = item.Instructor.UserName,
                    Amount = item.Price,
                    CreateAt = item.CreateAt,
                    Remark = item.Remark,
                    Update = Convert.ToDateTime(item.Update).ToString("dd MMMM yyyy"),
                    Status = item.Status
                });
            return Ok(items);
        }
    }
}
