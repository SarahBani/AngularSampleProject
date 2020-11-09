using Core.DomainModel.Entities;
using GraphQL.Types;

namespace UserInterface.GraphQL.Types
{
    public class HotelType : ObjectGraphType<Hotel>
    {

        public HotelType()
        {
            Name = "Hotel";

            Field(q => q.Id);
            Field(q => q.Name).Description("The name of the hotel");
            Field(q => q.Stars);
            Field(q => q.Address, nullable: true);
            //Field<CityType>(nameof(Hotel.City));
            //Field<CountryType>(nameof(Hotel.City.Country));
        }

    }
}
