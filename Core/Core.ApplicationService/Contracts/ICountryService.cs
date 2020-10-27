using Core.DomainModel.Entities;
using Core.DomainService;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Core.ApplicationService.Contracts
{
    public interface ICountryService
    {

        Task<Country> GetByIdAsync(short id);

        Task<int> GetCountAsync();

        Task<IList<Country>> GetAllAsync();

        Task<TransactionResult> InsertAsync(Country country);

        Task<TransactionResult> UpdateAsync(Country country);

        Task<TransactionResult> DeleteAsync(short id);

    }
}
