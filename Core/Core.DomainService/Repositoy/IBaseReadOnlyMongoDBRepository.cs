using Core.DomainModel.Collections;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Core.DomainService.Repositoy
{
    public interface IBaseReadOnlyMongoDBRepository<TCollection>
          where TCollection : BaseCollection
    {

        Task<TCollection> GetByIdAsync(string id);

        Task<IList<TCollection>> GetAllAsync();

         Task<long> GetCountAsync(Expression<Func<TCollection, bool>> filter = null);

        Task<TCollection> GetSingleAsync(Expression<Func<TCollection, bool>> filter);

        IQueryable<TCollection> GetQueryable();

        //Task<IEnumerable<TCollection>> GetEnumerableAsync(
        //     Expression<Func<TCollection, bool>> filter = null,
        //     IList<Sort> sorts = null,
        //     Page page = null);

    }
}
