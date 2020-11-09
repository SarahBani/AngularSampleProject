using GraphQL;
using GraphQL.Types;
using GraphQL.Utilities;
using System;
using UserInterface.GraphQL.Queries;

namespace UserInterface.GraphQL.Schemas
{
    public class HotelSchema : Schema
    {

        //public HotelSchema(IDependencyResolver resolver) : base(resolver)
        //{
        //    Query = resolver.Resolve<HotelQuery>();
        //}

        public HotelSchema(IServiceProvider provider) : base(provider)
        {
            Query = provider.GetRequiredService<HotelQuery>();
            //  Mutation = provider.GetRequiredService<StarWarsMutation>();
        }
    }
}
