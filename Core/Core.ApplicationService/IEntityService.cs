using Core.DomainModel.Entities;
using Core.DomainService;
using Core.DomainService.Repositoy;
using Core.ApplicationService.Contracts;

namespace Core.ApplicationService
{
    public interface IEntityService
    {

        IUnitOfWork UnitOfWork { get; }

        IBankRepository BankRepository { get; }

        IBranchRepository BranchRepository { get; }

        IBankService BankService { get; }

        IBranchService BranchService { get; }

        IBaseReadOnlyRepository<TEntity, TKey> GetRepository<TEntity, TKey>()
            where TEntity : BaseEntity<TKey>;

    }
}
