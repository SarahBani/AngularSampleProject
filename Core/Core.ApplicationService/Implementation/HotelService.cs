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
    public class HotelService : BaseService<IHotelRepository, Hotel, long>, IHotelService
    {

        #region Properties

        #endregion /Properties

        #region Constructors

        public HotelService(IEntityService entityService)
            : base(entityService)
        {
        }

        #endregion /Constructors

        #region Methods

        public override Task<IList<Hotel>> GetAllAsync() =>
            base.GetQueryable().Include(q => q.City).Include(q => q.City.Country).ToIListAsync();

        public override Task<Hotel> GetByIdAsync(long id) =>
           base.GetQueryable().Include(q => q.City).Include(q => q.City.Country).Include(q=>q.Photos)
            .SingleAsync(q=>q.Id == id);

        public Task<int> GetCountAsync() => base.GetQueryable().CountAsync();

        public Task<IList<Hotel>> GetListByCityIdAsync(long cityId) =>
            base.GetQueryable().Where(q => q.CityId.Equals(cityId)).ToIListAsync();

        public Task<int> GetCountByCityIdAsync(long cityId) =>
             base.GetQueryable().CountAsync(q => q.CityId.Equals(cityId));

        #endregion /Methods

    }
}
