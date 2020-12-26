using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using System.Linq;
using Core.ApplicationService.Contracts;
using Core.DomainService;
using Core.DomainModel;
using Core.DomainModel.Entities;
using Core.DomainModel.Settings;
using System.Transactions;

namespace Core.ApplicationService.Implementation
{
    public class AuthService : IAuthService
    {

        #region Properties

        private readonly AppSettings _appSettings;

        private readonly UserManager<User> _userManager;

        #endregion /Properties

        #region Constructors

        public AuthService(IOptions<AppSettings> appSettings,
            UserManager<User> userManager)
        {
            this._appSettings = appSettings.Value;
            this._userManager = userManager;
        }

        #endregion /Constructors

        #region Methods

        public bool HasEmailAlreadyExisted(string email) =>
            this._userManager.FindByEmailAsync(email.Trim()).Result != null;

        public async Task<TransactionResult> SignUp(string email, string password)
        {
            try
            {
                if (HasEmailAlreadyExisted(email))
                {
                    throw new CustomException(Constant.Exception_EmailAlreadyExist);
                }
                var user = new User()
                {
                    UserName = email.Trim(),
                    Email = email.Trim()
                };

                using (var scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
                {
                    try
                    {
                        var identityResult = await this._userManager.CreateAsync(user, password.Trim());
                        if (identityResult.Succeeded)
                        {
                            await AddRole(user, RoleEnum.Member.ToString());
                            //await AddClaims(user, RoleEnum.Member);
                        }
                        else
                        {
                            string errors = string.Empty;
                            if (identityResult.Errors.Count() > 0)
                            {
                                foreach (var error in identityResult.Errors)
                                {
                                    errors += error.Description;
                                }
                                throw new CustomException(errors);
                            }
                            throw new CustomException(Constant.Exception_SignUpFailed);
                        }

                        scope.Complete();
                    }
                    catch (Exception ex)
                    {
                        scope.Dispose();
                        throw;
                    }
                }
                return new TransactionResult();
            }
            catch (Exception ex)
            {
                return GetTransactionException(ex);
            }
        }

        private async Task<TransactionResult> AddRole(User user, string role)
        {
            var result = await this._userManager.AddToRoleAsync(user, role);
            if (result.Succeeded)
            {
                return new TransactionResult();
            }
            else
            {
                string errors = string.Empty;
                if (result.Errors.Count() > 0)
                {
                    foreach (var error in result.Errors)
                    {
                        errors += error.Description;
                    }
                    throw new CustomException(errors);
                }
                throw new CustomException(Constant.Exception_SignUpFailed);
            }
        }

        //private async Task<TransactionResult> AddClaims(User user, RoleEnum role)
        //{
        //    string subSystems = string.Empty;
        //    switch (role)
        //    {
        //        case RoleEnum.Admin:
        //            subSystems = string.Join(";", SubSystemEnum.Auth.ToString().ToLower(), SubSystemEnum.CRUD.ToString().ToLower(), SubSystemEnum.CQRS.ToString().ToLower());
        //            break;
        //        case RoleEnum.Manager:
        //            subSystems = string.Join(";", SubSystemEnum.CRUD.ToString().ToLower(), SubSystemEnum.CQRS.ToString().ToLower());
        //            break;
        //        case RoleEnum.Employee:
        //        case RoleEnum.Member:
        //        default:
        //            subSystems = SubSystemEnum.CRUD.ToString();
        //            break;
        //    }
        //    var claims = new List<Claim>
        //    {
        //        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
        //        new Claim(ClaimTypes.Name, user.UserName),
        //        new Claim(ClaimTypes.System, subSystems)

        //    };
        //    //claims.Add(new Claim(ClaimTypes.Role, role.ToString()));

        //    var result = await this._userManager.AddClaimsAsync(user, claims);
        //    if (result.Succeeded)
        //    {
        //        return new TransactionResult();
        //    }
        //    else
        //    {
        //        string errors = string.Empty;
        //        if (result.Errors.Count() > 0)
        //        {
        //            foreach (var error in result.Errors)
        //            {
        //                errors += error.Description;
        //            }
        //            throw new CustomException(errors);
        //        }
        //        throw new CustomException(Constant.Exception_SignUpFailed);
        //    }
        //}

        public async Task<TransactionResult> ChangePassword(string userName, string oldPassword, string newPassword)
        {
            var user = await this._userManager.FindByEmailAsync(userName);
            if (user != null)
            {
                var identityResult = await this._userManager.ChangePasswordAsync(user, oldPassword, newPassword);
                if (identityResult.Succeeded)
                {
                    return new TransactionResult();
                }
            }
            return new TransactionResult(new CustomException(Constant.Exception_ChangePasswordFailed));
        }

        //public async Task<TransactionResult> CreateRole(string name)
        //{
        //    var role = new Role()
        //    {
        //        Name = name,
        //        NormalizedName = name.ToUpper(),
        //        ConcurrencyStamp = Guid.NewGuid().ToString(),
        //        Description = null
        //    };
        //    var result = await this._roleManager.CreateAsync(role);
        //    if (result.Succeeded)
        //    {
        //        return new TransactionResult();
        //    }
        //    else
        //    {
        //        return new TransactionResult(new CustomException(Constant.Exception_RoleCreationFailed));
        //    }
        //}

        public async Task<TransactionResult> GetAuthenticationToken(string email, string password) // (UserCredential request)
        {
            try
            {
                var user = await this._userManager.FindByEmailAsync(email);
                if (user == null || !await this._userManager.CheckPasswordAsync(user, password))
                {
                    throw new CustomException(ExceptionKey.AuthenticationFailed);
                }
                //var claims = await this._userManager.GetClaimsAsync(user);
                //if (claims == null)
                //{
                //    throw new CustomException(ExceptionKey.UserNotAccess);
                //}
                //var subSystems = claims.SingleOrDefault(q => q.Type == ClaimTypes.System);
                //if (subSystems == null)
                //{
                //    throw new CustomException(ExceptionKey.UserNotAccess);
                //}

                DateTime expirationTime = DateTime.UtcNow.AddMinutes(double.Parse(this._appSettings.AccessExpiration));
                string token = GenerateJwtToken(expirationTime);
                var response = new AuthenticateResponse(user, token, expirationTime);
                return new TransactionResult(response);
            }
            catch (Exception ex)
            {
                return GetTransactionException(ex);
            }
        }

        private string GenerateJwtToken(DateTime expirationTime)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this._appSettings.SecretKey));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha512Signature); //  HmacSha256Signature);

            //var tokenDescriptor = new SecurityTokenDescriptor
            //{
            //    Issuer = this._appSettings.Issuer,
            //    Audience = subSystems.Value,
            //    //Subject = new ClaimsIdentity(new Claim[]
            //    //{
            //    //    new Claim(ClaimTypes.Name, "crud")
            //    //}),
            //    Subject = new ClaimsIdentity(claims),
            //    Expires = DateTime.UtcNow.AddMinutes(double.Parse(this._appSettings.AccessExpiration)),
            //    SigningCredentials = credentials
            //};
            //string token = tokenHandler.WriteToken(tokenHandler.CreateToken(tokenDescriptor));

            var tokeOptions = new JwtSecurityToken(
                issuer: this._appSettings.Issuer,
                audience: this._appSettings.Audience,
                // audience: subSystems.Value,
                //claims: new List<Claim>(),
                expires: expirationTime,
                signingCredentials: credentials
            );
            return new JwtSecurityTokenHandler().WriteToken(tokeOptions);
        }

        protected TransactionResult GetTransactionException(Exception exception)
        {
            if (exception is CustomException)
            {
                return new TransactionResult(exception as CustomException);
            }
            else
            {
                return new TransactionResult(new CustomException(exception));
            }
        }

        #endregion /Methods

    }
}
