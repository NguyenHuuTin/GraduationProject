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

    public class ListUserAdminSpecification : Specification<User>
    {
        public ListUserAdminSpecification()
        {
            Query.Where(item => !item.IsDeleted && item.Role.Name == "Admin").Include(item => item.Role);
        }
    }

    public class ListUserInstructorSpecification : Specification<User>
    {
        public ListUserInstructorSpecification()
        {
            Query.Where(item => !item.IsDeleted && item.Role.Name == "Instructor" && item.IsStatus == true).Include(x => x.Courses);
        }

        public ListUserInstructorSpecification(Guid id)
        {
            Query.Where(item => !item.IsDeleted && item.Role.Name == "Instructor" && item.Id == id && item.IsStatus == true).Include(x => x.Courses);
        }
    }
}
