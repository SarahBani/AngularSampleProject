using Microsoft.EntityFrameworkCore.Migrations;

namespace Core.DomainModel.Migrations
{
    public partial class removeIdentityfromIdincountry : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
			//migrationBuilder.AlterColumn<short>(
			//    name: "Id",
			//    table: "Country",
			//    nullable: false,
			//    oldClrType: typeof(short),
			//    oldType: "smallint")
			//    .OldAnnotation("SqlServer:Identity", "1, 1");

			string sql = @"
/* To prevent any potential data loss issues, you should review this script in detail before running it outside the context of the database designer.*/
BEGIN TRANSACTION
SET QUOTED_IDENTIFIER ON
SET ARITHABORT ON
SET NUMERIC_ROUNDABORT OFF
SET CONCAT_NULL_YIELDS_NULL ON
SET ANSI_NULLS ON
SET ANSI_PADDING ON
SET ANSI_WARNINGS ON
COMMIT
BEGIN TRANSACTION
GO
CREATE TABLE dbo.Tmp_Country
	(
	Id smallint NOT NULL,
	Name nvarchar(40) NOT NULL,
	FlagUrl nvarchar(MAX) NULL
	)  ON [PRIMARY]
	 TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE dbo.Tmp_Country SET (LOCK_ESCALATION = TABLE)
GO
IF EXISTS(SELECT * FROM dbo.Country)
	 EXEC('INSERT INTO dbo.Tmp_Country (Id, Name, FlagUrl)
		SELECT Id, Name, FlagUrl FROM dbo.Country WITH (HOLDLOCK TABLOCKX)')
GO
ALTER TABLE dbo.City
	DROP CONSTRAINT FK_City_Country
GO
DROP TABLE dbo.Country
GO
EXECUTE sp_rename N'dbo.Tmp_Country', N'Country', 'OBJECT' 
GO
ALTER TABLE dbo.Country ADD CONSTRAINT
	PK_Country PRIMARY KEY CLUSTERED 
	(
	Id
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

GO
CREATE UNIQUE NONCLUSTERED INDEX IX_Country_Name ON dbo.Country
	(
	Name
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
COMMIT
BEGIN TRANSACTION
GO
ALTER TABLE dbo.City ADD CONSTRAINT
	FK_City_Country FOREIGN KEY
	(
	CountryId
	) REFERENCES dbo.Country
	(
	Id
	) ON UPDATE  NO ACTION 
	 ON DELETE  CASCADE 
	
GO
ALTER TABLE dbo.City SET (LOCK_ESCALATION = TABLE)
GO
COMMIT
                ";
			migrationBuilder.Sql(sql);
		}

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<short>(
                name: "Id",
                table: "Country",
                type: "smallint",
                nullable: false,
                oldClrType: typeof(short))
                .Annotation("SqlServer:Identity", "1, 1");
        }
    }
}
