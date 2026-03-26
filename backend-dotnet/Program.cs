using Bodyaura.OrderService.Data;
using Bodyaura.OrderService.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Serilog;

// ============================================================
// Bodyaura Order Microservice — .NET 10
// ============================================================

Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .WriteTo.File("logs/bodyaura-.log", rollingInterval: RollingInterval.Day)
    .CreateLogger();

var builder = WebApplication.CreateBuilder(args);

builder.Host.UseSerilog();

// Services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Bodyaura Order Service",
        Version = "v1",
        Description = "Microservicio de gestión de pedidos para Bodyaura"
    });
});

// Database — MySQL via Pomelo
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? "Server=localhost;Database=bodyaura_db;User=bodyaura_user;Password=bodyaura_pass;";

builder.Services.AddDbContext<BodyauraDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

// Application services
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<IEmailService, EmailService>();

// CORS
builder.Services.AddCors(opts =>
    opts.AddPolicy("BodyauraCors", policy =>
        policy.WithOrigins("http://localhost:3000", "https://bodyaura.mx")
              .AllowAnyHeader()
              .AllowAnyMethod()));

var app = builder.Build();

// Pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Bodyaura Order Service v1"));
}

app.UseSerilogRequestLogging();
app.UseCors("BodyauraCors");
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

// Health check
app.MapGet("/health", () => Results.Ok(new { status = "healthy", service = "Bodyaura Order Service", timestamp = DateTime.UtcNow }));

app.Run();