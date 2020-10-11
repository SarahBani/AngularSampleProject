using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Core.DomainModel.Collections
{
    public class BaseCollection
    {

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
           
    }
}
