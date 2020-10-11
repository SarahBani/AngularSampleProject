using Core.DomainModel.Collections;
using System;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Core.DomainService.Repositoy
{
    public interface IBaseMongoDBRepository<TCollection> : IBaseReadOnlyMongoDBRepository<TCollection>
        where TCollection : BaseCollection
    {

        Task InsertAsync(TCollection entity);

        Task UpdateAsync(string id, TCollection entity);

        Task DeleteAsync(string id);

        Task DeleteAsync(Expression<Func<TCollection, bool>> filter);

    }
}
