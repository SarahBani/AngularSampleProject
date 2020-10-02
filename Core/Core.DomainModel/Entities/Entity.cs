using System.ComponentModel.DataAnnotations;

namespace Core.DomainModel.Entities
{
    public class Entity<TKey>
    {
        [Required]
        public TKey Id { get; set; }

    }
}
