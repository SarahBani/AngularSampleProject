using Core.DomainModel.Entities;
using Core.DomainService;
using Core.DomainService.Repositoy;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Core.ApplicationService.Implementation
{
    public abstract class BaseReadOnlyService<TRepository, TEntity, TKey>
        where TRepository : IBaseReadOnlyRepository<TEntity, TKey>
        where TEntity : BaseEntity<TKey>
    {

        #region Properties

        protected IEntityService EntityService { get; set; }

        protected TRepository Repository { get; private set; }

        #endregion /Properties

        #region Constructors

        public BaseReadOnlyService(IEntityService entityService)
        {
            this.EntityService = entityService;
            this.Repository = (TRepository)this.EntityService.GetRepository<TEntity, TKey>();
        }

        public BaseReadOnlyService()
        {

        }

        #endregion /Constructors

        #region Methods

        public virtual Task<TEntity> GetByIdAsync(TKey id) =>
           this.Repository.GetByIdAsync(id);

        public virtual Task<IList<TEntity>> GetAllAsync() =>
            this.GetQueryable().ToIListAsync();

        public virtual Task<int> GetCountAsync(Expression<Func<TEntity, bool>> filter = null) =>
             this.Repository.GetCountAsync(filter);

        public virtual Task<TEntity> GetSingleAsync(Expression<Func<TEntity, bool>> filter) =>
             this.Repository.GetSingleAsync(filter);

        protected IQueryable<TEntity> GetQueryable() =>
             this.Repository.GetQueryable();

        protected IEnumerable<TEntity> GetEnumerable(
            Expression<Func<TEntity, bool>> filter = null,
            IList<Sort> sorts = null,
            Page page = null) => this.Repository.GetEnumerable(filter, sorts, page);

        #endregion /Methods

    }
}
