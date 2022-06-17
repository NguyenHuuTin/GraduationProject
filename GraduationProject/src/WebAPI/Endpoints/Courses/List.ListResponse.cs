using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Endpoints.Courses
{
    public class ListResponse
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public decimal Price { get; set; }
        public string Category { get; set; }
        public string Status { get; set; }
        public string? UpdateAt { get; set; }
    }

    public class TopCourse
    {
        public Guid id { get; set; }
        public decimal price { get; set; }
    }

}
