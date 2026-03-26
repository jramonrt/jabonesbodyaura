using Bodyaura.OrderService.Models;

namespace Bodyaura.OrderService.Services;

public interface IEmailService
{
    Task SendOrderConfirmationAsync(Order order);
}

public class EmailService : IEmailService
{
    private readonly IConfiguration _config;
    private readonly ILogger<EmailService> _logger;

    public EmailService(IConfiguration config, ILogger<EmailService> logger)
    {
        _config = config;
        _logger = logger;
    }

    public async Task SendOrderConfirmationAsync(Order order)
    {
        _logger.LogInformation(
            "📧 Sending confirmation email to {Email} for order {OrderNumber}",
            order.Email,
            order.OrderNumber
        );

        // Simulate async email sending
        await Task.Delay(100);

        _logger.LogInformation(
            "✅ Confirmation email sent to {Email}",
            order.Email
        );
    }

    private string BuildConfirmationHtml(Order order)
    {
        var css = "<style>" +
            "body { font-family: Georgia, serif; color: #2C2C2C; background: #FAFAF8; margin: 0; padding: 0; }" +
            ".container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }" +
            ".header { text-align: center; margin-bottom: 32px; }" +
            ".logo { font-family: Georgia; font-size: 28px; color: #4A6741; font-weight: bold; }" +
            ".order-box { background: #F5F0E8; border-radius: 16px; padding: 24px; margin: 24px 0; }" +
            ".order-number { font-size: 22px; font-weight: bold; color: #4A6741; }" +
            ".footer { text-align: center; color: #888; font-size: 12px; margin-top: 40px; }" +
            "</style>";

        return "<!DOCTYPE html>" +
            "<html lang=\"es\"><head><meta charset=\"UTF-8\">" +
            css +
            "</head><body>" +
            "<div class=\"container\">" +
            "<div class=\"header\">" +
            "<div class=\"logo\">Bodyaura</div>" +
            "<p style=\"color:#888; font-style:italic; font-size:14px;\">\"Siente tu piel, habita tu momento.\"</p>" +
            "</div>" +
            $"<h2 style=\"color:#2C2C2C\">¡Pedido Confirmado, {order.CustomerName}!</h2>" +
            "<p>Gracias por tu compra. Hemos recibido tu pedido y lo procesaremos a la brevedad.</p>" +
            "<div class=\"order-box\">" +
            "<p style=\"margin:0 0 8px 0; color:#888; font-size:12px;\">Número de pedido</p>" +
            $"<div class=\"order-number\">{order.OrderNumber}</div>" +
            "<hr style=\"border:none; border-top:1px solid #D5CFC4; margin:16px 0\">" +
            $"<p><strong>Producto:</strong> Jabon Artesanal Bodyaura x {order.Quantity}</p>" +
            $"<p><strong>Total:</strong> {order.TotalPrice:N0} Q</p>" +
            $"<p><strong>Metodo de pago:</strong> {order.PaymentMethod}</p>" +
            $"<p><strong>Direccion:</strong> {order.Address}, {order.City}, {order.State}</p>" +
            "</div>" +
            "<p>Si tienes alguna duda, escribenos a <a href=\"mailto:jabonesbodyaura@gmail.com\" style=\"color:#4A6741\">jabonesbodyaura@gmail.com</a></p>" +
            $"<div class=\"footer\"><p>Copyright {DateTime.Now.Year} Bodyaura.</p></div>" +
            "</div></body></html>";
    }
}