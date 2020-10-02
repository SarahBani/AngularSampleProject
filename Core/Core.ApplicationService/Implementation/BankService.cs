using Core.ApplicationServices.Contracts;
using Core.DomainModel.Entities;
using System.Threading.Tasks;

namespace Core.ApplicationServices.Implementation
{
    public class BankService : BaseService<Bank, int>, IBankService
    {

        #region Properties

        #endregion /Properties

        #region Constructors

        public BankService(EntityService entityService)
            : base(entityService)
        {
        }

        #endregion /Constructors

        #region Methods

        public async Task<int> GetCountAsync()
        {
            return await base.GetCountAsync();
        }

        #endregion /Methods

    }
}
