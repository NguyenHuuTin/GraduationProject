using Ardalis.Result;
using Core.Entities;
using Core.Mapper.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IUserServices
    {
        Task<List<User>> GetAll();

        Task<List<User>> GetAllAdmin();

        string GetNameUser(Guid id);

        Task<List<User>> SearchUser(string keyword);

        Task<User> GetById(Guid id);

        Task<User> AddUser(User user);

        Task Update(User user);

        Task Delete(User user);

        Guid GetUserIdJustAdded(string userName);

        string GetRoleNameByRoleId(Guid id);

        bool IsUserNameExisted(string userName);

        bool IsEmailExisted(string email);

        Guid GetRoleIdByRoleName(string roleName);

        Task<User> Login(string email, string password);

        Task<TokenResult> GenerateJSONWebToken(User user, HttpContext httpContext);

        bool VerifyToken(string token);
        Task<string> ChangePassword(string email, string oldPassword, string newPassword);
        Task<IdentityResult> ForgotPassword(string email, string token, string password);
        Task<IdentityResult> ConfirmEmail(string email, string token);
        Task<UserManagerResponse> ForgetPasswordAsync(string email);
        Task<UserManagerResponse> ConfirmEmailAsync(string email);
    }
}
