using Microsoft.EntityFrameworkCore.Migrations;

namespace Core.DomainModel.Migrations
{
    public partial class UpdateHotelRoom : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Room");

            migrationBuilder.CreateTable(
                name: "HotelRoom",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    HotelId = table.Column<long>(nullable: false),
                    Name = table.Column<string>(maxLength: 50, nullable: false),
                    Number = table.Column<short>(nullable: false),
                    Capacity = table.Column<byte>(nullable: false),
                    Facilities = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HotelRoom", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HotelRoom_Hotel",
                        column: x => x.HotelId,
                        principalTable: "Hotel",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_HotelRoom_HotelId",
                table: "HotelRoom",
                column: "HotelId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HotelRoom");

            migrationBuilder.CreateTable(
                name: "Room",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Facilities = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HotelId = table.Column<long>(type: "bigint", nullable: false),
                    MaxCapacity = table.Column<byte>(type: "tinyint", nullable: true),
                    MinCapacity = table.Column<byte>(type: "tinyint", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Room", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Room_Hotel",
                        column: x => x.HotelId,
                        principalTable: "Hotel",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Room_HotelId",
                table: "Room",
                column: "HotelId");
        }
    }
}
