using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using GraphQL.Types;
using GraphQL;
using UserInterface.GraphQL.Queries;
using GraphQL.NewtonsoftJson;

namespace WebApplication.Controllers
{
    [Route("graphql")]
    public class GraphQLController : BaseAPIController
    {

        #region Properties

        private readonly ISchema _schema;
        private readonly IDocumentExecuter _executer;

        #endregion /Properties       

        #region Constructors

        public GraphQLController(ISchema schema,
            IDocumentExecuter executer)
        {
            _schema = schema;
            _executer = executer;
        }

        #endregion /Constructors

        #region Actions

        //[HttpPost] // by remove it, also accessible with Get verb
        public async Task<IActionResult> Post([FromBody] QueryContent query)
        {
            // Convert parameters to Dictionary<string,object>
            var inputs = query.Variables.ToInputs();

            // This function will either execute query or mutation based on request.
            var result = await new DocumentExecuter().ExecuteAsync(q =>
            {
                q.Schema = this._schema;
                q.Query = query.Query;
                q.OperationName = query.OperationName;
                q.Inputs = inputs;
            });

            if (result.Errors?.Count > 0)
            {
                return BadRequest();
                //        return Problem(detail: result.Errors.Select(_ => _.Message).FirstOrDefault(), statusCode: 500);
            }

            return Ok(result);
        }

        //[HttpPost]
        //public async Task<IActionResult> MutationAsync([FromBody] GraphMutation mutation)
        //{
        //    var result = await _executer.ExecuteAsync(_ =>
        //    {
        //        _.Schema = _schema;

        //        _.Query = mutation.ToString();
        //        // _.Inputs = query.Variables?.ToInputs();

        //    }).ConfigureAwait(false);

        //    if (result.Errors?.Count > 0)
        //    {
        //        return Problem(detail: result.Errors.Select(_ => _.Message).FirstOrDefault(), statusCode: 500);
        //    }
        //    return Ok(result.Data);
        //}

        //[HttpGet("[action]")]
        //public async Task<List<ReservationModel>> ListFromGraphql()
        //{
        //    /*(Way:1) Native Http Client */
        //    return await GetViaHttpGraphqlClient();

        //    /*(Way:2) GraphQl.Client Library*/
        //    //   return await GetViaGraphqlClient();
        //}

        //private async Task<List<ReservationModel>> GetViaHttpGraphqlClient()
        //{
        //    var response = await _httpGraphqlClient.GetReservationsAsync();
        //    response.ThrowExceptionOnError();
        //    return response.Data.Reservations;
        //}

        //private async Task<List<ReservationModel>> GetViaGraphqlClient()
        //{
        //    var reservations = await _graphqlClient.GetReservationsAsync();
        //    return reservations;
        //}

        #endregion /Actions

    }
}