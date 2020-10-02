using Core.DomainModel.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Core.DomainModel
{
    public class MyDataBaseContextFactory : IDesignTimeDbContextFactory<MyDataBaseContext>
    {

        public MyDataBaseContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<MyDataBaseContext>();
            optionsBuilder.UseSqlServer("Server=.;Database=AngularSample;User ID=sa;Password=sa123;");

            return new MyDataBaseContext(optionsBuilder.Options);
        }

    }
}
