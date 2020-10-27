using Core.ApplicationService.Contracts;
using Core.DomainModel.Entities;
using Core.DomainService;
using Core.DomainService.Repositoy;
using System;
using System.Threading.Tasks;

namespace Core.ApplicationService.Implementation
{
    public class CountryService : BaseService<ICountryRepository, Country, short>, ICountryService
    {

        #region Properties

        #endregion /Properties

        #region Constructors

        public CountryService(IEntityService entityService)
            : base(entityService)
        {
        }

        #endregion /Constructors

        #region Methods

        public async Task<int> GetCountAsync() => await base.GetCountAsync();

        public override async Task<TransactionResult> UpdateAsync(Country country)
        {
            try
            {
                string prevFlagUrl = await this.GetFlagUrl(country.Id); // need to wait in order not to delete the new Flag
                base.BeginTransaction();
                this.Repository.Update(country.TrimCharProperties<Country, short>());
                if (country.FlagUrl != prevFlagUrl)
                {
                    DeleteFlagFile(prevFlagUrl);
                }
                return await CommitTransactionAsync();
            }
            catch (Exception ex)
            {
                return GetTransactionException(ex);
            }
        }

        public override async Task<TransactionResult> DeleteAsync(short id)
        {
            try
            {
                string prevFlagUrl = await this.GetFlagUrl(id); // need to wait in order not to delete the new Flag
                base.BeginTransaction();
                this.Repository.Delete(id);
                DeleteFlagFile(prevFlagUrl);
                return await CommitTransactionAsync();
            }
            catch (Exception ex)
            {
                return GetTransactionException(ex);
            }
        }

        private void DeleteFlagFile(string flagUrl)
        {
            if (!string.IsNullOrEmpty(flagUrl))
            {
                Utility.DeleteFile(flagUrl);
            }
        }

        private async Task<string> GetFlagUrl(short id) => (await base.GetByIdAsync(id)).FlagUrl;

        #endregion /Methods

    }
}
