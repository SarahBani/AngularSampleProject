using Core.DomainModel.Collections;
using Core.DomainService;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Core.ApplicationService.Contracts
{
    public interface IBookService
    {
        Task<Book> GetByIdAsync(string id);

        Task<long> GetCountAsync();

        Task<IList<Book>> GetAllAsync();

        Task<TransactionResult> InsertAsync(Book book);

        Task<TransactionResult> UpdateAsync(Book book);

        Task<TransactionResult> DeleteAsync(string id);

    }
}
