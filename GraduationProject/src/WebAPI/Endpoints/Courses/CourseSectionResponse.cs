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

    public class QuizzRequest
    {
        public Guid id { get; set; }
        public string title { get; set; }
    }

    public class QuestionRequest
    {
        public Guid id { get; set; }
        public string htmlContent { get; set; }
    }

    public class AnswerRequest
    {
        public Guid id { get; set; }
        public string answer { get; set; }
    }
}
