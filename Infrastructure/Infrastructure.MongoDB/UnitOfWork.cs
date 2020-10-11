using Core.DomainModel;
using Core.DomainModel.Entities;
using Core.DomainService;
using MongoDB.Driver;
using System;
using System.Threading.Tasks;

namespace Infrastructure.MongoDB
{
    public class UnitOfWork //: IUnitOfWork
    {

        #region Properties

        private string _transactionName;

        private MongoClient _client;

        private IClientSessionHandle _session;

        #endregion /Properties

        #region Constructors

        public UnitOfWork(MongoClient client)
        {
            this._client = client;
        }

        #endregion /Constructors

        #region Destructors

        ~UnitOfWork()
        {
            Dispose();
        }

        #endregion /Destructors

        #region Methods

        public string GetTransactionName() => this._transactionName;

        public bool HasTransaction() => !string.IsNullOrEmpty(this._transactionName);

        public async Task BeginTransaction(string transactionName)
        {
            if (string.IsNullOrEmpty(this._transactionName))
            {
                this._transactionName = transactionName;
            }
            this._session = await this._client.StartSessionAsync();
            this._session.StartTransaction();
        }

        public async Task CommitAsync()
        {
            try
            {
                if (string.IsNullOrEmpty(this._transactionName))
                {
                    throw new CustomException(ExceptionKey.NoActiveTransaction);
                }
                await this._session.CommitTransactionAsync();
                this._transactionName = string.Empty;
            }
            finally
            {
                this._session.Dispose();
            }
        }

        public async Task RollBack()
        {
            if (string.IsNullOrEmpty(this._transactionName))
            {
                throw new CustomException(ExceptionKey.NoActiveTransaction);
            }
            await this._session.AbortTransactionAsync();
            this._transactionName = string.Empty;
        }

        public void Dispose()
        {
            if (this._session != null)
            {
                this._session.Dispose();
            }
            GC.SuppressFinalize(this);
        }

        #endregion /Methods

    }
}
