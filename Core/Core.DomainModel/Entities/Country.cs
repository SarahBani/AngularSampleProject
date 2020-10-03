using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations;

namespace Core.DomainModel.Entities
{
    public class Country : BaseEntity<short>
    {

        [Required(ErrorMessage = "Name is required!")]
        [StringLength(30, ErrorMessage = "Name can't be longer than 30 characters!")]
        public string Name { get; set; }

    }

    internal class CountryEntityTypeConfiguration : IEntityTypeConfiguration<Country>
    {

        public void Configure(EntityTypeBuilder<Country> builder)
        {
            builder.Property(q => q.Name)
                .IsRequired()
                .HasMaxLength(30);
        }

    }
}
