using Core.DomainModel;
using Core.DomainService;
using System.Threading.Tasks;

namespace Core.ApplicationService.Contracts
{
    public interface IAuthService
    {
        bool HasEmailAlreadyExisted(string email);

        Task<TransactionResult> SignUp(string email, string password);

        Task<TransactionResult> ChangePassword(string email, string oldPassword, string newPassword);

        Task<TransactionResult> GetAuthenticationToken(string email, string password); //UserCredential userCredential

    }
}
