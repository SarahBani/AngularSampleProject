using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace Core.DomainModel
{
    public class UserCredential 
    {

        [Required(AllowEmptyStrings = false)]
        [JsonProperty("email")]
        public string Email { get; set; }

        [Required(AllowEmptyStrings = false)]
        [JsonProperty("password")]
        public string Password { get; set; }

    }
}
