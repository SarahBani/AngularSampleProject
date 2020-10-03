using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Core.DomainModel.Entities
{
    public enum Grade
    {
        A, B, C, D, F
    }

    public class Bank : BaseEntity<int>
    {

        [Required(ErrorMessage = "Name is required!")]
        [StringLength(40, ErrorMessage = "Name can't be longer than 40 characters!")]
        public string Name { get; set; }

        public Grade? Grade { get; set; }

        public string LogoUrl { get; set; }

        public ICollection<Branch> Branches { get; set; }

    }

    internal class BankEntityTypeConfiguration : IEntityTypeConfiguration<Bank>
    {

        public void Configure(EntityTypeBuilder<Bank> builder)
        {
            builder.Property(q => q.Name)
                .IsRequired()
                .HasMaxLength(40);

            builder.Property(q => q.Grade)
                .HasColumnType("tinyint");

            //.HasDefaultValueSql("getdate()");
        }

    }
}
