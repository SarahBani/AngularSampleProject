using Core.ApplicationService.Contracts;
using GraphQL;
using GraphQL.Types;
using UserInterface.GraphQL.Types;

namespace UserInterface.GraphQL.Queries
{

    class HelloWorldQuery : ObjectGraphType
    {
        public HelloWorldQuery()
        {
            Field<StringGraphType>(
                name: "hello",
                resolve: context => "world"
            );
        }
    }
    public class HotelQuery : ObjectGraphType
    {

        #region Properties

        private IHotelService _hotelService;

        private IHotelRoomService _hotelRoomService;

        private ICountryService _countryService;

        private ICityService _cityService;

        #endregion /Properties

        public HotelQuery(IHotelService hotelService,
            IHotelRoomService hotelRoomService,
            ICountryService countryService,
            ICityService cityService)
        {
            this._hotelService = hotelService;
            this._hotelRoomService = hotelRoomService;
            this._countryService = countryService;
            this._cityService = cityService;

            SetQuery();            
        }

        private void SetQuery()
        {
            Field<ListGraphType<HotelType>>(name: "hotels", "Returns the list of Hotels",
                 resolve: context =>
                 {
                     return this._hotelService.GetAllAsync();
                 });

            //FieldAsync<HotelType, Hotel>(
            //    "hotels",
            //    arguments: new QueryArguments(new QueryArgument<LongGraphType> { Name = "id" }),
            //    resolve: context =>
            //    {
            //        var id = context.GetArgument<int>("id");
            //        return hotelService.GetByIdAsync(id);
            //    }
            //);

            //long id = 0;
            //Field<HotelType>(name: "hotel", "Returns a single Hotel",
            //    arguments: new QueryArguments(new QueryArgument<NonNullGraphType<LongGraphType>>
            //    {
            //        Name = "id",
            //        Description = "Hotel Id"
            //    }),
            //    resolve: context =>
            //    {
            //        id = context.GetArgument<long>("id");
            //        //id =context.Arguments["id"].GetPropertyValue<long>()
            //        return this._hotelService.GetByIdAsync(id);
            //    }
            //);
            //Field<ListGraphType<HotelRoomType>>(name: "rooms",
            //    arguments: new QueryArguments(new QueryArgument<IntGraphType> { Name = "id" }),
            //    resolve: context =>
            //    {
            //        return hotelRoomService.GetListByHotelIdAsync(id);
            //    }
            //);
            //Field<CityType>(name: "city",
            //    arguments: new QueryArguments(new QueryArgument<IntGraphType> { Name = "id" }),
            //    resolve: context =>
            //    {
            //        long id = context.GetArgument<long>("id");
            //        return cityService.GetByIdAsync(id);
            //    }
            //);
            //Field<CountryType>(name: "country",
            //    arguments: new QueryArguments(new QueryArgument<IntGraphType> { Name = "id" }),
            //    resolve: context =>
            //    {
            //        short id = context.GetArgument<short>("id");
            //        return countryService.GetByIdAsync(id);
            //    }
            //);



            Field<ListGraphType<CountryType>>(name: "countries", "Returns the list of Countries",
              resolve: context =>
              {
                  return this._countryService.GetAllAsync();
              });
            short countryId = 0;
            Field<CountryType>(name: "country", "Returns a single Country",
                arguments: new QueryArguments(new QueryArgument<NonNullGraphType<ShortGraphType>>
                {
                    Name = "id",
                    Description = "Country Id"
                }),
                resolve: context =>
                {
                    countryId = context.GetArgument<short>("id");
                    return this._countryService.GetByIdAsync(countryId);
                }
            );
            Field<ListGraphType<CityType>>(name: "cities", "Returns the list of Cities of the specific country",
            arguments: new QueryArguments(new QueryArgument<NonNullGraphType<ShortGraphType>>
            {
                Name = "countryId",
                Description = "Country Id"
            }),
             resolve: context =>
             {
                 countryId = context.GetArgument<short>("countryId");
                 return this._cityService.GetListByCountryIdAsync(countryId);
             });
            long cityId = 0;
            Field<CityType>(name: "city", "Returns a single City",
                arguments: new QueryArguments(new QueryArgument<NonNullGraphType<LongGraphType>>
                {
                    Name = "id",
                    Description = "City Id"
                }),
                resolve: context =>
                {
                    cityId = context.GetArgument<long>("id");
                    return this._cityService.GetByIdAsync(cityId);
                }
            );
        }

    }
}
