using Core.DomainService;
using GraphQL.Types;

namespace UserInterface.GraphQL.Types
{
    public class TransactionResultType : ObjectGraphType<TransactionResult>
    {

        public TransactionResultType()
        {
            Name = nameof(TransactionResult);

            Field(q => q.IsSuccessful);
            Field(q => q.CustomExceptionMessage);
        }

    }
}
