using Core.ApplicationService.Contracts;
using Core.DomainModel.Entities;
using GraphQL;
using GraphQL.Types;
using UserInterface.GraphQL.Types;

namespace UserInterface.GraphQL.Queries
{
    public class GraphMutation : ObjectGraphType
    {

        #region Properties

        private IHotelService _hotelService;

        private IHotelRoomService _hotelRoomService;

        #endregion /Properties

        #region Constructors

        public GraphMutation(IHotelService hotelService,
            IHotelRoomService hotelRoomService)
        {
            this._hotelService = hotelService;
            this._hotelRoomService = hotelRoomService;

            SetMutation();
        }

        #endregion /Constructors

        #region Methods

        /// <example>
        /// This is an example JSON request for a mutation
        /// {
        ///   "query": "mutation ($hotel:HotelInput!){ createHotel(hotel: $hotel) { id name } }",
        ///   "variables": {
        ///     "hotel": {
        ///       "name": "Boba Fett"
        ///     }
        ///   }
        /// }
        /// </example>
        private void SetMutation()
        {
            Field<TransactionResultType>(
                "createHotel",
                "Insert a new Hotel",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<HotelInputType>> { Name = "hotel" }
                ),
                resolve: context =>
                {
                    var hotel = context.GetArgument<Hotel>("hotel");
                    return this._hotelService.InsertAsync(hotel);
                });
            Field<TransactionResultType>(
                "editHotel",
                "Update an existing Hotel",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<HotelInputType>> { Name = "hotel" }
                ),
                resolve: context =>
                {
                    var hotel = context.GetArgument<Hotel>("hotel");
                    return this._hotelService.UpdateAsync(hotel);
                });
            Field<TransactionResultType>(
                "removeHotel",
                "Delete an existing Hotel",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<LongGraphType>> { Name = "id" }
                ),
                resolve: context =>
                {
                    long id = context.GetArgument<long>("id");
                    return this._hotelService.DeleteAsync(id);
                });
        }

        #endregion /Methods

    }
}
