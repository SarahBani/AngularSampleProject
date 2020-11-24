using Core.DomainModel.Entities;
using Core.DomainService;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Core.ApplicationService.Contracts
{
    public interface ICityService
    {

        Task<City> GetByIdAsync(long id);

        Task<IList<City>> GetAllAsync();

        Task<IList<City>> GetListByCountryIdAsync(short countryId);

        Task<int> GetCountByCountryIdAsync(short countryId);

    }
}
