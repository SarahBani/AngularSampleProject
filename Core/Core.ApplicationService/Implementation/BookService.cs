using Core.ApplicationService.Contracts;
using Core.DomainModel.Collections;
using Core.DomainService;
using Core.DomainService.Repositoy;
using System;
using System.Threading.Tasks;

namespace Core.ApplicationService.Implementation
{
    public class BookService : BaseMongoDBService<IBookRepository, Book>, IBookService
    {
        #region Properties

        #endregion /Properties

        #region Constructors

        public BookService(IBaseMongoDBRepository<Book> repository)
            : base(repository as IBookRepository)
        {
        }


        #endregion /Constructors

        #region Methods

        public Task<long> GetCountAsync()=>base.GetCountAsync();

        public override async Task<TransactionResult> UpdateAsync(Book book)
        {
            try
            {
                string prevCoverImageUrl = await this.GetCoverImageUrl(book.Id); // need to wait in order not to delete the new logo
                await base.Repository.UpdateAsync(book.Id, book.TrimCharCollectionProperties<Book>());
                if (book.CoverImageUrl != prevCoverImageUrl)
                {
                    DeleteLogoFile(prevCoverImageUrl);
                }
                return new TransactionResult();
            }
            catch (Exception ex)
            {
                return GetTransactionException(ex);
            }
        }

        public override async Task<TransactionResult> DeleteAsync(string id)
        {
            try
            {
                string prevCoverImageUrl = await this.GetCoverImageUrl(id); // need to wait in order not to delete the new logo
                await base.Repository.DeleteAsync(id);
                DeleteLogoFile(prevCoverImageUrl);
                return new TransactionResult();
            }
            catch (Exception ex)
            {
                return GetTransactionException(ex);
            }
        }

        private void DeleteLogoFile(string logoUrl)
        {
            if (!string.IsNullOrEmpty(logoUrl))
            {
                Utility.DeleteFile(logoUrl);
            }
        }

        private async Task<string> GetCoverImageUrl(string id) =>
            (await base.GetByIdAsync(id)).CoverImageUrl;


        #endregion /Methods

    }
}
