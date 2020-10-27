﻿using Core.DomainModel.Entities;
using Core.DomainService.Repositoy;
using Infrastructure.DataBase.Repositoy;

namespace Infrastructure.DataBase.Repository
{
    public class CountryRepository : BaseRepository<Country, short>, ICountryRepository
    {
        public CountryRepository(MyDataBaseContext dbContext)
            : base(dbContext)
        {

        }
    }
}