using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Bodyaura.OrderService.Models;

// ============================================================
// Order Model
// ============================================================
[Table("orders")]
public class Order
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Required]
    [Column("order_number")]
    [MaxLength(20)]
    public string OrderNumber { get; set; } = string.Empty;

    [Required]
    [Column("customer_name")]
    [MaxLength(150)]
    public string CustomerName { get; set; } = string.Empty;

    [Required]
    [Column("email")]
    [MaxLength(255)]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    [Column("phone")]
    [MaxLength(15)]
    public string Phone { get; set; } = string.Empty;

    [Required]
    [Column("address")]
    public string Address { get; set; } = string.Empty;

    [Required]
    [Column("city")]
    [MaxLength(100)]
    public string City { get; set; } = string.Empty;

    [Required]
    [Column("state")]
    [MaxLength(100)]
    public string State { get; set; } = string.Empty;

    [Required]
    [Column("zip_code")]
    [MaxLength(10)]
    public string ZipCode { get; set; } = string.Empty;

    [Range(1, 99)]
    [Column("quantity")]
    public int Quantity { get; set; }

    [Column("unit_price", TypeName = "decimal(8,2)")]
    public decimal UnitPrice { get; set; }

    [Column("total_price", TypeName = "decimal(10,2)")]
    public decimal TotalPrice { get; set; }

    [Column("payment_method")]
    public PaymentMethod PaymentMethod { get; set; }

    [Column("notes")]
    public string? Notes { get; set; }

    [Column("status")]
    public OrderStatus Status { get; set; } = OrderStatus.Pending;

    [Column("created_at")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [Column("updated_at")]
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

// ============================================================
// Enums
// ============================================================
public enum PaymentMethod
{
    Transfer,
    Cash
}

public enum OrderStatus
{
    Pending,
    Confirmed,
    Shipped,
    Delivered,
    Cancelled
}
