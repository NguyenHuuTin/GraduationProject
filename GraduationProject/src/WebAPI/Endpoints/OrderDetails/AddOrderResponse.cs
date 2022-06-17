using System;

namespace WebAPI.Endpoints.OrderDetails
{
    public class AddOrderResponse
    {
        public Guid courseId { get; set; }
        public decimal price { get; set; }
    }
}
