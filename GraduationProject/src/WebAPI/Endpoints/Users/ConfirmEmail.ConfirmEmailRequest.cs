using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Endpoints.Users
{
    public class ConfirmEmailRequest
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Token { get; set; }
    }
}
