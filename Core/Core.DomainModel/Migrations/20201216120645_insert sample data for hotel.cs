using Microsoft.EntityFrameworkCore.Migrations;

namespace Core.DomainModel.Migrations
{
    public partial class insertsampledataforhotel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            string sql = @"
SET IDENTITY_INSERT [dbo].[Hotel] ON 
GO
INSERT [dbo].[Hotel] ([Id], [Name], [CityId], [Stars], [Address]) VALUES (50, N'The Istanbul Hotel', 10, 5, N'')
GO
INSERT [dbo].[Hotel] ([Id], [Name], [CityId], [Stars], [Address]) VALUES (51, N'Hotel Dariush', 6, 5, N'')
GO
INSERT [dbo].[Hotel] ([Id], [Name], [CityId], [Stars], [Address]) VALUES (52, N'The Saint Hotel', 201, 5, N'')
GO
INSERT [dbo].[Hotel] ([Id], [Name], [CityId], [Stars], [Address]) VALUES (53, N'Hotel Rialto', 111, 4, N'')
GO
INSERT [dbo].[Hotel] ([Id], [Name], [CityId], [Stars], [Address]) VALUES (54, N'Giessbach Hotel', 90, 5, N'')
GO
INSERT [dbo].[Hotel] ([Id], [Name], [CityId], [Stars], [Address]) VALUES (55, N'Adventure Cabins', 153, 0, N'')
GO
INSERT [dbo].[Hotel] ([Id], [Name], [CityId], [Stars], [Address]) VALUES (56, N'Chalet Tré la Vieux', 101, 4, N'')
GO
SET IDENTITY_INSERT [dbo].[Hotel] OFF
GO
SET IDENTITY_INSERT [dbo].[HotelPhoto] ON 
GO
INSERT [dbo].[HotelPhoto] ([Id], [HotelId], [PhotoUrl]) VALUES (28, 50, N'Resources\Images\Hotels\50\6b11e240-fb57-410c-ada0-46ce86ac4e41.jpg')
GO
INSERT [dbo].[HotelPhoto] ([Id], [HotelId], [PhotoUrl]) VALUES (29, 50, N'Resources\Images\Hotels\50\cbff077a-1512-41ee-ba9b-bd5d92e19fb1.jpg')
GO
INSERT [dbo].[HotelPhoto] ([Id], [HotelId], [PhotoUrl]) VALUES (30, 51, N'Resources\Images\Hotels\51\0695b32b-626f-4b99-a06f-6e469e1ad8de.jpg')
GO
INSERT [dbo].[HotelPhoto] ([Id], [HotelId], [PhotoUrl]) VALUES (31, 51, N'Resources\Images\Hotels\51\ffdd656e-18c0-44d7-9d82-ed52f95b4a49.jpeg')
GO
INSERT [dbo].[HotelPhoto] ([Id], [HotelId], [PhotoUrl]) VALUES (32, 51, N'Resources\Images\Hotels\51\1619c554-428a-49cd-8187-0b9695a00c3b.jpeg')
GO
INSERT [dbo].[HotelPhoto] ([Id], [HotelId], [PhotoUrl]) VALUES (33, 52, N'Resources\Images\Hotels\52\5957832b-a8da-43fe-82c3-47810dffccbb.jpg')
GO
INSERT [dbo].[HotelPhoto] ([Id], [HotelId], [PhotoUrl]) VALUES (34, 52, N'Resources\Images\Hotels\52\291d97ae-6e30-4ebe-b2a8-d340cadaf80e.jpg')
GO
INSERT [dbo].[HotelPhoto] ([Id], [HotelId], [PhotoUrl]) VALUES (35, 52, N'Resources\Images\Hotels\52\51a2f3af-5625-417b-b54c-a70b69fafaae.jpg')
GO
INSERT [dbo].[HotelPhoto] ([Id], [HotelId], [PhotoUrl]) VALUES (36, 53, N'Resources\Images\Hotels\53\8ca22c59-ff13-464d-bbf8-caec232cd3ee.png')
GO
INSERT [dbo].[HotelPhoto] ([Id], [HotelId], [PhotoUrl]) VALUES (37, 53, N'Resources\Images\Hotels\53\2effe151-3ea5-4dc6-b926-5e458b7f130d.jpg')
GO
INSERT [dbo].[HotelPhoto] ([Id], [HotelId], [PhotoUrl]) VALUES (38, 54, N'Resources\Images\Hotels\54\fca7a108-3e2a-4ba6-a67a-71a98769f724.jpg')
GO
INSERT [dbo].[HotelPhoto] ([Id], [HotelId], [PhotoUrl]) VALUES (39, 54, N'Resources\Images\Hotels\54\39a7be13-152e-4a06-9912-c2ea15ad6606.jpg')
GO
INSERT [dbo].[HotelPhoto] ([Id], [HotelId], [PhotoUrl]) VALUES (40, 54, N'Resources\Images\Hotels\54\1627ef6b-0bac-4b73-8633-e5611a00524c.jpg')
GO
INSERT [dbo].[HotelPhoto] ([Id], [HotelId], [PhotoUrl]) VALUES (41, 56, N'Resources\Images\Hotels\56\4ac335f4-6e5f-4bd6-ab40-6fbba0f88c31.jpg')
GO
INSERT [dbo].[HotelPhoto] ([Id], [HotelId], [PhotoUrl]) VALUES (42, 56, N'Resources\Images\Hotels\56\99c89ba2-c9cb-4770-9019-382a62f1f9bb.jpg')
GO
INSERT [dbo].[HotelPhoto] ([Id], [HotelId], [PhotoUrl]) VALUES (43, 56, N'Resources\Images\Hotels\56\958005ce-44af-4ded-b2f0-1c28086f1b65.jpg')
GO
INSERT [dbo].[HotelPhoto] ([Id], [HotelId], [PhotoUrl]) VALUES (44, 56, N'Resources\Images\Hotels\56\47a9210e-80bb-4409-b797-69003da39f11.jpg')
GO
INSERT [dbo].[HotelPhoto] ([Id], [HotelId], [PhotoUrl]) VALUES (45, 55, N'Resources\Images\Hotels\55\f68ba108-5daa-4514-bc2c-557add6fd357.jpg')
GO
INSERT [dbo].[HotelPhoto] ([Id], [HotelId], [PhotoUrl]) VALUES (46, 55, N'Resources\Images\Hotels\55\b4fe0a0c-1445-4597-8ac3-ed8442c6207e.jpg')
GO
INSERT [dbo].[HotelPhoto] ([Id], [HotelId], [PhotoUrl]) VALUES (47, 55, N'Resources\Images\Hotels\55\a5d7756d-ee95-4be1-bd8a-e8f7117b4df8.jpg')
GO
INSERT [dbo].[HotelPhoto] ([Id], [HotelId], [PhotoUrl]) VALUES (48, 55, N'Resources\Images\Hotels\55\ca3b5fd7-7eb9-4485-920e-2049796ada99.jpg')
GO
SET IDENTITY_INSERT [dbo].[HotelPhoto] OFF
GO
";
            migrationBuilder.Sql(sql);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM [Hotel]", true);
            migrationBuilder.Sql("DELETE FROM [HotelPhoto]", true);
        }
    }
}
