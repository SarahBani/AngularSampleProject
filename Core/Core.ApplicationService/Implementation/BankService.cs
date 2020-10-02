﻿using Core.ApplicationService.Contracts;
using Core.DomainModel.Entities;
using Core.DomainService.Repositoy;
using System.Threading.Tasks;

namespace Core.ApplicationService.Implementation
{
    public class BankService : BaseService<IBankRepository, Bank, int>, IBankService
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
