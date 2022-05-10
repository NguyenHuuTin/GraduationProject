using SharedKernel;
using System;

namespace Core.Entities
{
    public class CourseRating : BaseEntity
    {
        public Guid EnrollmentId { get; set; }

        public byte Rating { get; set; }

        public DateTime CreateAt { get; set; }

        public DateTime? UpdateAt { get; set; }

        public bool IsDeleted { get; set; }

        //Navigation property
        public virtual Enrollment Enrollment { get; set; }
    }
}
