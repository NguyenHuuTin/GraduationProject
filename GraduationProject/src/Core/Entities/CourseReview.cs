using SharedKernel;
using System;

namespace Core.Entities
{
    public class CourseReview : BaseEntity
    {
        public Guid EnrollmentId { get; set; }

        public string Content { get; set; }

        public DateTime CreateAt { get; set; }

        public DateTime? UpdateAt { get; set; }

        public bool IsDeleted { get; set; }

        //Navigation property
        public virtual Enrollment Enrollment { get; set; }
    }
}
