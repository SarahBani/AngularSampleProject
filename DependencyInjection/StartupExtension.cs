using Core.ApplicationService;
using Core.ApplicationService.Contracts;
using Core.ApplicationService.Implementation;
using Core.DomainModel.Entities;
using Core.DomainModel.Collections;
using Core.DomainService;
using Core.DomainService.Repositoy;
using Infrastructure.DataBase.Repository;
using Infrastructure.MongoDB.Repository;
using Infrastructure.SQLServer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Core.DomainModel;

namespace DependencyInjection
{
    public static class StartupExtension
    {
        public static IServiceCollection SetInjection(this IServiceCollection services)
        {
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IEntityService, EntityService>();
            services.AddScoped<IEmailService, EmailService>();

            services.AddScoped(typeof(IBaseReadOnlyRepository<City, long>), typeof(CityRepository));
            services.AddScoped(typeof(IBaseReadOnlyRepository<Country, short>), typeof(CountryRepository));
            services.AddScoped(typeof(IBaseRepository<Bank, int>), typeof(BankRepository));
            services.AddScoped(typeof(IBaseMongoDBRepository<Book>), typeof(BookRepository));
            services.AddScoped(typeof(IBaseRepository<Branch, int>), typeof(BranchRepository));
            services.AddScoped(typeof(IBaseRepository<Hotel, long>), typeof(HotelRepository));
            services.AddScoped(typeof(IBaseRepository<HotelRoom, long>), typeof(HotelRoomRepository));

            services.AddScoped(typeof(ICityService), typeof(CityService));
            services.AddScoped(typeof(ICountryService), typeof(CountryService));
            services.AddScoped(typeof(IBankService), typeof(BankService));
            services.AddScoped(typeof(IBookService), typeof(BookService));
            services.AddScoped(typeof(IBranchService), typeof(BranchService));
            services.AddScoped(typeof(IHotelService), typeof(HotelService));
            services.AddScoped(typeof(IHotelRoomService), typeof(HotelRoomService));

            services.AddSingleton<IMongoDBDatabaseSettings>(sp =>
                sp.GetRequiredService<IOptions<MongoDBDatabaseSettings>>().Value);

            return services;
        }

    }
}