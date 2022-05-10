using SharedKernel;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Entities
{
    public class Permission : BaseEntity
    {
        public string Name { get; set; }

        public ICollection<RolePermission> RolePermissions { get; set; }
    }
}
