using Core.DomainModel.Entities;
using Core.DomainService;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Core.ApplicationService.Contracts
{
    public interface IHotelPhotoService
    {

        Task<HotelPhoto> GetByIdAsync(long id);

        Task<HotelPhoto> GetFirstByHotelIdAsync(long hotelId);

        Task<IList<HotelPhoto>> GetListByHotelIdAsync(long hotelId);

        Task<int> GetCountByHotelIdAsync(long hotelId);

        Task<TransactionResult> InsertAsync(HotelPhoto HotelPhoto);

        Task<TransactionResult> UpdateAsync(HotelPhoto HotelPhoto);

        Task<TransactionResult> DeleteAsync(long id);

    }
}
