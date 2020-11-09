using Core.DomainModel.Entities;
using GraphQL.Types;

namespace UserInterface.GraphQL.Types
{
    public class HotelRoomType : ObjectGraphType<HotelRoom>
    {

        public HotelRoomType()
        {
            Name = "HotelRoom";

            Field(q => q.Id);
            Field(q => q.Name).Description("The name of the hotel room");
            Field(q => q.Number);
            Field(q => q.Capacity, nullable: true);
            Field(q => q.Facilities, nullable: true);
            Field<HotelType>(nameof(HotelRoom.Hotel));
        }

    }
}
