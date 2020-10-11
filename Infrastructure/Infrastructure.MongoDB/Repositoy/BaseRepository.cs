using Core.DomainModel;
using Core.DomainModel.Collections;
using Core.DomainService.Repositoy;
using MongoDB.Driver;
using System;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Infrastructure.DataBase.Repositoy
{
    public abstract class BaseRepository<TCollection> : BaseReadOnlyRepository<TCollection>,
        IBaseMongoDBRepository<TCollection>
           where TCollection : BaseCollection
    {

        #region Properties

        #endregion /Properties

        #region Constructors

        public BaseRepository(IMongoDBDatabaseSettings settings) : base(settings)
        {
        }

        #endregion /Constructors

        #region Methods

        public virtual void Insert(TCollection collection) => base.Collection.InsertOne(collection);

        public virtual Task InsertAsync(TCollection collection) =>
             this.Collection.InsertOneAsync(collection);

        public virtual void Update(string id, TCollection collection) =>
          this.Collection.ReplaceOne(GetIdFilterDefinition(id), collection);

        public virtual Task UpdateAsync(string id, TCollection collection) =>
           this.Collection.ReplaceOneAsync(GetIdFilterDefinition(id), collection);

        public virtual void Delete(string id) =>
            this.Collection.DeleteOne(GetIdFilterDefinition(id));

        public virtual Task DeleteAsync(string id) =>
            this.Collection.DeleteOneAsync(GetIdFilterDefinition(id));

        public virtual void Delete(Expression<Func<TCollection, bool>> filter) =>
            this.Collection.DeleteManyAsync(filter);

        public virtual Task DeleteAsync(Expression<Func<TCollection, bool>> filter) =>
           this.Collection.DeleteManyAsync(filter);

        private FilterDefinition<TCollection> GetIdFilterDefinition(string id) =>
            (FilterDefinition<TCollection>)(q => q.Id.Equals(id));

        #endregion /Methods

    }
}
