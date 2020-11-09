using Core.DomainModel.Entities;
using Core.DomainService;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Core.ApplicationService.Contracts
{
    public interface IHotelService
    {

        Task<Hotel> GetByIdAsync(long id);

        Task<IList<Hotel>> GetAllAsync();

        Task<int> GetCountAsync();

        Task<IList<Hotel>> GetListByCityIdAsync(long cityId);

        Task<int> GetCountByCityIdAsync(long cityId);

        Task<TransactionResult> InsertAsync(Hotel hotel);

        Task<TransactionResult> UpdateAsync(Hotel hotel);

        Task<TransactionResult> DeleteAsync(long id);

    }
}
