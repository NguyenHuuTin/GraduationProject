using SharedKernel;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Entities
{
    public class Language : BaseEntity
    {
        public string Name { get; set; }

        public string Status { get; set; }

        public ICollection<Course> Courses { get; set; }

    }
}
