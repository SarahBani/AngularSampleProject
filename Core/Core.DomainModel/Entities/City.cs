using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations;

namespace Core.DomainModel.Entities
{
    public class City : BaseEntity<long>
    {

        [Required(ErrorMessage = "Country is required!")]
        public short CountryId { get; set; }

        [Required(ErrorMessage = "Name is required!")]
        [StringLength(50, ErrorMessage = "Name cannot be longer than 50 characters!")]
        public string Name { get; set; }

        public virtual Country Country { get; set; }

    }

    internal class CityEntityTypeConfiguration : IEntityTypeConfiguration<City>
    {

        public void Configure(EntityTypeBuilder<City> builder)
        {
            builder.Property(q => q.Name)
                .IsRequired()
                .HasMaxLength(50);
        }

    }
}
