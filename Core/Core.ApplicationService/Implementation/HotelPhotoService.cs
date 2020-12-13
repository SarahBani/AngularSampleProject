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
    public class HotelPhotoService : BaseService<IHotelPhotoRepository, HotelPhoto, long>, IHotelPhotoService
    {

        #region Properties

        #endregion /Properties

        #region Constructors

        public HotelPhotoService(IEntityService entityService)
            : base(entityService)
        {
        }

        #endregion /Constructors

        #region Methods

        public Task<IList<HotelPhoto>> GetListByHotelIdAsync(long hotelId) =>
            base.GetQueryable().Where(q => q.HotelId.Equals(hotelId)).ToIListAsync();

        public Task<HotelPhoto> GetFirstByHotelIdAsync(long hotelId) =>
            base.GetQueryable().Where(q => q.HotelId.Equals(hotelId)).FirstOrDefaultAsync();

        public Task<int> GetCountByHotelIdAsync(long hotelId) =>
             base.GetQueryable().CountAsync(q => q.HotelId.Equals(hotelId));

        #endregion /Methods

    }
}
