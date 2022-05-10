using Ardalis.Specification;
using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Core.Specifications.InstrructorSpec
{
    public class InstructorItemsSpecification : Specification<User>
    {
        public InstructorItemsSpecification()
        {
            Query.Where(item => item.Role.Name.Equals("Instructor") && item.IsDeleted == false).Include(u => u.Role);
        }

    }
}
