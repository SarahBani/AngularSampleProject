using Core.ApplicationService.Contracts;
using Core.DomainModel.Entities;
using Core.DomainService;
using Core.DomainService.Repositoy;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.ApplicationService.Implementation
{
    public class BranchService : BaseService<IBranchRepository, Branch, int>, IBranchService
    {

        #region Properties

        #endregion /Properties

        #region Constructors

        public BranchService(IEntityService entityService)
            : base(entityService)
        {
        }

        #endregion /Constructors

        #region Methods

        public Task<IList<Branch>> GetListByBankIdAsync(int bankId) =>
            base.GetQueryable().Where(q => q.BankId.Equals(bankId)).ToIListAsync();

        public Task<int> GetCountByBankIdAsync(int bankId) =>
             base.GetQueryable().CountAsync(q => q.BankId.Equals(bankId));

        public Task<TransactionResult> DeleteByBankIdAsync(int bankId) =>
             base.DeleteAsync(q => q.BankId.Equals(bankId));

        #endregion /Methods

    }
}
