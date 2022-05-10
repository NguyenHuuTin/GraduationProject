using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Endpoints.Roles
{
    public class RoleRequest
    {
        public string Name { get; set; }
        public ICollection<string> PermissionIds { get; set; }
    }
}
