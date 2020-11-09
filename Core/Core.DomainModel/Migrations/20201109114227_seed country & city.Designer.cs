﻿// <auto-generated />
using Core.DomainModel.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Core.DomainModel.Migrations
{
    [DbContext(typeof(MyDataBaseContext))]
    [Migration("20201109114227_seed country & city")]
    partial class seedcountrycity
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Core.DomainModel.Entities.Bank", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<byte?>("Grade")
                        .HasColumnType("tinyint");

                    b.Property<string>("LogoUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(40)")
                        .HasMaxLength(40);

                    b.HasKey("Id");

                    b.ToTable("Bank");
                });

            modelBuilder.Entity("Core.DomainModel.Entities.Branch", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("BankId")
                        .HasColumnType("int");

                    b.Property<string>("Code")
                        .IsRequired()
                        .HasColumnType("nvarchar(10)")
                        .HasMaxLength(10);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(60)")
                        .HasMaxLength(60);

                    b.HasKey("Id");

                    b.HasIndex("BankId");

                    b.ToTable("Branch");
                });

            modelBuilder.Entity("Core.DomainModel.Entities.City", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<short>("CountryId")
                        .HasColumnType("smallint");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.HasKey("Id");

                    b.HasIndex("CountryId", "Name")
                        .IsUnique();

                    b.ToTable("City");

                    b.HasData(
                        new
                        {
                            Id = 1L,
                            CountryId = (short)1,
                            Name = "Tehran"
                        },
                        new
                        {
                            Id = 2L,
                            CountryId = (short)1,
                            Name = "Shiraz"
                        },
                        new
                        {
                            Id = 3L,
                            CountryId = (short)1,
                            Name = "Isfahan"
                        },
                        new
                        {
                            Id = 4L,
                            CountryId = (short)1,
                            Name = "Tabriz"
                        },
                        new
                        {
                            Id = 5L,
                            CountryId = (short)1,
                            Name = "Yazd"
                        },
                        new
                        {
                            Id = 6L,
                            CountryId = (short)1,
                            Name = "Kish"
                        },
                        new
                        {
                            Id = 7L,
                            CountryId = (short)1,
                            Name = "Mashhad"
                        },
                        new
                        {
                            Id = 8L,
                            CountryId = (short)2,
                            Name = "Istanbul"
                        },
                        new
                        {
                            Id = 9L,
                            CountryId = (short)2,
                            Name = "Izmir"
                        });
                });

            modelBuilder.Entity("Core.DomainModel.Entities.Country", b =>
                {
                    b.Property<short>("Id")
                        .HasColumnType("smallint");

                    b.Property<string>("FlagUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(40)")
                        .HasMaxLength(40);

                    b.HasKey("Id");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.ToTable("Country");

                    b.HasData(
                        new
                        {
                            Id = (short)1,
                            FlagUrl = "",
                            Name = "Iran"
                        },
                        new
                        {
                            Id = (short)2,
                            FlagUrl = "images\\countries\\Turkey.png",
                            Name = "Turkey"
                        },
                        new
                        {
                            Id = (short)3,
                            FlagUrl = "images\\countries\\UK.png",
                            Name = "the UK"
                        },
                        new
                        {
                            Id = (short)4,
                            FlagUrl = "images\\countries\\USA.png",
                            Name = "the USA"
                        },
                        new
                        {
                            Id = (short)5,
                            FlagUrl = "images\\countries\\Canada.png",
                            Name = "Canada"
                        },
                        new
                        {
                            Id = (short)6,
                            FlagUrl = "images\\countries\\Australia.png",
                            Name = "Australia"
                        },
                        new
                        {
                            Id = (short)7,
                            FlagUrl = "images\\countries\\Germany.png",
                            Name = "Germany"
                        },
                        new
                        {
                            Id = (short)8,
                            FlagUrl = "images\\countries\\Netherlands.png",
                            Name = "the Netherlands"
                        },
                        new
                        {
                            Id = (short)9,
                            FlagUrl = "images\\countries\\Switzerland.png",
                            Name = "Switzerland"
                        },
                        new
                        {
                            Id = (short)10,
                            FlagUrl = "images\\countries\\France.png",
                            Name = "France"
                        },
                        new
                        {
                            Id = (short)11,
                            FlagUrl = "images\\countries\\Italy.png",
                            Name = "Italy"
                        },
                        new
                        {
                            Id = (short)12,
                            FlagUrl = "",
                            Name = "Spain"
                        },
                        new
                        {
                            Id = (short)13,
                            FlagUrl = "images\\countries\\Sweden.png",
                            Name = "Sweden"
                        },
                        new
                        {
                            Id = (short)14,
                            FlagUrl = "",
                            Name = "Norway"
                        },
                        new
                        {
                            Id = (short)15,
                            FlagUrl = "images\\countries\\Austria.png",
                            Name = "Austria"
                        },
                        new
                        {
                            Id = (short)16,
                            FlagUrl = "",
                            Name = "Denmark"
                        },
                        new
                        {
                            Id = (short)17,
                            FlagUrl = "images\\countries\\Hungary.png",
                            Name = "Hungary"
                        },
                        new
                        {
                            Id = (short)18,
                            FlagUrl = "",
                            Name = "Poland"
                        },
                        new
                        {
                            Id = (short)19,
                            FlagUrl = "",
                            Name = "Finland"
                        },
                        new
                        {
                            Id = (short)30,
                            FlagUrl = "",
                            Name = "UAE"
                        });
                });

            modelBuilder.Entity("Core.DomainModel.Entities.Hotel", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<long>("CityId")
                        .HasColumnType("bigint");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)")
                        .HasMaxLength(100);

                    b.Property<byte>("Stars")
                        .HasColumnType("tinyint");

                    b.HasKey("Id");

                    b.HasIndex("CityId");

                    b.ToTable("Hotel");
                });

            modelBuilder.Entity("Core.DomainModel.Entities.HotelRoom", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<byte>("Capacity")
                        .HasColumnType("tinyint");

                    b.Property<string>("Facilities")
                        .HasColumnType("nvarchar(max)");

                    b.Property<long>("HotelId")
                        .HasColumnType("bigint");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.Property<short>("Number")
                        .HasColumnType("smallint");

                    b.HasKey("Id");

                    b.HasIndex("HotelId");

                    b.ToTable("HotelRoom");
                });

            modelBuilder.Entity("Core.DomainModel.Entities.Branch", b =>
                {
                    b.HasOne("Core.DomainModel.Entities.Bank", "Bank")
                        .WithMany("Branches")
                        .HasForeignKey("BankId")
                        .HasConstraintName("FK_Branch_Bank")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();
                });

            modelBuilder.Entity("Core.DomainModel.Entities.City", b =>
                {
                    b.HasOne("Core.DomainModel.Entities.Country", "Country")
                        .WithMany("Cities")
                        .HasForeignKey("CountryId")
                        .HasConstraintName("FK_City_Country")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Core.DomainModel.Entities.Hotel", b =>
                {
                    b.HasOne("Core.DomainModel.Entities.City", "City")
                        .WithMany("Hotels")
                        .HasForeignKey("CityId")
                        .HasConstraintName("FK_Hotel_City")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Core.DomainModel.Entities.HotelRoom", b =>
                {
                    b.HasOne("Core.DomainModel.Entities.Hotel", "Hotel")
                        .WithMany("HotelRooms")
                        .HasForeignKey("HotelId")
                        .HasConstraintName("FK_HotelRoom_Hotel")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
