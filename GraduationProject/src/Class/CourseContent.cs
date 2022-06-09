﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Class
{
    public class CourseContent
    {
        [Required]
        public Guid CourseId { get; set; }

        [Required]
        public string CourseContentTitle { get; set; }

        //[Required]
        //public List<LessonContent> LessonContents { get; set; }

        [Required]
        public List<LessonContent> LessonContents { get; set; }
    }
}
