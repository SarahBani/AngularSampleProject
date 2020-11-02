using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Core.DomainModel.Collections
{
    public class BookComment
    {

        [Required(ErrorMessage = "Writer is required!")]
        [StringLength(100, ErrorMessage = "Writer cannot be longer than 100 characters!")]
        [DisplayName("Writer")]
        public string Writer { get; set; }

        [Required(ErrorMessage = "Comment is required!")]
        public string Comment { get; set; }

        [Required]
        public DateTime CreatedDateTime { get; set; } = DateTime.Now;

    }
}
