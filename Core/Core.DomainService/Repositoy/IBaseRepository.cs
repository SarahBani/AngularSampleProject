using Core.DomainModel.Entities;
using System;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Core.DomainService.Repositoy
{
    public interface IBaseRepository<TEntity, TKey> : IBaseReadOnlyRepository<TEntity, TKey>
        where TEntity : BaseEntity<TKey>
    {

        Task InsertAsync(TEntity entity);

        void Update(TEntity entity);

        void Delete(TKey id);

        void Delete(TEntity entity);

        void Delete(Expression<Func<TEntity, bool>> filter);

    }
}
