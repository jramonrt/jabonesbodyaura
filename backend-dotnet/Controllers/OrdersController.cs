using Bodyaura.OrderService.DTOs;
using Bodyaura.OrderService.Models;
using Bodyaura.OrderService.Services;
using Microsoft.AspNetCore.Mvc;

namespace Bodyaura.OrderService.Controllers;

[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class OrdersController : ControllerBase
{
    private readonly IOrderService _orderService;
    private readonly ILogger<OrdersController> _logger;

    public OrdersController(IOrderService orderService, ILogger<OrdersController> logger)
    {
        _orderService = orderService;
        _logger = logger;
    }

    /// <summary>Create a new order</summary>
    [HttpPost]
    [ProducesResponseType(typeof(ApiResponse<OrderConfirmationResponse>), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> CreateOrder([FromBody] CreateOrderRequest request)
    {
        // API key check (simple auth for microservice)
        if (!IsAuthorized())
            return Unauthorized(new ApiResponse<object>(false, null, "API key inválida"));

        try
        {
            var confirmation = await _orderService.CreateOrderAsync(request);
            return CreatedAtAction(
                nameof(GetOrderByNumber),
                new { orderNumber = confirmation.OrderNumber },
                new ApiResponse<OrderConfirmationResponse>(true, confirmation)
            );
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating order");
            return StatusCode(500, new ApiResponse<object>(false, null, "Error interno al crear el pedido"));
        }
    }

    /// <summary>Get order by order number</summary>
    [HttpGet("{orderNumber}")]
    [ProducesResponseType(typeof(ApiResponse<OrderResponse>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetOrderByNumber(string orderNumber)
    {
        var order = await _orderService.GetOrderByNumberAsync(orderNumber);
        if (order is null)
            return NotFound(new ApiResponse<object>(false, null, "Pedido no encontrado"));

        return Ok(new ApiResponse<OrderResponse>(true, order));
    }

    /// <summary>List all orders (paginated)</summary>
    [HttpGet]
    [ProducesResponseType(typeof(ApiResponse<IEnumerable<OrderResponse>>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAllOrders([FromQuery] int page = 1, [FromQuery] int pageSize = 20)
    {
        if (!IsAuthorized())
            return Unauthorized(new ApiResponse<object>(false, null, "API key inválida"));

        var orders = await _orderService.GetAllOrdersAsync(page, pageSize);
        return Ok(new ApiResponse<IEnumerable<OrderResponse>>(true, orders));
    }

    /// <summary>Update order status</summary>
    [HttpPatch("{id}/status")]
    [ProducesResponseType(typeof(ApiResponse<OrderResponse>), StatusCodes.Status200OK)]
    public async Task<IActionResult> UpdateOrderStatus(int id, [FromBody] UpdateOrderStatusRequest request)
    {
        if (!IsAuthorized())
            return Unauthorized(new ApiResponse<object>(false, null, "API key inválida"));

        var updated = await _orderService.UpdateOrderStatusAsync(id, request.Status);
        if (updated is null)
            return NotFound(new ApiResponse<object>(false, null, "Pedido no encontrado"));

        return Ok(new ApiResponse<OrderResponse>(true, updated, Message: "Estado actualizado"));
    }

    private bool IsAuthorized()
    {
        var apiKey = HttpContext.Request.Headers["X-Api-Key"].FirstOrDefault();
        var expectedKey = HttpContext.RequestServices
            .GetRequiredService<IConfiguration>()["ApiKey"];

        return string.IsNullOrEmpty(expectedKey) || apiKey == expectedKey;
    }
}
