using Ardalis.Result;
using Core.Entities;
using Core.Interfaces;
using Core.Mapper.ViewModel;
using Core.Specifications;
using SharedKernel.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Core.Services
{
    public class UserServices : IUserServices
    {
        private readonly IUserRepository _userRepository;
        private readonly IRoleRepository _roleRepository;
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;
        private IEmailSender _emailSender;
        public UserServices(IUserRepository userRepository, 
                            IRoleRepository roleRepository, 
                            UserManager<User> userManager, 
                            IConfiguration configuration, 
                            IEmailSender emailSender)
        {
            _userRepository = userRepository;
            _roleRepository = roleRepository;
            _userManager = userManager;
            _configuration = configuration;
            _emailSender = emailSender;
        }
        public async Task<User> GetById(Guid id)
        {
            return await _userRepository.List<User>().Where(u => u.Id == id && u.IsDeleted == false).SingleOrDefaultAsync();
        }

        // Get List User by query Specification
        public Task<List<User>> GetAll()
        {
            var query = new ListUserNotDeleteSpecification();
            return _userRepository.ListAsync(query);
        }

        public Task<List<User>> GetAllAdmin()
        {
            var query = new ListUserAdminSpecification();
            return _userRepository.ListAsync(query);
        }

        // Add User
        public async Task<User> AddUser(User user)
        {
            return await _userRepository.AddAsync(user);
        }

        // Logic Delete
        public async Task Delete(User user)
        {
            user.IsDeleted = true;
            await _userRepository.UpdateAsync(user);
        }
        public async Task Update(User user)
        {
            await _userRepository.UpdateAsync<User>(user);
        }

        public Guid GetRoleIdByRoleName(string roleName)
        {
            var roleId = _roleRepository.List<Role>(role => role.Name == roleName).SingleOrDefault().Id;
            return roleId;
        }

        // Update UserService
        public Guid GetUserIdJustAdded(string userName)
        {
            var lastUserIdAdded = _userRepository.List<User>().Where(u=>u.UserName == userName && u.IsDeleted == false).SingleOrDefault();
            return lastUserIdAdded.Id;
        }

        public string GetRoleNameByRoleId(Guid id)
        {
            var roleName = _roleRepository.List<Role>(r=>r.Id == id).SingleOrDefault().Name;
            return roleName;
        }

        public bool IsUserNameExisted(string userName)
        {
            bool result = true;
            var user = _userRepository.List<User>().Where(u => u.UserName == userName && u.IsDeleted == false).SingleOrDefault();
            if(user == null)
            {
                result = false;
            }
            return result;
        }

        public bool IsEmailExisted(string email)
        {
            bool result = true;
            var user = _userRepository.List<User>().Where(u => u.Email == email && u.IsDeleted == false).SingleOrDefault();
            if(user == null)
            {
                result = false;
            }
            return result;
        }

        public async Task<List<User>> SearchUser(string keyword)
        {
            var users = _userRepository.List<User>().Include(u => u.Role).Where(u => u.IsDeleted == false);
            var result = await users.Where(u => u.UserName.Contains(keyword) || u.Role.Name.Contains(keyword)).ToListAsync();
            return result;
        }

        public async Task<User> Login(string email, string password)
        {
            var user = _userRepository.List<User>().Where(u => u.Email == email && u.IsDeleted == false).SingleOrDefault();
            //var user = await _userManager.FindByEmailAsync(email) ?? await _userManager.FindByNameAsync(email);
            var checkPass = await _userManager.CheckPasswordAsync(user, password);

            /*PasswordHasher<User> passwordHasher = new PasswordHasher<User>();
            user.PasswordHash = passwordHasher.HashPassword(user, password);*/

            if (!checkPass)
            {
                user = null;
            }
            return await Task.FromResult(user);
        }

        public async Task<TokenResult> GenerateJSONWebToken(User user, HttpContext httpContext)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>() {
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.NameId, user.Id.ToString()),
                new Claim("Name", user.UserName.ToString())
            };

            var roles = await _userManager.GetRolesAsync(user);

            foreach (var role in roles)
            {
                claims.Add(new Claim("Role", role));
            }

            var token = new JwtSecurityToken(
                //payload
                issuer: null,
                audience: null,
                claims,
                expires: DateTime.Now.AddMinutes(120),
                //header
                signingCredentials: credentials);

            var tokenResult = new JwtSecurityTokenHandler().WriteToken(token);

            return new TokenResult()
            {
                Token = tokenResult,
                User = new AccountModel()
                {
                    Id = user.Id,
                    Roles = _userManager.GetRolesAsync(user).Result,
                    FirstName = user.FirstName,
                    LastName = user.LastName
                }
            };
        }

        public bool VerifyToken(string token)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            try
            {
                new JwtSecurityTokenHandler().ValidateToken(token, new TokenValidationParameters()
                {
                    ValidateIssuerSigningKey = true,
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    IssuerSigningKey = securityKey
                }, out SecurityToken validatedToken);
            }
            catch
            {
                return false;
            }
            return true;
        }

        public async Task<string> ChangePassword(string email, string oldPassword, string newPassword)
        {
            var user = await _userManager.FindByEmailAsync(email) ?? await _userManager.FindByNameAsync(email);
            var changePass = await _userManager.ChangePasswordAsync(user, oldPassword, newPassword);

            if (changePass.Succeeded)
            {
                return await Task.FromResult("Change success.");
            }
            return await Task.FromResult("Change failed.");
        }

        public async Task<IdentityResult> ForgotPassword(string email, string token, string password)
        {
            var user = await _userManager.FindByEmailAsync(email) ?? await _userManager.FindByNameAsync(email);

            return await Task.FromResult(await _userManager.ResetPasswordAsync(user, token, password));
        }
        public async Task<IdentityResult> ConfirmEmail(string email, string token)
        {
            var user = await _userManager.FindByEmailAsync(email) ?? await _userManager.FindByNameAsync(email);

            return await Task.FromResult(await _userManager.ConfirmEmailAsync(user, token));
        }

        public async Task<UserManagerResponse> ForgetPasswordAsync(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
                return new UserManagerResponse
                {
                    IsSuccess = false,
                    Message = "No user associated with email",
                };

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);

            await _emailSender.SendEmailAsync(email, _configuration["EmailSettings:Mail"], "Reset Password", "<h1>Follow the instructions to reset your password</h1>" +
                $"<p>To token for reset password is <strong>{token}</strong></p>");

            return new UserManagerResponse
            {
                TokenResetpassword = token,
                IsSuccess = true,
                Message = "Reset password URL has been sent to the email successfully!"
            };
        }
        public async Task<UserManagerResponse> ConfirmEmailAsync(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
                return new UserManagerResponse
                {
                    IsSuccess = false,
                    Message = "No user associated with email",
                };

            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            await _emailSender.SendEmailAsync(email, _configuration["EmailSettings:Mail"], "Confirm Email Now", "<h1>Curcus Website-Confirm your email Now</h1>" +
                $"<p>To token for confirm email is : <strong>{token}</strong></p>");

            return new UserManagerResponse
            {
                TokenResetpassword = token,
                IsSuccess = true,
                Message = "Comfirm email URL has been sent to the email successfully!"
            };
        }

        public string GetNameUser(Guid id)
        {
            var result = _userRepository.List<User>().Where(u => u.Id == id && u.IsDeleted == false).SingleOrDefault().UserName;
            return result;
        }
    }
}
