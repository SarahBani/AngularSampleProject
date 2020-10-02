using System.ComponentModel.DataAnnotations;

namespace Core.DomainModel.Entities
{
    public class Branch : Entity<int>
    {

        [Required(ErrorMessage = "Bank is required!")]
        public int BankId { get; set; }

        [Required(ErrorMessage = "Name is required!")]
        [StringLength(60, ErrorMessage = "Name can't be longer than 60 characters!")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Code is required!")]
        [StringLength(10, ErrorMessage = "Code can't be longer than 10 characters!")]
        public string Code { get; set; }

        public string Address { get; set; }

        public virtual Bank Bank { get; set; }

    }
}
