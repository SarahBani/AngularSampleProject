using Core.ApplicationService.Contracts;
using Core.DomainModel.Entities;
using Core.DomainService;
using Core.DomainService.Repositoy;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.ApplicationService.Implementation
{
    public class CityService : BaseReadOnlyService<ICityRepository, City, long>, ICityService
    {

        #region Properties

        #endregion /Properties

        #region Constructors

        public CityService(IEntityService entityService)
            : base(entityService)
        {
        }

        #endregion /Constructors

        #region Methods

        public Task<IList<City>> GetListByCountryIdAsync(short countryId) =>
            base.GetQueryable().Where(q => q.CountryId.Equals(countryId)).ToIListAsync();

        public Task<int> GetCountByCountryIdAsync(short countryId) =>
             base.GetQueryable().CountAsync(q => q.CountryId.Equals(countryId));

        #endregion /Methods

    }
}
