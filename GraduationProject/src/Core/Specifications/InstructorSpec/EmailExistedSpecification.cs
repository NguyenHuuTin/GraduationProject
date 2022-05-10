using Ardalis.Specification;
using Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Specifications.InstructorSpec
{
    public class EmailExistedSpecification : Specification<User>
    {
        public EmailExistedSpecification(string email)
        {
            Query.Where(item => item.Email.Equals(email));
        }

    }
}
