using System;
using System.ComponentModel.DataAnnotations;

namespace WebAPI.Endpoints.Courses
{
    public class CourseSectionResponse
    {

        [Required]
        public Guid CourseId { get; set; }

        [Required]
        public string CourseContentTitle { get; set; }
    }
}
