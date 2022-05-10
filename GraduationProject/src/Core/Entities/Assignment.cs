using SharedKernel;
using System;
using System.Collections.Generic;

namespace Core.Entities
{
    public class Assignment : BaseEntity
    {
        public Guid SectionId { get; set; }

        public string Title { get; set; }

        public DateTime CreateAt { get; set; }

        public DateTime? UpdateAt { get; set; }

        public string Content { get; set; }

        public bool IsDeleted { get; set; } = false;

        //Navigation properties
        public virtual Section Section { get; set; }

        public virtual ICollection<Attachment> Attachments { get; set; }
    }
}
