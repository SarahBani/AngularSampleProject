using Core.DomainModel.Entities;
using Core.DomainService.Repositoy;
using Infrastructure.DataBase.Repositoy;

namespace Infrastructure.DataBase.Repository
{
    public class CityRepository : BaseRepository<City, long>, ICityRepository
    {
        public CityRepository(MyDataBaseContext dbContext)
            : base(dbContext)
        {

        }
    }
}
