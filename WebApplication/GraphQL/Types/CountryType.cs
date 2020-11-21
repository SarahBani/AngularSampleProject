using Core.DomainModel.Entities;
using GraphQL.Types;

namespace UserInterface.GraphQL.Types
{
    public class CountryType : ObjectGraphType<Country>
    {

        public CountryType()
        {
            Name = "Country";

            Field(q => q.Id);
            Field(q => q.Name);
            Field(q => q.FlagUrl, nullable: true);
            Field<ListGraphType<CityType>>("cities", "list of cities");
        }

    }
}
