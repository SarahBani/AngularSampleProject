using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace Core.DomainModel.Collections
{
    public class BaseCollection
    {

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [Required]
        public string Id { get; set; }
           
    }
}
