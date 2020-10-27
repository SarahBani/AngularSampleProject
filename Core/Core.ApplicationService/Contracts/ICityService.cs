using Core.DomainModel.Entities;
using Core.DomainService;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Core.ApplicationService.Contracts
{
    public interface ICityService
    {

        Task<City> GetByIdAsync(long id);

        Task<IList<City>> GetListByCountryIdAsync(short countryId);

        Task<int> GetCountByCountryIdAsync(short countryId);

        Task<TransactionResult> InsertAsync(City city);

        Task<TransactionResult> UpdateAsync(City city);

        Task<TransactionResult> DeleteAsync(long id);

        Task<TransactionResult> DeleteByCountryIdAsync(short countryId);

    }
}
