using SharedKernel;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Entities
{
    public class Comment : BaseEntity
    {
        public Guid CourseId { get; set; }

        public Guid UserId { get; set; }

        public string content { get; set; }

        public virtual User User { get; set; }

        public virtual Course Course { get; set; }
    }
}
