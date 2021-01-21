using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using MISA.ApplicationCore.Interfaces;
using MISA.ApplicationCore.Services;
using MISA.CukCuk.Api.Middleware;
using MISA.Infrastructure.Repository;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace MISA.CukCuk.Api
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
            //config cors
            services.AddCors();
            services.AddControllers()
                //config tùy chỉnh response trả về chữ hoa
                .AddNewtonsoftJson(options =>
                                     {
                                         options.SerializerSettings.ContractResolver = new DefaultContractResolver();
                                         options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                                     });
            //config DI
            services.AddScoped(typeof(IBaseService<>), typeof(BaseService<>));
            services.AddScoped(typeof(IBaseRepository<>), typeof(BaseRepository<>));
            services.AddScoped<ICustomerRepository, CustomerRepository>();
            services.AddScoped<ICustomerService, CustomerService>();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "MISA.CukCuk.Api", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "MISA.CukCuk.Api v1"));
            }
            //confix exception
            app.UseMiddleware<ErrorHandlingMiddleware>();

            app.UseRouting();

            //config cors
            app.UseCors(option => option.AllowAnyMethod().AllowAnyOrigin().AllowAnyHeader());

            app.UseAuthorization();
            //mặc định file khởi chạy
            app.UseDefaultFiles();

            //cấu hình đọc các file tĩnh html, hình ảnh
            app.UseStaticFiles();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
