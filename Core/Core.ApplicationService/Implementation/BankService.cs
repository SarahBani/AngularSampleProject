using Core.ApplicationService.Contracts;
using Core.DomainModel.Entities;
using Core.DomainService;
using Core.DomainService.Repositoy;
using System;
using System.Threading.Tasks;

namespace Core.ApplicationService.Implementation
{
    public class BankService : BaseService<IBankRepository, Bank, int>, IBankService
    {

        #region Properties

        #endregion /Properties

        #region Constructors

        public BankService(IEntityService entityService)
            : base(entityService)
        {
        }

        #endregion /Constructors

        #region Methods

        public async Task<int> GetCountAsync()
        {
            return await base.GetCountAsync();
        }

        public override async Task<TransactionResult> UpdateAsync(Bank bank)
        {
            try
            {
                string prevLogoUrl = await this.GetLogoUrl(bank.Id); // need to wait in order not to delete the new logo
                base.BeginTransaction();
                this.Repository.Update(bank.TrimCharProperties<Bank, int>());
                 DeleteLogoFile(prevLogoUrl); 
                return await CommitTransactionAsync();
            }
            catch (Exception ex)
            {
                return GetTransactionException(ex);
            }
        }

        public override async Task<TransactionResult> DeleteAsync(int id)
        {
            try
            {
                string prevLogoUrl = await this.GetLogoUrl(id); // need to wait in order not to delete the new logo
                base.BeginTransaction();
                this.Repository.Delete(id);
                DeleteLogoFile(prevLogoUrl);
                return await CommitTransactionAsync();
            }
            catch (Exception ex)
            {
                return GetTransactionException(ex);
            }
        }

        private void DeleteLogoFile(string logoUrl)
        {
            if (!string.IsNullOrEmpty(logoUrl))
            {
                Utility.DeleteFile(logoUrl);
            }
        }

        private async Task<string> GetLogoUrl(int id)
        {
            return (await base.GetByIdAsync(id)).LogoUrl;
        }

        #endregion /Methods

    }
}
