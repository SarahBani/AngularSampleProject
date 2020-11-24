using Core.DomainModel.Entities;
using GraphQL.Types;

namespace UserInterface.GraphQL.Types
{
    public class CityType : ObjectGraphType<City>
    {

        public CityType()
        {
            Name = nameof(City);

            Field(q => q.Id);
            Field(q => q.Name);
            Field<CountryType>(nameof(City.Country));
        }

    }
}
