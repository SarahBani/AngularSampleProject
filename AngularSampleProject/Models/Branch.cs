using System.ComponentModel.DataAnnotations;

namespace AngularSampleProject.Models
{
    public class Branch : Entity<int>
    {

        [Required(ErrorMessage = "Bank is required!")]
        public int BankId { get; set; }

        [Required(ErrorMessage = "Name is required!")]
        [StringLength(100, ErrorMessage = "Name can't be longer than 100 characters!")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Code is required!")]
        [StringLength(10, ErrorMessage = "Code can't be longer than 10 characters!")]
        public string Code { get; set; }

        [StringLength(500, ErrorMessage = "Address can't be longer than 500 characters!")]
        public string Address { get; set; }

        public virtual Bank Bank { get; set; }

    }
}
