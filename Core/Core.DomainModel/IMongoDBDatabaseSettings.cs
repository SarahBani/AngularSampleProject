namespace Core.DomainModel
{
    public interface IMongoDBDatabaseSettings
    {

        string ConnectionString { get; set; }

        string DatabaseName { get; set; }

    }
}
