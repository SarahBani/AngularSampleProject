using Microsoft.Extensions.Configuration;

namespace Core.DomainModel.AppConfig
{
    public class AppConfiguration
    {

        public readonly string _connectionString = string.Empty;

        public AppConfiguration()
        {
            var configurationBuilder = new ConfigurationBuilder();
            var root = configurationBuilder.Build();
            _connectionString = root.GetSection("ConnectionString").GetSection("DefaultConnection").Value;
        }

        public string ConnectionString
        {
            get => _connectionString;
        }

    }
}
