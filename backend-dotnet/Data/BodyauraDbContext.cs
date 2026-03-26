using Bodyaura.OrderService.Models;
using Microsoft.EntityFrameworkCore;

namespace Bodyaura.OrderService.Data;

public class BodyauraDbContext : DbContext
{
    public BodyauraDbContext(DbContextOptions<BodyauraDbContext> options) : base(options) { }

    public DbSet<Order> Orders => Set<Order>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasIndex(o => o.OrderNumber).IsUnique();

            entity.Property(o => o.PaymentMethod)
                  .HasConversion<string>()
                  .HasMaxLength(20);

            entity.Property(o => o.Status)
                  .HasConversion<string>()
                  .HasMaxLength(20);

            entity.Property(o => o.UnitPrice).HasColumnType("decimal(8,2)");
            entity.Property(o => o.TotalPrice).HasColumnType("decimal(10,2)");

            entity.HasQueryFilter(o => o.Status != OrderStatus.Cancelled);
        });
    }
}
