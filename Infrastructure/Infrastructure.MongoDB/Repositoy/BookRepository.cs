using Core.DomainModel;
using Core.DomainModel.Collections;
using Core.DomainService.Repositoy;
using Infrastructure.DataBase.Repositoy;

namespace Infrastructure.MongoDB.Repository
{
    public class BookRepository : BaseRepository<Book>, IBookRepository
    {

        #region Properties

        #endregion /Properties

        #region Constructors

        public BookRepository(IMongoDBDatabaseSettings settings) : base(settings)
        {
        }

        #endregion /Constructors

    }
}
