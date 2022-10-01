﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Endpoints.Courses
{
    public class UpdateSectionRequest
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public int TimeTotal { get; set; }
        public Guid CourseId { get; set; }
    }
}
