using Core.DomainModel.Entities;
using Core.DomainService.Repositoy;
using Infrastructure.DataBase.Repositoy;

namespace Infrastructure.DataBase.Repository
{
    public class HotelRoomRepository : BaseRepository<HotelRoom, long>, IHotelRoomRepository
    {
        public HotelRoomRepository(MyDataBaseContext dbContext)
            : base(dbContext)
        {

        }
    }
}
