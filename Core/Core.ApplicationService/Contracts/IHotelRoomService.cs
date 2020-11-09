using Core.DomainModel.Entities;
using Core.DomainService;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Core.ApplicationService.Contracts
{
    public interface IHotelRoomService
    {

        Task<HotelRoom> GetByIdAsync(long id);

        Task<IList<HotelRoom>> GetListByHotelIdAsync(long hotelId);

        Task<int> GetCountByHotelIdAsync(long hotelId);

        Task<TransactionResult> InsertAsync(HotelRoom hotelRoom);

        Task<TransactionResult> UpdateAsync(HotelRoom hotelRoom);

        Task<TransactionResult> DeleteAsync(long id);

    }
}
