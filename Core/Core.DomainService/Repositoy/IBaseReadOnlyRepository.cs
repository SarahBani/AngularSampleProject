using Core.DomainModel.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Core.DomainService.Repositoy
{
    public interface IBaseReadOnlyRepository<TEntity, TKey>
        where TEntity : BaseEntity<TKey>
    {

        Task<TEntity> GetByIdAsync(TKey id);

        Task<int> GetCountAsync(Expression<Func<TEntity, bool>> filter = null);

        Task<TEntity> GetSingleAsync(Expression<Func<TEntity, bool>> filter);

        Task<IQueryable<TEntity>> GetQueryableAsync();

        Task<IEnumerable<TEntity>> GetEnumerableAsync(
             Expression<Func<TEntity, bool>> filter = null,
             IList<Sort> sorts = null,
             Page page = null);

    }
}
