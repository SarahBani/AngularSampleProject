using System.ComponentModel.DataAnnotations;

namespace WebApplication.Models
{
    public class Book
    {
            
        [Required]
        public long Id { get; set; }

        [Required(ErrorMessage = "Name is required!")]
        [StringLength(100, ErrorMessage = "Name cannot be longer than 100 characters!")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Author is required!")]
        [StringLength(100, ErrorMessage = "Author cannot be longer than 100 characters!")]
        public string Author { get; set; }

        [StringLength(100, ErrorMessage = "Translator cannot be longer than 100 characters!")]
        public string Translator { get; set; }

        public string CoverImageUrl { get; set; }

        public string Summary { get; set; }

    }
}
