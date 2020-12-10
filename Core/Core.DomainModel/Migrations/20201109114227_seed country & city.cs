using Microsoft.EntityFrameworkCore.Migrations;

namespace Core.DomainModel.Migrations
{
    public partial class seedcountrycity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Country",
                columns: new[] { "Id", "FlagUrl", "Name" },
                values: new object[,]
                {
                    { (short)1, "images\\countries\\Iran.png", "Iran" },
                    { (short)18, "images\\countries\\Poland.png", "Poland" },
                    { (short)17, "images\\countries\\Hungary.png", "Hungary" },
                    { (short)16, "images\\countries\\Denmark.png", "Denmark" },
                    { (short)15, "images\\countries\\Austria.png", "Austria" },
                    { (short)14, "images\\countries\\Norway.png", "Norway" },
                    { (short)13, "images\\countries\\Sweden.png", "Sweden" },
                    { (short)12, "images\\countries\\Spain.png", "Spain" },
                    { (short)11, "images\\countries\\Italy.png", "Italy" },
                    { (short)10, "images\\countries\\France.png", "France" },
                    { (short)9, "images\\countries\\Switzerland.png", "Switzerland" },
                    { (short)8, "images\\countries\\Netherlands.png", "the Netherlands" },
                    { (short)7, "images\\countries\\Germany.png", "Germany" },
                    { (short)6, "images\\countries\\Australia.png", "Australia" },
                    { (short)5, "images\\countries\\Canada.png", "Canada" },
                    { (short)4, "images\\countries\\USA.png", "the USA" },
                    { (short)3, "images\\countries\\UK.png", "the UK" },
                    { (short)2, "images\\countries\\Turkey.png", "Turkey" },
                    { (short)19, "images\\countries\\Finland.png", "Finland" },
                    { (short)30, "images\\countries\\UAE.png", "UAE" }
                });

            migrationBuilder.InsertData(
                table: "City",
                columns: new[] { "Id", "CountryId", "Name" },
                values: new object[,]
                {
                    { 1L, (short)1, "Tehran" },
                    { 2L, (short)1, "Shiraz" },
                    { 3L, (short)1, "Isfahan" },
                    { 4L, (short)1, "Tabriz" },
                    { 5L, (short)1, "Yazd" },
                    { 6L, (short)1, "Kish" },
                    { 7L, (short)1, "Mashhad" },

                    { 10L, (short)2, "Istanbul" },
                    { 11L, (short)2, "Antalya" },
                    { 12L, (short)2, "Ankara" },
                    { 13L, (short)2, "Izmir" },
                    { 14L, (short)2, "kusadasi" },

                    { 30L, (short)3, "London" },
                    { 31L, (short)3, "Manchester" },

                    { 40L, (short)4, "New York" },
                    { 41L, (short)4, "Los Angeles" },
                    { 42L, (short)4, "Chicago" },
                    { 43L, (short)4, "Washington" },

                    { 50L, (short)5, "Torento" },
                    { 51L, (short)5, "Vancouver" },
                    { 52L, (short)5, "Montreal" },

                    { 60L, (short)6, "Sydney" },
                    { 61L, (short)6, "Melbourn" },

                    { 70L, (short)7, "Munich" },
                    { 71L, (short)7, "Hamburg" },
                    { 72L, (short)7, "Berlin" },
                    { 73L, (short)7, "Cologne" },
                    { 74L, (short)7, "Frankfurt" },

                    { 80L, (short)8, "Amsterdam" },
                    { 81L, (short)8, "Rotterdam" },

                    { 90L, (short)9, "Zurich" },
                    { 91L, (short)9, "Lausanne" },
                    { 92L, (short)9, "Geneva" },
                    { 93L, (short)9, "Basel" },
                    { 94L, (short)9, "Bern" },

                    { 100L, (short)10, "Paris" },
                    { 101L, (short)10, "Nice" },

                    { 110L, (short)11, "Rome" },
                    { 111L, (short)11, "Venice" },
                    { 112L, (short)11, "Florence" },
                    { 113L, (short)11, "Milan" },

                    { 120L, (short)12, "Barcelona" },
                    { 121L, (short)12, "Madrid" },

                    { 130L, (short)13, "Stockholm" },
                    { 131L, (short)13, "Gothenburg" },

                    { 141L, (short)14, "Oslo" },

                    { 150L, (short)15, "Vienna" },
                    { 151L, (short)15, "Graz" },
                    { 152L, (short)15, "Linz" },
                    { 153L, (short)15, "Salzburg" },

                    { 160L, (short)16, "Copenhagen" },

                    { 170L, (short)17, "Budapest" },

                    { 180L, (short)18, "Warsaw" },
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM [Country]", true);
            migrationBuilder.Sql("DELETE FROM [City]", true);

            //migrationBuilder.DeleteData(
            //    table: "City",
            //    keyColumn: "Id",
            //    keyValue: 1L);

            //migrationBuilder.DeleteData(
            //    table: "City",
            //    keyColumn: "Id",
            //    keyValue: 2L);

            //migrationBuilder.DeleteData(
            //    table: "City",
            //    keyColumn: "Id",
            //    keyValue: 3L);
        }
    }
}
