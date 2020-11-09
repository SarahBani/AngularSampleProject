using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations;

namespace Core.DomainModel.Entities
{
    public class HotelRoom : BaseEntity<long>
    {

        [Required(ErrorMessage = "Hotel is required!")]
        public long HotelId { get; set; }

        [Required]
        [StringLength(50, ErrorMessage = "Name cannot be longer than 50 characters!")]
        public string Name { get; set; }

        [Required]
        public short Number { get; set; }

        public byte Capacity { get; set; }

        public string Facilities { get; set; }

        public virtual Hotel Hotel { get; set; }

    }
    internal class RoomEntityTypeConfiguration : IEntityTypeConfiguration<HotelRoom>
    {

        public void Configure(EntityTypeBuilder<HotelRoom> builder)
        {
            builder.Property(q => q.Name)
                .IsRequired()
                .HasMaxLength(50);

            builder.Property(q => q.Number)
                .IsRequired();

            builder.Property(q => q.Capacity)
                .IsRequired();
        }

    }
}
