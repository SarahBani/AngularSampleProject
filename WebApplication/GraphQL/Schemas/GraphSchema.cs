﻿using GraphQL.Types;
using GraphQL.Utilities;
using System;
using UserInterface.GraphQL.Queries;

namespace UserInterface.GraphQL.Schemas
{
    public class GraphSchema : Schema
    {

        //public GraphSchema(IDependencyResolver resolver) : base(resolver)
        //{
        //    Query = resolver.Resolve<GraphQuery>();
        //    Mutation = resolver.Resolve<GraphMutation>();
        //}

        public GraphSchema(IServiceProvider provider) : base(provider)
        {
            Query = provider.GetRequiredService<GraphQuery>();
            Mutation = provider.GetRequiredService<GraphMutation>();
        }

    }
}
