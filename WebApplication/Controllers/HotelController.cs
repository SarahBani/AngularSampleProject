using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Core.DomainModel.Entities;
using Core.ApplicationService.Contracts;
using GraphQL.Types;
using GraphQL;
using UserInterface.GraphQL.Queries;
using System.Linq;

namespace WebApplication.Controllers
{
    [Route("[controller]")]
    public class HotelController : BaseAPIController
    {

        #region Properties

        public IHotelService _hotelService { get; set; }

        private readonly ISchema _schema;
        private readonly IDocumentExecuter _executer;

        //private readonly ReservationHttpGraphqlClient _httpGraphqlClient;
        //private readonly ReservationGraphqlClient _graphqlClient;

        #endregion /Properties

        #region Constructors

        public HotelController(IHotelService hotelService, ISchema schema, IDocumentExecuter executer)        
        {
            this._hotelService = hotelService;
            this._schema = schema;
            this._executer = executer;
        }

        #endregion /Constructors

        #region Actions

        [HttpGet("ItemAsync/{id}")]
        public async Task<Hotel> GetItemAsync([FromRoute] long id)
        {
            return await this._hotelService.GetByIdAsync(id);
        }

        [HttpGet("ListAsync")]
        public async Task<IEnumerable<Hotel>> GetListByCityIdAsync([FromQuery] long cityId)
        {
            return await this._hotelService.GetListByCityIdAsync(cityId);
        }

        [HttpGet("CountAsync")]
        public async Task<int> GetCountByCityIdAsync([FromQuery] long cityId)
        {
            return await this._hotelService.GetCountByCityIdAsync(cityId);
        }

        [HttpPost("[action]")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> InsertAsync([FromBody] Hotel Hotel)
        {
            var result = await this._hotelService.InsertAsync(Hotel);
            if (result.IsSuccessful)
            {
                return base.GetOKResult();
            }
            else
            {
                return base.GetErrorResult(result);
            }
        }

        [HttpPut("[action]/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateAsync([FromRoute] long id, [FromBody] Hotel hotel)
        {
            if (id <= 0)
            {
                return base.GetInvalidRequestResult();
            }
            var result = await this._hotelService.UpdateAsync(hotel);
            if (result.IsSuccessful)
            {
                return base.GetOKResult();
            }
            else
            {
                return base.GetErrorResult(result);
            }
        }

        [HttpDelete("[action]/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> DeleteAsync([FromRoute] long id)
        {
            if (id <= 0)
            {
                return base.GetInvalidRequestResult();
            }
            var result = await this._hotelService.DeleteAsync(id);
            if (result.IsSuccessful)
            {
                return base.GetOKResult();
            }
            else
            {
                return base.GetErrorResult(result);
            }
        }



        [HttpPost]
        public async Task<IActionResult> Post([FromBody] HotelQuery query)
        {
            var result = await _executer.ExecuteAsync(_ =>
            {
                _.Schema = _schema;
                _.Query = query.ToString();
               // _.Inputs = query.Variables?.ToInputs();

            }).ConfigureAwait(false);

            if (result.Errors?.Count > 0)
            {
                return Problem(detail: result.Errors.Select(_ => _.Message).FirstOrDefault(),
                    statusCode: 500);
            }
            return Ok(result.Data);
        }


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