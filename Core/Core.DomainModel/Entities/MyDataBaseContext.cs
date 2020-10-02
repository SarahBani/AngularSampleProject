//using Microsoft.AspNetCore.Identity;
//using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Core.DomainModel.Entities
{
    public class MyDataBaseContext : DbContext
    //IdentityDbContext<User, Role, int>
    {

        public MyDataBaseContext(DbContextOptions<MyDataBaseContext> options)
        : base(options)
        {

        }

        public DbSet<Bank> Banks { get; set; }
        public DbSet<Branch> Branches { get; set; }
        public DbSet<Country> Countries { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder); // after adding Identity this line is mandatory

            //This will singularize all table names
            foreach (IMutableEntityType entityType in modelBuilder.Model.GetEntityTypes())
            {
                entityType.SetTableName(entityType.DisplayName());
            }

            modelBuilder.ApplyConfiguration(new CountryEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new BankEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new BranchEntityTypeConfiguration());
            //modelBuilder.ApplyConfiguration(new UserEntityTypeConfiguration());
            //modelBuilder.ApplyConfiguration(new RoleEntityTypeConfiguration());

            //modelBuilder.Ignore<IdentityUserLogin<int>>();
            //modelBuilder.Ignore<IdentityUserToken<int>>();
            //modelBuilder.Ignore<IdentityRoleClaim<int>>();

            //modelBuilder.Entity<IdentityUserRole<int>>(entity =>
            //{
            //    entity.ToTable("UserRole");
            //});
            //modelBuilder.Entity<IdentityUserLogin<int>>(entity =>
            //{
            //    entity.ToTable("UserLogin");
            //});
            //modelBuilder.Entity<IdentityUserToken<int>>(entity =>
            //{
            //    entity.ToTable("UserToken");
            //});
            //modelBuilder.Entity<IdentityUserClaim<int>>(entity =>
            //{
            //    entity.ToTable("UserClaim");
            //});
            //modelBuilder.Entity<IdentityRoleClaim<int>>(entity =>
            //{
            //    entity.ToTable("RoleClaim");
            //});
        }
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

    internal class CountryEntityTypeConfiguration : IEntityTypeConfiguration<Country>
    {
        public void Configure(EntityTypeBuilder<Country> builder)
        {
            builder.Property(q => q.Name)
                .IsRequired()
                .HasMaxLength(30);
        }
    }

    //internal class RoleEntityTypeConfiguration : IEntityTypeConfiguration<Role>
    //{
    //    public void Configure(EntityTypeBuilder<Role> builder)
    //    {
    //        builder.ToTable("Role");
    //    }
    //}

    //internal class UserEntityTypeConfiguration : IEntityTypeConfiguration<User>
    //{
    //    public void Configure(EntityTypeBuilder<User> builder)
    //    {
    //        builder.ToTable("User");
    //    }
    //}

}
