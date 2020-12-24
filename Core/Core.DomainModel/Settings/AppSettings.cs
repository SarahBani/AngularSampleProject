namespace Core.DomainModel.Settings
{
    public class AppSettings
    {

        public virtual string SecretKey { get; set; }

        public virtual string Issuer { get; set; }

        public virtual string Audience { get; set; }

        public virtual string AccessExpiration { get; set; }
        
    }
}
