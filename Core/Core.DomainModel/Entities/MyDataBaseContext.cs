//using Microsoft.AspNetCore.Identity;
//using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

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
        public DbSet<Country> Cities { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<Hotel> Hotels { get; set; }
        public DbSet<Room> Rooms { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder); // after adding Identity this line is mandatory

            //This will singularize all table names
            foreach (IMutableEntityType entityType in modelBuilder.Model.GetEntityTypes())
            {
                entityType.SetTableName(entityType.DisplayName());
            }

            modelBuilder.ApplyConfiguration(new CountryEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new CityEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new BankEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new BranchEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new HotelEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new RoomEntityTypeConfiguration());
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
