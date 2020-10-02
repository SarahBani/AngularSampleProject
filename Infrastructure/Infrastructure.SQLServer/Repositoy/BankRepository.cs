using Core.DomainModel.Entities;
using Core.DomainService.Repositoy;
using Infrastructure.DataBase.Repositoy;

namespace Infrastructure.DataBase.Repository
{
    public class BankRepository : BaseRepository<Bank, int>, IBankRepository
    {
        public BankRepository(MyDataBaseContext dbContext)
            : base(dbContext)
        {

        }
    }
}
