﻿using Microsoft.EntityFrameworkCore.Migrations;

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
                    { 8L, (short)2, "Istanbul" },
                    { 9L, (short)2, "Izmir" },

                    { 10L, (short)3, "London" },

                    { 11L, (short)4, "New York" },
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "City",
                keyColumn: "Id",
                keyValue: 1L);

            migrationBuilder.DeleteData(
                table: "City",
                keyColumn: "Id",
                keyValue: 2L);

            migrationBuilder.DeleteData(
                table: "City",
                keyColumn: "Id",
                keyValue: 3L);

            migrationBuilder.DeleteData(
                table: "City",
                keyColumn: "Id",
                keyValue: 4L);

            migrationBuilder.DeleteData(
                table: "City",
                keyColumn: "Id",
                keyValue: 5L);

            migrationBuilder.DeleteData(
                table: "City",
                keyColumn: "Id",
                keyValue: 6L);

            migrationBuilder.DeleteData(
                table: "City",
                keyColumn: "Id",
                keyValue: 7L);

            migrationBuilder.DeleteData(
                table: "City",
                keyColumn: "Id",
                keyValue: 8L);

            migrationBuilder.DeleteData(
                table: "City",
                keyColumn: "Id",
                keyValue: 9L);

            migrationBuilder.DeleteData(
                table: "Country",
                keyColumn: "Id",
                keyValue: (short)3);

            migrationBuilder.DeleteData(
                table: "Country",
                keyColumn: "Id",
                keyValue: (short)4);

            migrationBuilder.DeleteData(
                table: "Country",
                keyColumn: "Id",
                keyValue: (short)5);

            migrationBuilder.DeleteData(
                table: "Country",
                keyColumn: "Id",
                keyValue: (short)6);

            migrationBuilder.DeleteData(
                table: "Country",
                keyColumn: "Id",
                keyValue: (short)7);

            migrationBuilder.DeleteData(
                table: "Country",
                keyColumn: "Id",
                keyValue: (short)8);

            migrationBuilder.DeleteData(
                table: "Country",
                keyColumn: "Id",
                keyValue: (short)9);

            migrationBuilder.DeleteData(
                table: "Country",
                keyColumn: "Id",
                keyValue: (short)10);

            migrationBuilder.DeleteData(
                table: "Country",
                keyColumn: "Id",
                keyValue: (short)11);

            migrationBuilder.DeleteData(
                table: "Country",
                keyColumn: "Id",
                keyValue: (short)12);

            migrationBuilder.DeleteData(
                table: "Country",
                keyColumn: "Id",
                keyValue: (short)13);

            migrationBuilder.DeleteData(
                table: "Country",
                keyColumn: "Id",
                keyValue: (short)14);

            migrationBuilder.DeleteData(
                table: "Country",
                keyColumn: "Id",
                keyValue: (short)15);

            migrationBuilder.DeleteData(
                table: "Country",
                keyColumn: "Id",
                keyValue: (short)16);

            migrationBuilder.DeleteData(
                table: "Country",
                keyColumn: "Id",
                keyValue: (short)17);

            migrationBuilder.DeleteData(
                table: "Country",
                keyColumn: "Id",
                keyValue: (short)18);

            migrationBuilder.DeleteData(
                table: "Country",
                keyColumn: "Id",
                keyValue: (short)19);

            migrationBuilder.DeleteData(
                table: "Country",
                keyColumn: "Id",
                keyValue: (short)30);

            migrationBuilder.DeleteData(
                table: "Country",
                keyColumn: "Id",
                keyValue: (short)1);

            migrationBuilder.DeleteData(
                table: "Country",
                keyColumn: "Id",
                keyValue: (short)2);
        }
    }
}
