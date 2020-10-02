using Core.ApplicationServices.Contracts;
using Core.ApplicationServices.Implementation;
using Core.DomainModel.Entities;
using Core.DomainServices;
using Core.DomainServices.Repositoy;
using Infrastructure.DataBase.Repository;
using Microsoft.Extensions.DependencyInjection;

namespace DependencyInjection
{
    public static class StartupExtension
    {
        public static IServiceCollection SetInjection(this IServiceCollection services)
        {
            services.AddScoped(typeof(IUnitOfWork), typeof(Infrastructure.SQLServer.UnitOfWork));
            // services.AddScoped<EntityService>();

            services.AddScoped(typeof(IRepository<Bank, int>), typeof(BankRepository));
            services.AddScoped(typeof(IRepository<Branch, int>), typeof(BranchRepository));

            services.AddScoped(typeof(IBankService), typeof(BankService));
            services.AddScoped(typeof(IBranchService), typeof(BranchService));

            //services.AddClassesAsImplementedInterface(Assembly.GetEntryAssembly(), typeof(IBaseService));

            // Can't do this for abstract classes
            //services.AddScoped(typeof(IReadOnlyRepository<,>), typeof(ReadOnlyRepository<,>));
            //services.AddScoped(typeof(IBaseService), typeof(BaseService<,>));

            return services;
        }

    }
}