using Core.DomainService;
using System.Threading.Tasks;

namespace Core.ApplicationService.Contracts
{
    public interface IEmailService
    {

        Task<TransactionResult> SendEmailAsync(string email, string message);

    }
}
