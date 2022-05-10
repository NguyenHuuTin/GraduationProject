using Core.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;

namespace Web
{
    public static class SeedData
    {
        public static readonly ToDoItem ToDoItem1 = new ToDoItem
        {
            Title = "Get Sample Working",
            Description = "Try to get the sample to build."
        };

        public static readonly ToDoItem ToDoItem2 = new ToDoItem
        {
            Title = "Review Solution",
            Description = "Review the different projects in the solution and how they relate to one another."
        };

        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var dbContext = new AppDbContext(
                serviceProvider.GetRequiredService<DbContextOptions<AppDbContext>>(), null))
            {
                // Look for any TODO items.
                if (dbContext.ToDoItems.Any())
                {
                    return;   // DB has been seeded
                }

                PopulateTestData(dbContext);


            }
        }
        /// <summary>
        /// SeedRole
        /// </summary>
        /// <param name="dbContext"></param>
        public static void PopulateTestData(AppDbContext dbContext)
        {
            foreach (var item in dbContext.ToDoItems)
            {
                dbContext.Remove(item);
            }
            dbContext.SaveChanges();
            dbContext.ToDoItems.Add(ToDoItem1);
            dbContext.ToDoItems.Add(ToDoItem2);

            dbContext.SaveChanges();
        }

        public static readonly Role Roles1 = new Role
        {
            Id = Guid.NewGuid(),
            Name = "Student",
            NormalizedName = "Student",
            ConcurrencyStamp ="Student",
                      
        };

        public static readonly Role Roles2 = new Role
        {
            Id = Guid.NewGuid(),
            Name = "Admmin",
            NormalizedName = "Admin",
            ConcurrencyStamp = "Admin",

        };
        public static readonly Role Roles3 = new Role
        {
            Id = Guid.NewGuid(),
            Name = "Instructor",
            NormalizedName = "Instructor",
            ConcurrencyStamp = "Instructor",

        };

        public static void InitializeRole(IServiceProvider serviceProvider)
        {
            using (var dbContext = new AppDbContext(
                serviceProvider.GetRequiredService<DbContextOptions<AppDbContext>>(), null))
            {
                // Look for any TODO items.
                if (dbContext.Roles.Any())
                {
                    return;   // DB has been seeded
                }

                PopulateTestDataRole(dbContext);


            }
        }
        public static void PopulateTestDataRole(AppDbContext dbContext)
        {
            foreach (var item in dbContext.ToDoItems)
            {
                dbContext.Remove(item);
            }
            dbContext.SaveChanges();
            dbContext.Roles.Add(Roles1);
            dbContext.Roles.Add(Roles2);
            dbContext.Roles.Add(Roles3);
            dbContext.SaveChanges();
        }
        /// <summary>
        /// Seed Permission
        /// </summary>

        public static readonly Permission Permission1 = new Permission
        {
            Name = "Edit_Role",
        };
        public static readonly Permission Permission2 = new Permission
        {
            Name = "Create_Role",
        };
             public static readonly Permission Permission3 = new Permission
             {
                 Name = "Delete_Role",
             };

        public static void InitializePermission(IServiceProvider serviceProvider)
        {
            using (var dbContext = new AppDbContext(
                serviceProvider.GetRequiredService<DbContextOptions<AppDbContext>>(), null))
            {
                // Look for any TODO items.
                if (dbContext.Permissions.Any())
                {
                    return;   // DB has been seeded
                }

            PopulateTestDataPermission(dbContext);


            }
        }
        public static void PopulateTestDataPermission(AppDbContext dbContext)
        {
            foreach (var item in dbContext.Permissions)
            {
                dbContext.Remove(item);
            }
            dbContext.SaveChanges();
            dbContext.Permissions.Add(Permission1);
            dbContext.Permissions.Add(Permission1);
            dbContext.Permissions.Add(Permission1);
            dbContext.SaveChanges();
        }
        /// <summary>
        /// Seed Role Permison
        /// </summary>

        public static readonly RolePermission RolePermission1 = new RolePermission
        {
            RoleId = Roles1.Id,
            PermissionId = Permission1.Id

        };
        public static readonly RolePermission RolePermission2 = new RolePermission
        {
            RoleId = Roles2.Id,
            PermissionId = Permission2.Id

        };
        public static readonly RolePermission RolePermission3 = new RolePermission
        {
            RoleId = Roles3.Id,
            PermissionId = Permission3.Id

        };
        public static void InitializeRolePermission(IServiceProvider serviceProvider)
        {
            using (var dbContext = new AppDbContext(
                serviceProvider.GetRequiredService<DbContextOptions<AppDbContext>>(), null))
            {
                // Look for any TODO items.
                if (dbContext.RolePermissions.Any())
                {
                    return;   // DB has been seeded
                }

                PopulateTestDataRolePermission(dbContext);


            }
        }
        public static void PopulateTestDataRolePermission(AppDbContext dbContext)
        {
            foreach (var item in dbContext.RolePermissions)
            {
                dbContext.Remove(item);
            }
            dbContext.SaveChanges();
            dbContext.RolePermissions.Add(RolePermission1);
            dbContext.RolePermissions.Add(RolePermission3);
            dbContext.RolePermissions.Add(RolePermission2);
            dbContext.SaveChanges();
        }

    }
}
