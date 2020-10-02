using System.ComponentModel.DataAnnotations;

namespace Core.DomainModel.Entities
{
    public class Country : BaseEntity<short>
    {

        [Required(ErrorMessage = "Name is required!")]
        [StringLength(30, ErrorMessage = "Name can't be longer than 30 characters!")]
        public string Name { get; set; }

    }
}
