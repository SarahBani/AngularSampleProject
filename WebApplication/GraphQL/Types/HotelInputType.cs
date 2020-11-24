using Core.DomainModel.Entities;
using GraphQL.Types;

namespace UserInterface.GraphQL.Types
{
    public class HotelInputType : InputObjectGraphType
    {
        public HotelInputType()
        {
            Name = "HotelInput";
            Field<LongGraphType>(nameof(Hotel.Id));
            Field<NonNullGraphType<StringGraphType>>(nameof(Hotel.Name));
            Field<NonNullGraphType<LongGraphType>>(nameof(Hotel.CityId));
            Field<NonNullGraphType<ByteGraphType>>(nameof(Hotel.Stars));
            Field<StringGraphType>(nameof(Hotel.Address));
        }
    }
}
