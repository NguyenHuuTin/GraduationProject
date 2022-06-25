using System;

namespace WebAPI.Endpoints.OrderDetails
{
    public class AddOrderResponse
    {
        public Guid courseId { get; set; }
        public decimal price { get; set; }
    }

    public class ListStudentResponse
    {
        public Guid Id { get; set; }
        public string name { get; set; }
        public string avatar { get; set; }
        public string date { get; set; }
        public double percent { get; set; }
    }
}
