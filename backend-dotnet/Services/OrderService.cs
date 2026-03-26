using Bodyaura.OrderService.Data;
using Bodyaura.OrderService.DTOs;
using Bodyaura.OrderService.Models;
using Microsoft.EntityFrameworkCore;

namespace Bodyaura.OrderService.Services;

// ============================================================
// Interface
// ============================================================
public interface IOrderService
{
    Task<OrderConfirmationResponse> CreateOrderAsync(CreateOrderRequest request);
    Task<OrderResponse?> GetOrderByNumberAsync(string orderNumber);
    Task<IEnumerable<OrderResponse>> GetAllOrdersAsync(int page = 1, int pageSize = 20);
    Task<OrderResponse?> UpdateOrderStatusAsync(int id, OrderStatus status);
}

// ============================================================
// Implementation
// ============================================================
public class OrderService : IOrderService
{
    private readonly BodyauraDbContext _db;
    private readonly IEmailService _emailService;
    private readonly ILogger<OrderService> _logger;

    private const decimal UNIT_PRICE = 180m;

    public OrderService(BodyauraDbContext db, IEmailService emailService, ILogger<OrderService> logger)
    {
        _db = db;
        _emailService = emailService;
        _logger = logger;
    }

    public async Task<OrderConfirmationResponse> CreateOrderAsync(CreateOrderRequest request)
    {
        // Use provided order number or generate a new one
        var orderNumber = request.OrderNumber ?? GenerateOrderNumber();
        var totalPrice = request.TotalPrice ?? (UNIT_PRICE * request.Quantity);

        var order = new Order
        {
            OrderNumber = orderNumber,
            CustomerName = request.CustomerName,
            Email = request.Email,
            Phone = request.Phone,
            Address = request.Address,
            City = request.City,
            State = request.State,
            ZipCode = request.ZipCode,
            Quantity = request.Quantity,
            UnitPrice = UNIT_PRICE,
            TotalPrice = totalPrice,
            PaymentMethod = request.PaymentMethod,
            Notes = request.Notes,
            Status = OrderStatus.Pending,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
        };

        _db.Orders.Add(order);
        await _db.SaveChangesAsync();

        _logger.LogInformation("Order {OrderNumber} created for {CustomerName}", orderNumber, request.CustomerName);

        // Fire-and-forget email confirmation
        _ = Task.Run(() => _emailService.SendOrderConfirmationAsync(order));

        var estimatedDelivery = DateTime.Now.AddDays(4).ToString("dddd, d 'de' MMMM",
            new System.Globalization.CultureInfo("es-GT"));

        return new OrderConfirmationResponse(
            OrderNumber: orderNumber,
            CustomerName: request.CustomerName,
            TotalPrice: totalPrice,
            Quantity: request.Quantity,
            EstimatedDelivery: estimatedDelivery
        );
    }

    public async Task<OrderResponse?> GetOrderByNumberAsync(string orderNumber)
    {
        var order = await _db.Orders
            .AsNoTracking()
            .FirstOrDefaultAsync(o => o.OrderNumber == orderNumber);

        return order?.ToResponse();
    }

    public async Task<IEnumerable<OrderResponse>> GetAllOrdersAsync(int page = 1, int pageSize = 20)
    {
        return await _db.Orders
            .AsNoTracking()
            .OrderByDescending(o => o.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(o => o.ToResponse())
            .ToListAsync();
    }

    public async Task<OrderResponse?> UpdateOrderStatusAsync(int id, OrderStatus status)
    {
        var order = await _db.Orders.FindAsync(id);
        if (order is null) return null;

        order.Status = status;
        order.UpdatedAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();

        _logger.LogInformation("Order {Id} status updated to {Status}", id, status);
        return order.ToResponse();
    }

    private static string GenerateOrderNumber()
    {
        var date = DateTime.Now.ToString("yyyyMMdd");
        var rand = Random.Shared.Next(1000, 9999);
        return $"BA-{date}-{rand}";
    }
}
