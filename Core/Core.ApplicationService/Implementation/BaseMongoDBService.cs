using Core.DomainModel;
using Core.DomainModel.Collections;
using Core.DomainService;
using Core.DomainService.Repositoy;
using System;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Core.ApplicationService.Implementation
{
    public abstract class BaseMongoDBService<TRepository, TCollection> : BaseReadOnlyMongoDBService<TRepository, TCollection>
       where TRepository : IBaseMongoDBRepository<TCollection>
       where TCollection : BaseCollection
    {

        #region Properties

        #endregion /Properties

        #region Constructors

        protected BaseMongoDBService(TRepository repository) : base(repository)
        {
        }

        #endregion /Constructors

        #region Methods

        protected async Task<TransactionResult> GetTransactionResultAsync(Func<Task> actionAsync)
        {
            await actionAsync();
            return new TransactionResult();
        }

        protected TransactionResult GetTransactionException(Exception exception)
        {
            if (exception is CustomException)
            {
                return new TransactionResult(exception as CustomException);
            }
            else
            {
                return new TransactionResult(new CustomException(exception));
            }
        }

        public virtual async Task<TransactionResult> InsertAsync(TCollection collection)
        {
            try
            {
                return await GetTransactionResultAsync(() =>        
                    this.Repository.InsertAsync(collection.TrimCharCollectionProperties()));
            }
            catch (Exception ex)
            {
                return GetTransactionException(ex);
            }
        }

        public virtual async Task<TransactionResult> UpdateAsync(TCollection collection)
        {
            try
            {
                return await GetTransactionResultAsync(() =>
                     this.Repository.UpdateAsync(collection.Id, collection.TrimCharCollectionProperties()));
            }
            catch (Exception ex)
            {
                return GetTransactionException(ex);
            }
        }

        public virtual async Task<TransactionResult> DeleteAsync(TCollection collection)
        {
            try
            {
                return await GetTransactionResultAsync(() =>
                    this.Repository.DeleteAsync(collection.Id));
            }
            catch (Exception ex)
            {
                return GetTransactionException(ex);
            }
        }

        public virtual async Task<TransactionResult> DeleteAsync(string id)
        {
            try
            {
                return await GetTransactionResultAsync(() =>
                    this.Repository.DeleteAsync(id));
            }
            catch (Exception ex)
            {
                return GetTransactionException(ex);
            }
        }

        public virtual async Task<TransactionResult> DeleteAsync(Expression<Func<TCollection, bool>> filter)
        {
            try
            {
                return await GetTransactionResultAsync(() =>
                    this.Repository.DeleteAsync(filter));
            }
            catch (Exception ex)
            {
                return GetTransactionException(ex);
            }
        }

        #endregion /Methods

    }
}