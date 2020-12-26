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
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Core.DomainModel.Settings;
using System.Threading.Tasks;
using WebApplication.Helpers;

namespace WebApplication
{
    public class Startup
    {

        #region Properties

        public IConfiguration Configuration { get; }

        #endregion /Properties

        #region Constructors

        public Startup(IConfiguration configuration)
        {
            this.Configuration = configuration;
        }

        #endregion /Constructors

        #region Methods

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

            /// custom user & Role with int key
            services.AddIdentity<User, Role>(options =>
            {
                options.SignIn.RequireConfirmedEmail = false;
                options.Password.RequiredLength = 6;
                options.Password.RequireLowercase = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireDigit = false;
            })
                .AddRoles<Role>()
                .AddEntityFrameworkStores<MyDataBaseContext>()
                //.AddDefaultUI()
                .AddDefaultTokenProviders();
            //services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            this.ConfigureAuthService(services);

            // configure strongly typed settings objects
            services.Configure<AppSettings>(Configuration.GetSection("AppSettings"));

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
            app.UseStaticFiles();
            app.UseStaticFiles(new StaticFileOptions()
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), @"Resources")),
                RequestPath = new PathString("/Resources")
            });
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseCorsMiddleware();
            app.UseCors("CorsPolicy");

            // comment the following code if u want to run from GraphQLController
            // add http for Schema at default url http://*DOMAIN*/graphql
            app.UseGraphQL<ISchema>();
            //app.UseGraphQL<ISchema>("/graphql");

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

        private void ConfigureAuthService(IServiceCollection services)
        {
            var appSettingsSection = this.Configuration.GetSection(Constant.AppSetting_AppSettings);
            var appSettings = appSettingsSection.Get<AppSettings>();
            var key = Encoding.ASCII.GetBytes(appSettings.SecretKey);

            // prevent from mapping "sub" claim to nameidentifier.
            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
            // configure jwt authentication
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                //options.ClaimsIssuer
                options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                {
                    ValidateAudience = true,
                    ValidAudience = appSettings.Audience,
                    ValidateIssuer = true,
                    ValidIssuer = appSettings.Issuer,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(key),
                    // set clockskew to zero so tokens expire exactly at token expiration time (instead of 5 minutes later)
                    ClockSkew = TimeSpan.Zero
                };
                //options.RequireHttpsMetadata = false;
                //options.Audience = appSettings.Issuer;
                //options.SaveToken = true;
                //options.Events = new JwtBearerEvents()
                //{
                //    OnAuthenticationFailed = async ctx =>
                //    {
                //        int i = 0;
                //    },
                //    OnTokenValidated = context =>
                //    {
                //        Console.WriteLine("OnTokenValidated");
                //        var identity = context.Principal.Identity;
                //        var user = context.Principal.Identity.Name;
                //        //Grab the http context user and validate the things you need to
                //        //if you are not satisfied with the validation, fail the request using the below commented code
                //        context.Fail("Unauthorized");

                //        //otherwise succeed the request
                //        return Task.CompletedTask;
                //    },
                //    OnMessageReceived = async ctx =>
                //    {
                //        int i = 0;
                //    }
                //};
            });
        }

        #endregion /Methods

    }
}
