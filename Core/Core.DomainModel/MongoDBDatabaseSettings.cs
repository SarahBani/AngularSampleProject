namespace Core.DomainModel
{
    public class MongoDBDatabaseSettings : IMongoDBDatabaseSettings
    {

        public string ConnectionString { get; set; }

        public string DatabaseName { get; set; }

    }
}
