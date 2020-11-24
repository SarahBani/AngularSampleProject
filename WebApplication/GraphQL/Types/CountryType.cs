using Core.DomainModel.Entities;
using GraphQL.Types;

namespace UserInterface.GraphQL.Types
{
    public class CountryType : ObjectGraphType<Country>
    {

        public CountryType()
        {
            Name = nameof(Country);

            Field(q => q.Id);
            Field(q => q.Name);
            Field(q => q.FlagUrl, nullable: true);
            Field<ListGraphType<CityType>>(nameof(Country.Cities).ToLower(), "list of cities");
        }

    }
}
