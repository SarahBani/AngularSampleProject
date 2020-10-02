using Core.DomainModel.Entities;
using Core.DomainServices;
using System;
using System.Threading.Tasks;

namespace Infrastructure.DataBase
{
    //public class UnitOfWork : IUnitOfWork
    //{

    //    public string TransactionName { get; private set; }

    //    public MyDataBaseContext MyDBContext { get; set; }

    //    public UnitOfWork(MyDataBaseContext dbContext)
    //    {
    //        this.MyDBContext = dbContext;
    //    }

    //    ~UnitOfWork()
    //    {
    //        Dispose();
    //    }

    //    public void Dispose()
    //    {
    //        if (this.MyDBContext != null)
    //        {
    //            this.MyDBContext.Dispose();
    //        }
    //        GC.SuppressFinalize(this);
    //    }

    //    public string GetTransactionName()
    //    {
    //        return this.TransactionName;
    //    }

    //    public void BeginTransaction(string transactionName)
    //    {
    //        if (string.IsNullOrEmpty(this.TransactionName))
    //        {
    //            this.TransactionName = transactionName;
    //        }
    //    }

    //    public async Task Commit()
    //    {
    //        if (string.IsNullOrEmpty(this.TransactionName))
    //        {
    //            throw new InvalidOperationException("No active transation");
    //        }
    //        await this.MyDBContext.SaveChangesAsync();
    //        this.TransactionName = string.Empty;
    //    }

    //    public void RollBack()
    //    {
    //    }

    //}
}
