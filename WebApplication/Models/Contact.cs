using System.ComponentModel.DataAnnotations;

namespace WebApplication.Models
{
    public class Contact
    {

        [Required(ErrorMessage = "Email is required!")]
        [StringLength(50, ErrorMessage = "Email cannot be longer than 50 characters!")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Message is required!")]
        [StringLength(1000, ErrorMessage = "Message cannot be longer than 1000 characters!")]
        public string Message { get; set; }

    }
}
