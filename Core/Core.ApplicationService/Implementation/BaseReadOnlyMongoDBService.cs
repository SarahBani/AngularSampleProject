using Core.DomainModel.Collections;
using Core.DomainService.Repositoy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Core.ApplicationService.Implementation
{
    public abstract class BaseReadOnlyMongoDBService<TRepository, TCollection>
        where TRepository : IBaseReadOnlyMongoDBRepository<TCollection>
        where TCollection : BaseCollection
    {

        #region Properties

        protected IEntityService EntityService { get; set; }

        protected TRepository Repository { get; private set; }

        #endregion /Properties

        #region Constructors

        public BaseReadOnlyMongoDBService(TRepository repository)
        {
            this.Repository = repository;
        }

        #endregion /Constructors

        #region Methods

        public virtual Task<TCollection> GetByIdAsync(string id) => this.Repository.GetByIdAsync(id);

        public virtual Task<IList<TCollection>> GetAllAsync() => this.Repository.GetAllAsync();

        public virtual Task<long> GetCountAsync(Expression<Func<TCollection, bool>> filter = null) =>
             this.Repository.GetCountAsync(filter);

        public virtual Task<TCollection> GetSingleAsync(Expression<Func<TCollection, bool>> filter) =>
             this.Repository.GetSingleAsync(filter);

        protected IQueryable<TCollection> GetQueryable() => this.Repository.GetQueryable();

        //protected async Task<IEnumerable<TCollection>> GetEnumerableAsync(
        //  Expression<Func<TCollection, bool>> filter = null,
        //  IList<Sort> sorts = null,
        //  Page page = null) => await this.Repository.GetEnumerableAsync(filter, sorts, page);

        #endregion /Methods

    }
}
