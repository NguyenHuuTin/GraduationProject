﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Endpoints.Courses
{
    public class ListActiveCourseResponse
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public decimal Price { get; set; }
        public string Category { get; set; }
        public string Status { get; set; }
        public string? UpdateAt { get; set; }
    }

    public class ListActiveCourseStudentPageResponse
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public decimal Price { get; set; }
        public string User { get; set; }
        public string Status { get; set; }
        public string? UpdateAt { get; set; }
        public string Image { get; set; }
        public string Avatar { get; set; }
    }
}
