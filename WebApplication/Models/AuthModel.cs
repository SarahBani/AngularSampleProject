using System.ComponentModel.DataAnnotations;

namespace UserInterface.Models
{
    public class AuthModel
    {

        [Required(ErrorMessage = "Email is required!")]
        //[StringLength(50, ErrorMessage = "Email cannot be longer than 50 characters!")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password  is required!")]
        public string Password { get; set; }

    }
}
