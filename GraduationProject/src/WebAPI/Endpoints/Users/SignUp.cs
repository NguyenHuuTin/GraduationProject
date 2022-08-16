using Ardalis.ApiEndpoints;
using Ardalis.Result;
using Core.Entities;
using Core.Interfaces;
using Web.Endpoints.ToDoItems;
using WebAPI.ApiModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace WebAPI.Endpoints.Users
{
    public class SignUp : BaseAsyncEndpoint<SignUpRequest, UserResponse>
    {
        public readonly IUserServices _userServices;
        public SignUp(IUserServices userServices)
        {
            this._userServices = userServices;
        }
        [HttpPost("/Users/SignUp")]
        [SwaggerOperation(
            Summary = "Sign Up Your New Account",
            Description = "Sign Up A New User",
            OperationId = "User.SignUp",
            Tags = new[] { "UserEndpoints" })
         ]
        public override async Task<ActionResult<UserResponse>> HandleAsync([FromForm] SignUpRequest request, CancellationToken cancellationToken = default)
        {
            if (_userServices.IsUserNameExisted(request.UserName) == true)
            {
                return BadRequest("UserName is Already existed");
            }

            if (_userServices.IsEmailExisted(request.Email) == true)
            {
                return BadRequest("Email is Already existed");
            }

            var user = new User
            {
                UserName = request.UserName,
                RoleId = _userServices.GetRoleIdByRoleName("Student"),
                Email = request.Email,
                NormalizedUserName = request.UserName,              
                SecurityStamp = "Student",
                NormalizedEmail = request.Email,
                FirstName = request.UserName,
                LastName = request.UserName,
                PasswordHash = request.Password,
                CreateAt = DateTime.Now,
                EmailConfirmed = false,
                PhoneNumberConfirmed = false,
                TwoFactorEnabled = false,
                LockoutEnabled = false,
                AccessFailedCount = 0,
                Status = false,
                IsDeleted = false,
                IsStatus = true,

            };

            PasswordHasher<User> passHasher = new PasswordHasher<User>();
            user.PasswordHash = passHasher.HashPassword(user, user.PasswordHash);

            try
            {
                var userAdd = await _userServices.AddUser(user);
            }
            catch (Exception e)
            {
                return Result<ActionResult<UserResponse>>.Error(new[] { e.Message });

            }

            var createUser = new UserResponse
            {
                Id = _userServices.GetUserIdJustAdded(request.UserName),
                UserName = request.UserName,
                Email = request.Email,
                FirstName = request.UserName,
                LastName = request.LastName,

            };
            return Ok(createUser);
        }
    }
}
