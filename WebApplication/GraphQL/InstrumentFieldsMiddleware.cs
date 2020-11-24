//using GraphQL;
//using GraphQL.Instrumentation;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;

//namespace UserInterface.GraphQL
//{


//    public class InstrumentFieldsMiddleware : IFieldMiddleware
//    {
//        public async Task<object> Resolve(
//          IResolveFieldContext context,
//          FieldMiddlewareDelegate next)
//        {
//            var metadata = new Dictionary<string, object>
//    {
//      {"typeName", context.ParentType.Name},
//      {"fieldName", context.FieldName}
//    };

//            using (context.Metrics.Subject("field", context.FieldName, metadata))
//            {
//                return await next(context);
//            }
//        }
//    }
//}
