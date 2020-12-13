using Core.DomainModel.Entities;
using GraphQL.Types;

namespace UserInterface.GraphQL.Types
{
    public class HotelPhotoType : ObjectGraphType<HotelPhoto>
    {

        public HotelPhotoType()
        {
            Name = nameof(HotelPhoto);

            Field(q => q.Id);
            Field(q => q.PhotoUrl);
        }

    }
}
