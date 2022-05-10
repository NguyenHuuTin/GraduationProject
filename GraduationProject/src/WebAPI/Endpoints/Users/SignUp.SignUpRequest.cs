using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Endpoints.Users
{
    public class SignUpRequest
    {

        [Required]
        [StringLength(100, ErrorMessage = "{0} fron {2} to {1} chracter.", MinimumLength = 3)]
        public string UserName { set; get; }
        [Required]
        [StringLength(100, ErrorMessage = "{0} fron {2} to {1} chracter.", MinimumLength = 3)]
        public string LastName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "{0} dài từ {2} đến {1} ký tự.", MinimumLength = 3)]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Compare("Password", ErrorMessage = "Please input again the same password")]
        public string ConfirmPassword { get; set; }



    }
}
