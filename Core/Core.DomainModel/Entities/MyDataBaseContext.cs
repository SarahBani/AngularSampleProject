using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Core.DomainModel.Entities
{
    public class MyDataBaseContext : IdentityDbContext<User, Role, int>
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
        public DbSet<HotelPhoto> HotelPhotos { get; set; }
        public DbSet<HotelRoom> Rooms { get; set; }

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
            modelBuilder.ApplyConfiguration(new HotelPhotoEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new RoomEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new UserEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new RoleEntityTypeConfiguration());

            modelBuilder.Ignore<IdentityUserLogin<int>>();
            modelBuilder.Ignore<IdentityUserToken<int>>();
            modelBuilder.Ignore<IdentityRoleClaim<int>>();

            modelBuilder.Entity<IdentityUserRole<int>>(entity =>
            {
                entity.ToTable("UserRole");
            });
            modelBuilder.Entity<IdentityUserLogin<int>>(entity =>
            {
                entity.HasNoKey();
                entity.ToTable("UserLogin").HasNoKey();
            });
            modelBuilder.Entity<IdentityUserToken<int>>(entity =>
            {
                entity.HasNoKey();
                entity.ToTable("UserToken");
            });
            modelBuilder.Entity<IdentityUserClaim<int>>(entity =>
            {
                entity.ToTable("UserClaim");
            });
            modelBuilder.Entity<IdentityRoleClaim<int>>(entity =>
            {
                entity.ToTable("RoleClaim");
            });

            modelBuilder.Seed();
        }
    }

    public static class ModelBuilderExtensions
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {
            //string imgPath = "images\\countries\\";
            //modelBuilder.Entity<Country>().HasData(
            //    new Country { Id = 1, Name = "Iran", FlagUrl = "" },
            //    new Country { Id = 2, Name = "Turkey", FlagUrl = $"{imgPath}Turkey.png" },
            //    new Country { Id = 3, Name = "the UK", FlagUrl = $"{imgPath}UK.png" },
            //    new Country { Id = 4, Name = "the USA", FlagUrl = $"{imgPath}USA.png" },
            //    new Country { Id = 5, Name = "Canada", FlagUrl = $"{imgPath}Canada.png" },
            //    new Country { Id = 6, Name = "Australia", FlagUrl = $"{imgPath}Australia.png" },
            //    new Country { Id = 7, Name = "Germany", FlagUrl = $"{imgPath}Germany.png" },
            //    new Country { Id = 8, Name = "the Netherlands", FlagUrl = $"{imgPath}Netherlands.png" },
            //    new Country { Id = 9, Name = "Switzerland", FlagUrl = $"{imgPath}Switzerland.png" },
            //    new Country { Id = 10, Name = "France", FlagUrl = $"{imgPath}France.png" },
            //    new Country { Id = 11, Name = "Italy", FlagUrl = $"{imgPath}Italy.png" },
            //    new Country { Id = 12, Name = "Spain", FlagUrl = "" },
            //    new Country { Id = 13, Name = "Sweden", FlagUrl = $"{imgPath}Sweden.png" },
            //    new Country { Id = 14, Name = "Norway", FlagUrl = "" },
            //    new Country { Id = 15, Name = "Austria", FlagUrl = $"{imgPath}Austria.png" },
            //    new Country { Id = 16, Name = "Denmark", FlagUrl = "" },
            //    new Country { Id = 17, Name = "Hungary", FlagUrl = $"{imgPath}Hungary.png" },
            //    new Country { Id = 18, Name = "Poland", FlagUrl = "" },
            //    new Country { Id = 19, Name = "Finland", FlagUrl = "" },
            //    new Country { Id = 30, Name = "UAE", FlagUrl = "" }
            //);
            //int i = 0;
            //modelBuilder.Entity<City>().HasData(
            //    new City { Id = ++i, CountryId = 1, Name = "Tehran" },
            //    new City { Id = ++i, CountryId = 1, Name = "Shiraz" },
            //    new City { Id = ++i, CountryId = 1, Name = "Isfahan" },
            //    new City { Id = ++i, CountryId = 1, Name = "Tabriz" },
            //    new City { Id = ++i, CountryId = 1, Name = "Yazd" },
            //    new City { Id = ++i, CountryId = 1, Name = "Kish" },
            //    new City { Id = ++i, CountryId = 1, Name = "Mashhad" },

            //    new City { Id = ++i, CountryId = 2, Name = "Istanbul" },
            //    new City { Id = ++i, CountryId = 2, Name = "Izmir" }
            //);
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
