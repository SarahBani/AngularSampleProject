using Core.ApplicationService.Contracts;
using Core.DomainModel.Entities;
using Core.DomainService;
using Core.DomainService.Repositoy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.ApplicationService.Implementation
{
    public class CountryService : BaseReadOnlyService<ICountryRepository, Country, short>, ICountryService
    {

        #region Properties

        #endregion /Properties

        #region Constructors

        public CountryService(IEntityService entityService)
            : base(entityService)
        {
        }

        #endregion /Constructors

        #region Methods

        public override Task<IList<Country>> GetAllAsync() =>
            base.GetQueryable().OrderBy(q => q.Name).ToIListAsync();

        public Task<int> GetCountAsync() => base.GetCountAsync();

        #endregion /Methods

    }
}
