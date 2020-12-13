using Core.ApplicationService.Contracts;
using GraphQL;
using GraphQL.Types;
using System.Linq;
using UserInterface.GraphQL.Types;

namespace UserInterface.GraphQL.Queries
{
    public class GraphQuery : ObjectGraphType
    {

        #region Properties

        private IHotelService _hotelService;

        private IHotelPhotoService _hotelPhotoService;

        private IHotelRoomService _hotelRoomService;

        private ICountryService _countryService;

        private ICityService _cityService;

        #endregion /Properties

        public GraphQuery(IHotelService hotelService,
            IHotelPhotoService hotelPhotoService,
            IHotelRoomService hotelRoomService,
            ICountryService countryService,
            ICityService cityService)
        {
            this._hotelService = hotelService;
            this._hotelPhotoService = hotelPhotoService;
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
            Field<HotelType>(name: "hotel", "Returns a single Hotel",
               arguments: new QueryArguments(new QueryArgument<NonNullGraphType<LongGraphType>>
               {
                   Name = "id",
                   Description = "Hotel Id"
               }),
               resolve: context =>
               {
                   long hotelId = context.GetArgument<long>("id");
                   return this._hotelService.GetByIdAsync(hotelId);
               }
           ); 
            Field<LongGraphType>(name: "hotelsCount", "Returns the count of Hotels",
                 resolve: context =>
                 {
                     return this._hotelService.GetCountAsync();
                 });
            Field<ListGraphType<HotelPhotoType>>(name: "hotelPhotos", "Returns the photos of the specific hotel",
                arguments: new QueryArguments(new QueryArgument<NonNullGraphType<LongGraphType>>
                {
                    Name = "hotelId",
                    Description = "Hotel Id"
                }),
                resolve: context =>
                {
                    long hotelId = context.GetArgument<long>("hotelId");
                    return this._hotelPhotoService.GetListByHotelIdAsync(hotelId);
                }
            );
            Field<ListGraphType<HotelPhotoType>>(name: "hotelPhoto", "Returns the first photo of the specific hotel",
                arguments: new QueryArguments(new QueryArgument<NonNullGraphType<LongGraphType>>
                {
                    Name = "hotelId",
                    Description = "Hotel Id"
                }),
                resolve: context =>
                {
                    long hotelId = context.GetArgument<long>("hotelId");
                    return this._hotelPhotoService.GetFirstByHotelIdAsync(hotelId);
                }
            );
            //Field<ListGraphType<HotelRoomType>>(name: "rooms",
            //    arguments: new QueryArguments(new QueryArgument<IntGraphType> { Name = "id" }),
            //    resolve: context =>
            //    {
            //        return hotelRoomService.GetListByHotelIdAsync(id);
            //    }
            //);
            Field<ListGraphType<CountryType>>(name: "countries", "Returns the list of Countries",
              resolve: context =>
              {
                  var countries = this._countryService.GetAllAsync().Result;
                  var cities = this._cityService.GetAllAsync().Result;
                  //return countries.Select(q => new
                  //{
                  //    Id = q.Id,
                  //    Name = q.Name,
                  //    FlagUrl = q.FlagUrl,
                  //    Cities = cities.Where(q => q.CountryId.Equals(q.Id)).ToList()
                  //});
                  foreach (var country in countries)
                  {
                      country.Cities = cities.Where(q => q.CountryId.Equals(country.Id)).ToList();
                  }
                  return countries;
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
                    var country = this._countryService.GetByIdAsync(countryId).Result;
                    country.Cities = this._cityService.GetListByCountryIdAsync(countryId).Result;
                    return country;
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
                    Name = "cityId",
                    Description = "City Id"
                }),
                resolve: context =>
                {
                    cityId = context.GetArgument<long>("cityId");
                    return this._cityService.GetByIdAsync(cityId);
                }
            );
        }

    }
}
