using SharedKernel.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Mapper.CourseCompletionModel
{
    public class CreateCourseCompletionRequest
    {
        public Guid UserId { get; set; }

        public Guid CourseId { get; set; }
    }
}
