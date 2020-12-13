using Core.DomainModel.Entities;
using GraphQL.Types;

namespace UserInterface.GraphQL.Types
{
    public class HotelPhotoInputType : InputObjectGraphType
    {
        public HotelPhotoInputType()
        {
            Name = "HotelPhotoInput";
            Field<LongGraphType>(nameof(HotelPhoto.Id));
            Field<NonNullGraphType<LongGraphType>>(nameof(HotelPhoto.HotelId));
            Field<StringGraphType>(nameof(HotelPhoto.PhotoUrl));
        }
    }
}
