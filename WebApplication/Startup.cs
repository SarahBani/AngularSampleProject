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
using GraphiQl;
using UserInterface.GraphQL.Schemas;
using UserInterface.GraphQL.Queries;
using UserInterface.GraphQL.Types;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using GraphQL;
using GraphQL.Server;
using GraphQL.Server.Ui.Playground;
using GraphQL.Types;
using UserInterface;
using GraphQL.NewtonsoftJson;
using Newtonsoft.Json;
using System.Threading.Tasks;
using Splat;
using System.Reflection;
using GraphQL.Utilities;

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
            services.AddSingleton<IDocumentExecuter, DocumentExecuter2>();
            services.AddScoped<HotelQuery>();
            services.AddScoped<HotelType>();
            services.AddScoped<HotelRoomType>();
            services.AddScoped<CityType>();
            services.AddScoped<CountryType>();
            //services.AddScoped<HotelSchema>();
            services.AddScoped<ISchema, HotelSchema>();

            //services.AddSingleton<HotelQuery>();

            //services.AddSingleton<ISchema, HotelSchema>();
            //services.AddGraphQL();

            services.AddGraphQL(options =>
            {
                
                options.EnableMetrics = true;
            })
            .AddErrorInfoProvider(opt =>
            {
                opt.ExposeExceptionStackTrace = true;
            })
            .AddSystemTextJson()
           .AddGraphTypes(ServiceLifetime.Transient)
            .AddDataLoader();

            //     services.AddScoped<IServiceProvider>(
            //    s => new FuncServiceProvider(
            //        s.GetRequiredService<HotelSchema>()  
            //    )
            //);

            //services.AddGraphQL(options =>
            //{
            //    options.EndPoint = "/graphql";
            //});

            ////***< My services >*** 
            //services.AddHttpClient<ReservationHttpGraphqlClient>(x => x.BaseAddress = new Uri(Configuration["GraphQlEndpoint"]));
            //services.AddSingleton(t => new GraphQLClient(Configuration["GraphQlEndpoint"]));
            //services.AddSingleton<ReservationGraphqlClient>();
            ////***</ My services >*** 
            ///
            //          services.AddSingleton<ISchema>(
            //s => new HotelSchema(new FuncDependencyResolver(type => (IGraphType)s.GetRequiredService(type))));

            //***< GraphQL Services >*** 
            //services.AddScoped<IDependencyResolver>(x =>
            //    new FuncDependencyResolver(x.GetRequiredService));

            //services.AddGraphQL(x =>
            //{
            //    x.ExposeExceptions = true; //set true only in dev mode.
            //})
            //    .AddGraphTypes(ServiceLifetime.Scoped)
            //    .AddUserContextBuilder(httpContext => httpContext.User)
            //    .AddDataLoader();

            //***</ GraphQL Services >*** 

            // services.AddTransient<IDependencyResolver>(x => new FuncDependencyResolver(x.GetRequiredService));
            //services.AddTransient<HotelSchema>();
            //services.AddGraphQL(o => o.ExposeExceptions = true)
            //        .AddGraphTypes(ServiceLifetime.Transient);
            services.Configure<KestrelServerOptions>(options => options.AllowSynchronousIO = true);
            services.Configure<IISServerOptions>(options => options.AllowSynchronousIO = true);

            //services.AddGraphQL()
            //        .AddWebSockets()
            //        .AddGraphTypes(Assembly.GetAssembly(typeof(HotelSchema)));



            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.SetIsOriginAllowed(_ => true)
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());
            });
            services.AddControllersWithViews();
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
            }

            dbContext.Database.EnsureCreated();
            //dbContext.Database.Migrate();

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting();
            app.UseCorsMiddleware();
            app.UseCors("CorsPolicy");

            app.UseStaticFiles();
            app.UseStaticFiles(new StaticFileOptions()
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), @"Resources")),
                RequestPath = new PathString("/Resources")
            });

            // add http for Schema at default url http://*DOMAIN*/graphql
            app.UseGraphQL<ISchema>();
           // app.UseGraphQL<ISchema>("/graphql");
            //app.UseGraphQL<HotelSchema>();
            app.UseGraphQLPlayground(new GraphQLPlaygroundOptions()); //to explorer API navigate http://*DOMAIN*/ui/playground

            //app.UseEndpoints(endpoints =>
            //{
            //    endpoints.MapGraphQl<HotelSchema>();
            //});
            //app.UseEndpoints(endpoints =>
            //{
            //    endpoints.MapGet("/", async context =>
            //    {
            //        await Task.Run(() => context.Response.Redirect("/hotel/graphql", permanent: true));
            //    });
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

        //private static void InitializeMapper()
        //{
        //    Mapper.Initialize(x =>
        //    {
        //        x.CreateMap<Hotel, GuestModel>();
        //        x.CreateMap<HotelRoom, RoomModel>();
        //    });
        //}

        private async void sss()
        {
            /* Schema first approach */
            var schemaFirst = Schema.For(@"
                type Query {
                    hello: String
                }
            ");

            /* Code first approach */
            var codeFirst = new Schema { Query = new HelloWorldQuery() };

            var schemaFirstJson = await schemaFirst.ExecuteAsync(_ =>
            {
                _.Query = "{ hello }";
                _.Root = new { Hello = "world" };
            });

            var codeFirstJson = await codeFirst.ExecuteAsync(_ =>
            {
                _.Query = "{ hello }";
            });

            Console.WriteLine("\nSchema First Approach\n");
            Console.WriteLine(schemaFirstJson);
            Console.WriteLine("\nCode First Approach\n");
            Console.WriteLine(codeFirstJson);
        }

    }
}
