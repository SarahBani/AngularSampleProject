using Core.DomainModel.Entities;
using Core.DomainService;
using Core.DomainService.Repositoy;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Infrastructure.DataBase.Repositoy
{
    public abstract class BaseReadOnlyRepository<TEntity, TKey> : IBaseReadOnlyRepository<TEntity, TKey>
        where TEntity : BaseEntity<TKey>
    {

        #region Properties

        protected readonly MyDataBaseContext MyDBContext;

        #endregion /Properties

        #region Constructors

        public BaseReadOnlyRepository(MyDataBaseContext dbContext)
        {
            this.MyDBContext = dbContext;
        }

        #endregion /Constructors

        #region Methods

        public virtual TEntity GetById(TKey id)
        {
            var entity = this.MyDBContext.Set<TEntity>().Find(id);
            if (entity != null)
            {
                this.MyDBContext.Entry(entity).State = EntityState.Detached;
            }
            return entity;
        }

        public virtual Task<TEntity> GetByIdAsync(TKey id) =>
            this.MyDBContext.Set<TEntity>().FindAsync(id).AsTask()
                 .ContinueWith(q =>
                 {
                     if (q.Result != null)
                     {
                         this.MyDBContext.Entry(q.Result).State = EntityState.Detached;
                     }
                     return q.Result;
                 });

        public virtual int GetCount(Expression<Func<TEntity, bool>> filter = null) =>
            GetQueryable().Count(filter);

        public virtual Task<int> GetCountAsync(Expression<Func<TEntity, bool>> filter = null) =>
            this.MyDBContext.Set<TEntity>().CountAsync(filter);

        public virtual TEntity GetSingle(Expression<Func<TEntity, bool>> filter) =>
            GetQueryable().Where(filter).SingleOrDefault();

        public virtual Task<TEntity> GetSingleAsync(Expression<Func<TEntity, bool>> filter) =>
            this.MyDBContext.Set<TEntity>()
                .Where(filter)
                .SingleOrDefaultAsync();

        public IQueryable<TEntity> GetQueryable() =>
            this.MyDBContext.Set<TEntity>().AsQueryable();

        public virtual IEnumerable<TEntity> GetEnumerable(
            Expression<Func<TEntity, bool>> filter = null,
            IList<Sort> sorts = null,
            Page page = null) =>
            GetQueryable()
                .Where(filter)
                .SetOrder(sorts)
                .SetPage(page);

        #endregion /Methods

    }
}
