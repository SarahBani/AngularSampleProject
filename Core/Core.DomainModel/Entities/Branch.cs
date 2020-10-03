using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations;

namespace Core.DomainModel.Entities
{
    public class Branch : BaseEntity<int>
    {

        [Required(ErrorMessage = "Bank is required!")]
        public int BankId { get; set; }

        [Required(ErrorMessage = "Name is required!")]
        [StringLength(60, ErrorMessage = "Name can't be longer than 60 characters!")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Code is required!")]
        [StringLength(10, ErrorMessage = "Code can't be longer than 10 characters!")]
        public string Code { get; set; }

        public string Address { get; set; }

        public virtual Bank Bank { get; set; }

    }
    internal class BranchEntityTypeConfiguration : IEntityTypeConfiguration<Branch>
    {

        public void Configure(EntityTypeBuilder<Branch> builder)
        {
            builder.Property(q => q.Name)
                .IsRequired()
                .HasMaxLength(60);

            builder.Property(q => q.Code)
                .IsRequired()
                .HasMaxLength(10);

            builder.HasOne(q => q.Bank)
                .WithMany(q => q.Branches)
                .HasForeignKey(q => q.BankId)
                .HasConstraintName("FK_Branch_Bank");
        }

    }
}
