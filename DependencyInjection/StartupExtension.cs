using Core.ApplicationService;
using Core.ApplicationService.Contracts;
using Core.ApplicationService.Implementation;
using Core.DomainModel.Entities;
using Core.DomainService;
using Core.DomainService.Repositoy;
using Infrastructure.DataBase.Repository;
using Infrastructure.SQLServer;
using Microsoft.Extensions.DependencyInjection;

namespace DependencyInjection
{
    public static class StartupExtension
    {
        public static IServiceCollection SetInjection(this IServiceCollection services)
        {
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IEntityService, EntityService>();
            services.AddScoped<IEmailService, EmailService>();

            services.AddScoped(typeof(IBaseRepository<Bank, int>), typeof(BankRepository));
            services.AddScoped(typeof(IBaseRepository<Branch, int>), typeof(BranchRepository));

            services.AddScoped(typeof(IBankService), typeof(BankService));
            services.AddScoped(typeof(IBranchService), typeof(BranchService));

            return services;
        }

    }
}