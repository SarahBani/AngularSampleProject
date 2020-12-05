using Core.DomainModel.Entities;
using Core.DomainService;
using DependencyInjection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using System;
using System.IO;
using Core.DomainModel;
using UserInterface.GraphQL.Schemas;
using UserInterface.GraphQL.Queries;
using UserInterface.GraphQL.Types;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using GraphQL;
using GraphQL.Server;
using GraphQL.Server.Ui.Playground;
using GraphQL.Types;
using GraphQL.NewtonsoftJson;

namespace WebApplication
{
    public class Startup
    {

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            WebRequestConfig.Configure(this.Configuration);
            string connectionString = Utility.GetConnectionString(this.Configuration);
            services.AddDbContext<MyDataBaseContext>(options => options.UseSqlServer(connectionString));
            services.Configure<MongoDBDatabaseSettings>(Configuration.GetSection(nameof(MongoDBDatabaseSettings)));

            services.SetInjection();

            services.AddSingleton<IDocumentWriter, DocumentWriter>();
            services.AddSingleton<IDocumentExecuter, DocumentExecuter>();
            services.AddScoped<HotelType>();
            services.AddScoped<HotelRoomType>();
            services.AddScoped<CityType>();
            services.AddScoped<CountryType>();
            services.AddScoped<HotelInputType>();
            services.AddScoped<GraphQuery>();
            services.AddScoped<GraphMutation>();
            //services.AddScoped<GraphSchema>();
            services.AddScoped<ISchema, GraphSchema>();

            services.AddGraphQL(options =>
            {
                options.EnableMetrics = true;
            })
            .AddErrorInfoProvider(opt =>
            {
                opt.ExposeExceptionStackTrace = true;
            })
            .AddSystemTextJson()
            .AddGraphTypes(ServiceLifetime.Scoped)
            .AddDataLoader();

            services.Configure<KestrelServerOptions>(options => options.AllowSynchronousIO = true);
            services.Configure<IISServerOptions>(options => options.AllowSynchronousIO = true);

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.SetIsOriginAllowed(_ => true)
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());
            });
            services.AddControllers();
            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
            //services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_3_0)
            //    .ConfigureApiBehaviorOptions(options =>
            //    {
            //        options.SuppressConsumesConstraintForFormFileParameters = true;
            //        options.SuppressInferBindingSourcesForParameters = true;
            //        options.SuppressModelStateInvalidFilter = true;
            //        options.SuppressMapClientErrors = true;
            //    });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, MyDataBaseContext dbContext)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
                app.UseSpaStaticFiles();
            }

            dbContext.Database.EnsureCreated();
            //dbContext.Database.Migrate();

            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseCorsMiddleware();
            app.UseCors("CorsPolicy");

            app.UseStaticFiles();
            app.UseStaticFiles(new StaticFileOptions()
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), @"Resources")),
                RequestPath = new PathString("/Resources")
            });

            // comment the following code if u want to run from GraphQLController
            // add http for Schema at default url http://*DOMAIN*/graphql
            //app.UseGraphQL<ISchema>();
            app.UseGraphQL<ISchema>("/graphql");

            app.UseGraphiQLServer(); // to explorer API navigate http://*DOMAIN*/ui/graphiql
            app.UseGraphQLPlayground(new GraphQLPlaygroundOptions()); //to explorer API navigate http://*DOMAIN*/ui/playground
            //app.UseGraphQLPlayground(new GraphQLPlaygroundOptions
            //{
            //    GraphQLEndPoint = "/graphql"  // default GraphQL endpoint  
            //});

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";
                spa.Options.StartupTimeout = new TimeSpan(0, 10, 0);

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                    spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");
                }
            });
        }
    }
}
