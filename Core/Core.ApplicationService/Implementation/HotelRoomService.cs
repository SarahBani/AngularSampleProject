using Core.ApplicationService.Contracts;
using Core.DomainModel.Entities;
using Core.DomainService;
using Core.DomainService.Repositoy;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.ApplicationService.Implementation
{
    public class HotelRoomService : BaseService<IHotelRoomRepository, HotelRoom, long>, IHotelRoomService
    {

        #region Properties

        #endregion /Properties

        #region Constructors

        public HotelRoomService(IEntityService entityService)
            : base(entityService)
        {
        }

        #endregion /Constructors

        #region Methods

        public Task<IList<HotelRoom>> GetListByHotelIdAsync(long hotelId) =>
            base.GetQueryable().Where(q => q.HotelId.Equals(hotelId)).ToIListAsync();

        public Task<int> GetCountByHotelIdAsync(long hotelId) =>
             base.GetQueryable().CountAsync(q => q.HotelId.Equals(hotelId));

        #endregion /Methods

    }
}
