using Core.ApplicationService.Contracts;
using Core.DomainModel.Collections;
using Core.DomainService;
using Core.DomainService.Repositoy;
using System;
using System.Collections.Generic;
using System.Linq;
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

        public Task<long> GetCountAsync() => base.GetCountAsync();

        public override async Task<TransactionResult> InsertAsync(Book book)
        {
            SetCommentsCreatedDateTime(book);
            return await base.InsertAsync(book);
        }

        public override async Task<TransactionResult> UpdateAsync(Book book)
        {
            try
            {
                SetCommentsCreatedDateTime(book);
                string prevCoverImageUrl = await this.GetCoverImageUrl(book.Id); // need to wait in order not to delete the new logo
                await base.Repository.UpdateAsync(book.Id, book.TrimCharProperties());
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

        public async Task<TransactionResult> InsertCommentAsync(string id, BookComment bookComment)
        {
            try
            {
                SetCommentsCreatedDateTime(bookComment);
                var book = await GetByIdAsync(id);
                var comments = book.Comments;
                if (comments == null)
                {
                    comments = new List<BookComment>();
                }
                Utility.TrimCharProperties(typeof(BookComment), bookComment);
                comments.Add(bookComment);
                await base.Repository.UpdateAsync(book.Id, book);
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

        private void SetCommentsCreatedDateTime(Book book)
        {
            foreach (var bookComment in book.Comments
                .Where(q => q.CreatedDateTime.Equals(DateTime.MinValue)))
            {
                SetCommentsCreatedDateTime(bookComment);
            }
        }

        private void SetCommentsCreatedDateTime(BookComment bookComment)
        {
            bookComment.CreatedDateTime = DateTime.Now;
        }

        #endregion /Methods

    }
}
