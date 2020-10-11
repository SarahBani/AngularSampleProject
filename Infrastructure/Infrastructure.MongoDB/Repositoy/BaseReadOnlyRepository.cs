using Core.DomainModel;
using Core.DomainModel.Collections;
using Core.DomainService;
using Core.DomainService.Repositoy;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Infrastructure.DataBase.Repositoy
{
    public abstract class BaseReadOnlyRepository<TCollection> : IBaseReadOnlyMongoDBRepository<TCollection>
        where TCollection : BaseCollection
    {

        #region Properties

        protected readonly IMongoCollection<TCollection> Collection;

        #endregion /Properties

        #region Constructors

        public BaseReadOnlyRepository(IMongoDBDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            this.Collection = database.GetCollection<TCollection>(GetCollectionName());
        }

        #endregion /Constructors

        #region Methods
        protected virtual string GetCollectionName()
        {
            string typeName = typeof(TCollection).Name;
            return Utility.Pluralize(typeName);
        }

        public TCollection GetById(string id) =>
           this.Collection.Find(q => q.Id.Equals(id)).FirstOrDefault();

        public Task<TCollection> GetByIdAsync(string id) =>
            this.Collection.Find(q => q.Id.Equals(id)).FirstOrDefaultAsync();

        public virtual IList<TCollection> GetAll() =>
            this.Collection.Find(FilterDefinition<TCollection>.Empty).ToList();

        public virtual Task<IList<TCollection>> GetAllAsync() =>
            this.Collection.Find(FilterDefinition<TCollection>.Empty).ToIListAsync();

        public long GetCount(Expression<Func<TCollection, bool>> filter) =>
            this.Collection.CountDocuments(filter);

        public Task<long> GetCountAsync(Expression<Func<TCollection, bool>> filter) =>
             this.Collection.CountDocumentsAsync(filter);

        public virtual TCollection GetSingle(Expression<Func<TCollection, bool>> filter) =>
            this.Collection.Find(filter).SingleOrDefault();

        public virtual Task<TCollection> GetSingleAsync(Expression<Func<TCollection, bool>> filter) =>
            this.Collection.Find(filter).SingleOrDefaultAsync();

        public virtual IQueryable<TCollection> GetQueryable() => this.Collection.AsQueryable();

        public virtual IEnumerable<TCollection> GetEnumerable(Expression<Func<TCollection, bool>> filter) =>
               this.Collection.Find(filter).ToEnumerable();

        //public virtual IEnumerable<TCollection> GetEnumerable(
        //    Expression<Func<TCollection, bool>> filter = null,
        //    IList<Sort> sorts = null,
        //    Page page = null) =>
        //    GetQueryable()
        //        .Where(filter)
        //        .SetOrder(sorts)
        //        .SetPage(page);

        #endregion /Methods

    }
}
