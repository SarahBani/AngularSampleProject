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
        [StringLength(40, ErrorMessage = "Name cannot be longer than 40 characters!")]
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
                        
            builder.HasMany(q => q.Branches)
                .WithOne(q => q.Bank)
                .HasForeignKey(q => q.BankId)
                .HasConstraintName("FK_Branch_Bank")
                .OnDelete(DeleteBehavior.NoAction); // disable cascade delete

            //.HasDefaultValueSql("getdate()");
        }

    }
}
