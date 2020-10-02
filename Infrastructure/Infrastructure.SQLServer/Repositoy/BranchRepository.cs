using Core.DomainModel.Entities;
using Core.DomainService.Repositoy;
using Infrastructure.DataBase.Repositoy;

namespace Infrastructure.DataBase.Repository
{
    public class BranchRepository : BaseRepository<Branch, int>, IBranchRepository
    {
        public BranchRepository(MyDataBaseContext dbContext)
            : base(dbContext)
        {

        }
    }
}
