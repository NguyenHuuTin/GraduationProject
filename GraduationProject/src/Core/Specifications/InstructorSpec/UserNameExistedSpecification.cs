using Ardalis.Specification;
using Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Specifications.InstructorSpec
{
    public class UserNameExistedSpecification : Specification<User>
    {
        public UserNameExistedSpecification(string username)
        {
            Query.Where(item => item.UserName.Equals(username));
        }

    }
}
