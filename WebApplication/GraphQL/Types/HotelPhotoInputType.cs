using Core.DomainModel.Entities;
using GraphQL.Types;

namespace UserInterface.GraphQL.Types
{
    public class HotelPhotoInputType : InputObjectGraphType
    {
        public HotelPhotoInputType()
        {
            Name = "HotelPhotoInput";
            Field<NonNullGraphType<LongGraphType>>(nameof(HotelPhoto.HotelId));
            Field<NonNullGraphType<StringGraphType>>(nameof(HotelPhoto.PhotoUrl));
        }
    }
}
