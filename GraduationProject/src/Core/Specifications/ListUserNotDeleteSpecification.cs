using Ardalis.Specification;
using Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Specifications
{
    public class ListUserNotDeleteSpecification : Specification<User>
    {
        public ListUserNotDeleteSpecification()
        {
            Query.Where(item => item.IsDeleted == false).Include(item =>item.Role);
        }
    }
}
