using System;
using ffmpeg_conversion_helper.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;
using ffmpeg_conversion_helper.Application.Interfaces;
using ffmpeg_conversion_helper.Domain.Models;
using Microsoft.AspNetCore.Builder;
using ffmpeg_conversion_helper.Application.Services;
using ffmpeg_conversion_helper.Application.ServicesData;
using Microsoft.AspNetCore.Identity;
using ffmpeg_conversion_helper.Application.Repository;
using ffmpeg_conversion_helper.Infrastructure.Repositories;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        builder.Services.AddHttpContextAccessor();
        builder.Services.AddDbContext<IAppDbContext, AppDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DbContext")));
        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddAuthentication(options =>
        {
            options.DefaultScheme = IdentityConstants.ApplicationScheme;
            options.DefaultChallengeScheme = IdentityConstants.ApplicationScheme;
        })
        .AddCookie(IdentityConstants.ApplicationScheme).AddBearerToken(IdentityConstants.BearerScheme);
        builder.Services.AddIdentityCore<User>().AddEntityFrameworkStores<AppDbContext>().AddApiEndpoints();
        builder.Services.AddAuthorization();
        builder.Services.AddScoped<IUserDataRepository, UserDataRepository>();
        builder.Services.AddScoped<ICommandPostRepository, CommandPostRepository>();
        builder.Services.AddTransient<IEmailService, EmailService>();
        builder.Services.Configure<EmailConfiguration>(builder.Configuration.GetSection("EmailConfiguration"));
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowSpecificOrigin",
                builder => builder
                    .WithOrigins("http://localhost:3000")
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials());
        });
        builder.Services.AddSwaggerGen(o =>
        {
            o.CustomSchemaIds(s =>
            {
                var name = s.FullName;
                if (name != null)
                {
                    name = name.Replace("+", "_");
                }
                return name;
            });
        });
        builder.Services.Configure<IdentityOptions>(options =>
        {
            options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(10);
            options.Lockout.MaxFailedAccessAttempts = 5;
            options.Lockout.AllowedForNewUsers = true;
        });
        var app = builder.Build();
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }
        app.UseCors("AllowSpecificOrigin");
        app.MyMapIdentityApi<User>();
        app.UseAuthentication();
        app.UseAuthorization();
        app.UseHttpsRedirection();
        app.MapControllers();
        app.Run();
    }
}

