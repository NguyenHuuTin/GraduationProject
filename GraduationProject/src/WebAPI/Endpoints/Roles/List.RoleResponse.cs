using Core.Entities;
using System;
using System.Collections.Generic;

namespace WebAPI.Endpoints.Roles
{
    public class RoleResponse
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<string> Permission { get; set; }
        public ICollection<RolePermission> RolePermissions { get; set; }

    }
}

