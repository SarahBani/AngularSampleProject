using Core.DomainModel.Entities;
using Core.DomainService.Repositoy;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Infrastructure.DataBase.Repositoy
{
    public abstract class BaseRepository<TEntity, TKey> : BaseReadOnlyRepository<TEntity, TKey>, IBaseRepository<TEntity, TKey>
           where TEntity : BaseEntity<TKey>
    {

        #region Properties

        #endregion /Properties

        #region Constructors

        public BaseRepository(MyDataBaseContext dbContext)
            : base(dbContext)
        {
        }

        #endregion /Constructors

        #region Methods

        public virtual void Insert(TEntity entity)
        {
            this.MyDBContext.Add(entity);
        }

        public virtual async Task InsertAsync(TEntity entity)
        {
            await this.MyDBContext.AddAsync(entity);
        }

        public virtual void Update(TEntity entity)
        {
            this.MyDBContext.Attach(entity);
            this.MyDBContext.Entry(entity).State = EntityState.Modified;
        }

        public virtual void Delete(TKey id)
        {
            var entity = Activator.CreateInstance<TEntity>();
            entity.Id = id;
            Delete(entity);
        }

        public virtual void Delete(TEntity entity)
        {
            this.MyDBContext.Attach(entity);
            this.MyDBContext.Remove(entity);
        }

        public virtual void Delete(Expression<Func<TEntity, bool>> filter)
        {
            var entities = base.GetEnumerable(filter);
            this.MyDBContext.RemoveRange(entities);
        }

        #endregion /Methods

    }
}
