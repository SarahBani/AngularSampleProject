using Microsoft.EntityFrameworkCore.Migrations;

namespace Core.DomainModel.Migrations
{
    public partial class Bankdatascript : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            string sql = @"
                SET IDENTITY_INSERT [dbo].[Bank] ON 
                GO
                INSERT [dbo].[Bank] ([Id], [Name], [Grade], [LogoUrl]) VALUES (10, N'BNP Paribas', NULL, N'Resources\Images\Banks\e2f3de14-fe0d-435b-bb5e-3877701d0910.jpg')
                GO
                INSERT [dbo].[Bank] ([Id], [Name], [Grade], [LogoUrl]) VALUES (11, N'Barcley', NULL, N'Resources\Images\Banks\c47cca6d-1fc9-4603-b2a9-fec4953edcbc.jpg')
                GO
                INSERT [dbo].[Bank] ([Id], [Name], [Grade], [LogoUrl]) VALUES (12, N'Citi', NULL, N'Resources\Images\Banks\59a18139-c191-48d2-aa7b-1910c1a105bd.png')
                GO
                INSERT [dbo].[Bank] ([Id], [Name], [Grade], [LogoUrl]) VALUES (20, N'Deutsche Bank', NULL, N'Resources\Images\Banks\df459fa2-2d7b-4d61-8c59-ec5eb1a68fbe.png')
                GO
                INSERT [dbo].[Bank] ([Id], [Name], [Grade], [LogoUrl]) VALUES (27, N'Capital One 360', NULL, N'Resources\Images\Banks\cap_3a43.png')
                GO
                INSERT [dbo].[Bank] ([Id], [Name], [Grade], [LogoUrl]) VALUES (67, N'HSBC', NULL, N'Resources\Images\Banks\08a886d6-6265-4e98-8bbf-1ac7796cc4f2.png')
                GO
                INSERT [dbo].[Bank] ([Id], [Name], [Grade], [LogoUrl]) VALUES (80, N'dddddddddd', NULL, NULL)
                GO
                INSERT [dbo].[Bank] ([Id], [Name], [Grade], [LogoUrl]) VALUES (87, N'3333333', NULL, NULL)
                GO
                SET IDENTITY_INSERT [dbo].[Bank] OFF
                GO
                SET IDENTITY_INSERT [dbo].[Branch] ON 
                GO
                INSERT [dbo].[Branch] ([Id], [BankId], [Name], [Code], [Address]) VALUES (6, 12, N'Branch 1', N'454', N'111')
                GO
                INSERT [dbo].[Branch] ([Id], [BankId], [Name], [Code], [Address]) VALUES (8, 12, N'Branch 2', N'212a2', N'sssssss')
                GO
                INSERT [dbo].[Branch] ([Id], [BankId], [Name], [Code], [Address]) VALUES (9, 11, N'Barcley Branch 1', N'11-Vdf', N'22222222')
                GO
                INSERT [dbo].[Branch] ([Id], [BankId], [Name], [Code], [Address]) VALUES (10, 11, N'Branch 2', N'222r', N'aaaaaa')
                GO
                INSERT [dbo].[Branch] ([Id], [BankId], [Name], [Code], [Address]) VALUES (23, 87, N'ffgtfg', N'try', N'')
                GO
                SET IDENTITY_INSERT [dbo].[Branch] OFF
                GO
                ";
            migrationBuilder.Sql(sql);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            string sql = @"
                DELETE dbo.Bank";
            migrationBuilder.Sql(sql);
        }
    }
}
