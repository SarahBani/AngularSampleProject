using Microsoft.EntityFrameworkCore.Migrations;

namespace Core.DomainModel.Migrations
{
    public partial class addrolestotable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            string sql = @"
INSERT INTO dbo.[Role] (Name, NormalizedName)
SELECT 'Admin', 'ADMIN'
UNION
SELECT 'Manager', 'MANAGER'
UNION
SELECT 'Employee', 'EMPLOYEE'
UNION
SELECT 'Member', 'MEMBER'
";
            migrationBuilder.Sql(sql);
    }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            string sql = @"DELETE dbo.[Role]";
            migrationBuilder.Sql(sql);
        }
    }
}
