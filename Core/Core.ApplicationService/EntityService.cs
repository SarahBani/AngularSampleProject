﻿using Core.ApplicationServices.Contracts;
using Core.ApplicationServices.Implementation;
using Core.DomainModel.Entities;
using Core.DomainServices;
using Core.DomainServices.Repositoy;
using System.Linq;

namespace Core.ApplicationServices
{
    public class EntityService
    {

        #region Properties

        public IUnitOfWork UnitOfWork { get; set; }

        #region Repositories

        public IBankRepository BankRepository { get; set; }

        public IBranchRepository BranchRepository { get; set; }

        #endregion /Repositories

        #region Services

        private IBankService _bankService;
        public IBankService BankService
        {
            get
            {
                if (_bankService == null)
                {
                    _bankService = new BankService(this);

                }
                return _bankService;
            }
        }

        private IBranchService _branchService;
        public IBranchService BranchService
        {
            get
            {
                if (_branchService == null)
                {
                    _branchService = new BranchService(this);

                }
                return _branchService;
            }
        }

        #endregion /Repositories

        #endregion /Properties

        #region Constructors

        public EntityService(IRepository<Bank, int> bankRepository,
                             IRepository<Branch, int> branchRepository,
                             IUnitOfWork unitOfWork)
        {
            this.BankRepository = (bankRepository as IBankRepository);
            this.BranchRepository = (branchRepository as IBranchRepository);

            this.UnitOfWork = unitOfWork;
        }

        #endregion /Constructors

        #region Methods

        public IReadOnlyRepository<TEntity, TKey> GetRepository<TEntity, TKey>()
            where TEntity : Entity<TKey>
        {
            string entityName = typeof(TEntity).Name;

            var prop = this.GetType().GetProperties()
                .Where(q => q.Name.Equals(entityName + "Repository"))
                .SingleOrDefault();

            return prop.GetValue(this) as IReadOnlyRepository<TEntity, TKey>;
        }

        #endregion /Methods

    }
}
