using Core.DomainModel.Entities;
using GraphQL.Types;

namespace UserInterface.GraphQL.Types
{
    public class HotelPhotosInputType : InputObjectGraphType
    {
        public HotelPhotosInputType()
        {
            Name = "HotelPhotosInput";
            Field<NonNullGraphType<LongGraphType>>(nameof(HotelPhoto.HotelId));
            Field<NonNullGraphType<StringGraphType>>("PhotoUrls");
        }
    }
}
