using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Core.DomainModel.Entities
{
    public class Room : BaseEntity<long>
    {

        [Required(ErrorMessage = "City is required!")]
        public long HotelId { get; set; }

        [Required(ErrorMessage = "Name is required!")]
        [StringLength(50, ErrorMessage = "Name cannot be longer than 50 characters!")]
        public string Name { get; set; }

        [DisplayName("Minimum Capacity")]
        public byte? MinCapacity { get; set; }

        [DisplayName("Maximum Capacity")]
        public byte? MaxCapacity { get; set; }

        public string Facilities { get; set; }

        public virtual Hotel Hotel { get; set; }

    }
    internal class RoomEntityTypeConfiguration : IEntityTypeConfiguration<Room>
    {

        public void Configure(EntityTypeBuilder<Room> builder)
        {
            builder.Property(q => q.Name)
                .IsRequired()
                .HasMaxLength(50);
        }

    }
}
