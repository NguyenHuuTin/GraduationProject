using SharedKernel;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Entities
{
    public class Payout : BaseEntity
    {
        public Guid InstructorId { get; set; }

        public double Price { get; set; }

        public DateTime CreateAt { get; set; }

        public DateTime? Update { get; set; }

        public string Remark { get; set; }

        public string Status { get; set; }

        // Navidation property
        public virtual User Instructor { get; set; }

    }
}
