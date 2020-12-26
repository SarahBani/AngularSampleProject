using Core.DomainModel.Entities;
using System;

namespace Core.DomainModel
{
    public class AuthenticateResponse
    {

        #region Properties

        public int Id { get; private set; }

        public string Username { get; private set; }

        public string Token { get; private set; }

        public DateTime TokenExpiration { get; private set; }

        #endregion /Properties

        #region Constructors

        public AuthenticateResponse(User user, string token, DateTime tokenExpiration)
        {
            this.Id = user.Id;
            this.Username = user.UserName;
            this.Token = token;
            this.TokenExpiration = tokenExpiration;
        }

        #endregion /Constructors

    }
}
