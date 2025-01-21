using Application.Validations.Products;
using FluentValidation.AspNetCore;
using Infrastructure.Filters;
using Persistence;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddPersistenceServices();
builder.Services.AddCors(options => options.AddDefaultPolicy(
    policy => policy.WithOrigins("http://localhost:4200", "https://localhost:4200").AllowAnyMethod().AllowAnyHeader()
    ));

builder.Services.AddControllers(options => options.Filters.Add<ValidationFilter>())
    .AddFluentValidation(configuration => configuration.RegisterValidatorsFromAssemblyContaining<CreateProductValidation>())
    .ConfigureApiBehaviorOptions(options=>options.SuppressModelStateInvalidFilter = false);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
