using System.ComponentModel.DataAnnotations;

namespace AngularSampleProject.Models
{
    public class Entity<TKey>
    {
        [Required]
        public TKey Id { get; set; }

    }
}
