using System.ComponentModel.DataAnnotations;
using Bodyaura.OrderService.Models;

namespace Bodyaura.OrderService.DTOs;

// ============================================================
// Request DTOs
// ============================================================

public record CreateOrderRequest(
    [Required][MinLength(3)] string CustomerName,
    [Required][EmailAddress] string Email,
    [Required][RegularExpression(@"^\d{10}$")] string Phone,
    [Required][MinLength(10)] string Address,
    [Required] string City,
    [Required] string State,
    [Required][RegularExpression(@"^\d{5}$")] string ZipCode,
    [Range(1, 99)] int Quantity,
    PaymentMethod PaymentMethod,
    string? Notes,
    // These may come from the Next.js API (pre-calculated)
    string? OrderNumber = null,
    decimal? TotalPrice = null
);

public record UpdateOrderStatusRequest(
    [Required] OrderStatus Status
);

// ============================================================
// Response DTOs
// ============================================================

public record OrderResponse(
    int Id,
    string OrderNumber,
    string CustomerName,
    string Email,
    string Phone,
    string Address,
    string City,
    string State,
    string ZipCode,
    int Quantity,
    decimal UnitPrice,
    decimal TotalPrice,
    string PaymentMethod,
    string? Notes,
    string Status,
    DateTime CreatedAt
);

public record OrderConfirmationResponse(
    string OrderNumber,
    string CustomerName,
    decimal TotalPrice,
    int Quantity,
    string EstimatedDelivery,
    string Message = "Pedido registrado correctamente"
);

public record ApiResponse<T>(
    bool Success,
    T? Data,
    string? Error = null,
    string? Message = null
);

// ============================================================
// Extensions
// ============================================================

public static class OrderMappingExtensions
{
    public static OrderResponse ToResponse(this Models.Order order) => new(
        order.Id,
        order.OrderNumber,
        order.CustomerName,
        order.Email,
        order.Phone,
        order.Address,
        order.City,
        order.State,
        order.ZipCode,
        order.Quantity,
        order.UnitPrice,
        order.TotalPrice,
        order.PaymentMethod.ToString(),
        order.Notes,
        order.Status.ToString(),
        order.CreatedAt
    );
}
