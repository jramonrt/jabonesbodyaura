import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { prisma } from '@/lib/prisma';
import { orderSchema } from '@/lib/validations';
import { generateOrderNumber, PRODUCT_PRICE } from '@/lib/utils';
import type { ApiResponse, OrderConfirmation } from '@/types';

const resend = new Resend(process.env.RESEND_API_KEY);

// Email que recibe TODAS las notificaciones de pedidos
// Debe ser el mismo con el que te registraste en Resend
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL!;

function buildOrderEmail(params: {
  customerName: string;
  customerEmail: string;
  orderNumber: string;
  quantity: number;
  totalPrice: number;
  address: string;
  city: string;
  state: string;
  paymentMethod: string;
  estimatedDelivery: string;
  notes?: string;
}): string {
  const paymentLabel =
    params.paymentMethod === 'TRANSFER' ? 'Transferencia bancaria' : 'Efectivo al recoger';

  return `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#F5F0E8;font-family:Georgia,serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0"
           style="background:#FAFAF8;border-radius:20px;overflow:hidden;max-width:600px;width:100%;">

      <!-- Header -->
      <tr>
        <td style="background:linear-gradient(135deg,#2A3D27,#4A6741);padding:36px 40px;text-align:center;">
          <p style="margin:0;font-size:30px;font-weight:bold;color:#FAFAF8;letter-spacing:0.05em;">
            Body<span style="color:#C8A97E;">aura</span>
          </p>
          <p style="margin:6px 0 0;font-style:italic;color:rgba(250,250,248,0.6);font-size:13px;">
            "Siente tu piel, habita tu momento."
          </p>
        </td>
      </tr>

      <!-- Alert banner -->
      <tr>
        <td style="background:#C8A97E;padding:12px 40px;text-align:center;">
          <p style="margin:0;font-size:13px;font-weight:bold;color:#2C2C2C;letter-spacing:0.06em;">
            🛍️ NUEVO PEDIDO RECIBIDO — ${params.orderNumber}
          </p>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding:36px 40px;">
          <p style="margin:0 0 20px;font-size:15px;color:#555;line-height:1.6;">
            Has recibido un nuevo pedido. A continuación los datos del cliente y el detalle de la compra.
          </p>

          <!-- Customer info -->
          <p style="margin:0 0 8px;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#4A6741;font-weight:bold;">
            Datos del cliente
          </p>
          <table width="100%" cellpadding="0" cellspacing="0"
                 style="border:1px solid #E8E3DA;border-radius:12px;overflow:hidden;margin-bottom:20px;">
            <tr>
              <td style="padding:11px 18px;font-size:13px;color:#888;background:#F5F0E8;width:140px;">Nombre</td>
              <td style="padding:11px 18px;font-size:13px;color:#2C2C2C;">${params.customerName}</td>
            </tr>
            <tr style="border-top:1px solid #E8E3DA;">
              <td style="padding:11px 18px;font-size:13px;color:#888;background:#F5F0E8;">Email</td>
              <td style="padding:11px 18px;font-size:13px;">
                <a href="mailto:${params.customerEmail}" style="color:#4A6741;">${params.customerEmail}</a>
              </td>
            </tr>
            <tr style="border-top:1px solid #E8E3DA;">
              <td style="padding:11px 18px;font-size:13px;color:#888;background:#F5F0E8;">Dirección</td>
              <td style="padding:11px 18px;font-size:13px;color:#2C2C2C;">
                ${params.address}, ${params.city}, ${params.state}
              </td>
            </tr>
          </table>

          <!-- Order detail -->
          <p style="margin:0 0 8px;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#4A6741;font-weight:bold;">
            Detalle del pedido
          </p>
          <table width="100%" cellpadding="0" cellspacing="0"
                 style="border:1px solid #E8E3DA;border-radius:12px;overflow:hidden;margin-bottom:20px;">
            <tr>
              <td style="padding:11px 18px;font-size:13px;color:#888;background:#F5F0E8;width:140px;">Producto</td>
              <td style="padding:11px 18px;font-size:13px;color:#2C2C2C;">Jabón Artesanal Bodyaura x ${params.quantity}</td>
            </tr>
            <tr style="border-top:1px solid #E8E3DA;">
              <td style="padding:11px 18px;font-size:13px;color:#888;background:#F5F0E8;">Pago</td>
              <td style="padding:11px 18px;font-size:13px;color:#2C2C2C;">${paymentLabel}</td>
            </tr>
            <tr style="border-top:1px solid #E8E3DA;">
              <td style="padding:11px 18px;font-size:13px;color:#888;background:#F5F0E8;">Entrega est.</td>
              <td style="padding:11px 18px;font-size:13px;color:#2C2C2C;">${params.estimatedDelivery}</td>
            </tr>
            ${params.notes ? `
            <tr style="border-top:1px solid #E8E3DA;">
              <td style="padding:11px 18px;font-size:13px;color:#888;background:#F5F0E8;">Notas</td>
              <td style="padding:11px 18px;font-size:13px;color:#2C2C2C;">${params.notes}</td>
            </tr>` : ''}
            <tr style="border-top:2px solid #E8E3DA;">
              <td style="padding:14px 18px;font-size:14px;font-weight:bold;color:#2C2C2C;background:#F5F0E8;">TOTAL</td>
              <td style="padding:14px 18px;font-size:18px;font-weight:bold;color:#4A6741;">
                Q${params.totalPrice.toLocaleString('es-GT')} Q
              </td>
            </tr>
          </table>

          <!-- Reply CTA -->
          <p style="margin:0 0 12px;font-size:14px;color:#555;line-height:1.6;">
            Responde a este correo o contacta al cliente directamente para confirmar el pedido:
          </p>
          <a href="mailto:${params.customerEmail}?subject=Confirmación de pedido ${params.orderNumber} — Bodyaura"
             style="display:inline-block;background:#4A6741;color:#fff;text-decoration:none;
                    padding:12px 28px;border-radius:50px;font-size:14px;font-family:sans-serif;">
            Responder al cliente
          </a>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background:#F5F0E8;padding:20px 40px;text-align:center;border-top:1px solid #E8E3DA;">
          <p style="margin:0;font-size:11px;color:#aaa;">
            © ${new Date().getFullYear()} Bodyaura · jabonesbodyaura@gmail.com
          </p>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>`.trim();
}

// ─── POST /api/orders ─────────────────────────────────────
export async function POST(req: NextRequest): Promise<NextResponse<ApiResponse<OrderConfirmation>>> {
  try {
    const body = await req.json();

    const parsed = orderSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.errors[0]?.message || 'Datos inválidos' },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const unitPrice = PRODUCT_PRICE;
    const totalPrice = unitPrice * data.quantity;
    const orderNumber = generateOrderNumber();

    // Guardar en DB
    try {
      await prisma.order.create({
        data: {
          orderNumber,
          customerName: data.customerName,
          email: data.email,
          phone: data.phone,
          address: data.address,
          city: data.city,
          state: data.state,
          zipCode: data.zipCode,
          quantity: data.quantity,
          unitPrice,
          totalPrice,
          paymentMethod: data.paymentMethod as 'TRANSFER' | 'CASH',
          notes: data.notes ?? null,
          status: 'PENDING',
        },
      });
    } catch (dbError) {
      console.warn('[Orders API] DB no disponible:', dbError);
    }

    // Entrega estimada
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 4);
    const estimatedDelivery = deliveryDate.toLocaleDateString('es-GT', {
      weekday: 'long', month: 'long', day: 'numeric',
    });

    // ─── Resend: notificación a TU email ──────────────────
    // (no al cliente, ya que no tienes dominio verificado)

    try {


      console.log('=== RESEND DEBUG ===');
      console.log('API KEY:', process.env.RESEND_API_KEY ? `OK: ${process.env.RESEND_API_KEY.slice(0, 8)}...` : '❌ UNDEFINED');
      console.log('NOTIFY_EMAIL:', NOTIFY_EMAIL ?? '❌ UNDEFINED');
      console.log('CUSTOMER EMAIL:', data.email);

      await resend.emails.send({


        

        from: 'Bodyaura <onboarding@resend.dev>',
        to: NOTIFY_EMAIL,                          // tu email registrado en Resend
        replyTo: data.email,                      // al responder, va directo al cliente
        subject: `🛍️ Nuevo pedido ${orderNumber} — ${data.customerName}`,
        html: buildOrderEmail({
          customerName: data.customerName,
          customerEmail: data.email,
          orderNumber,
          quantity: data.quantity,
          totalPrice,
          address: data.address,
          city: data.city,
          state: data.state,
          paymentMethod: data.paymentMethod,
          estimatedDelivery,
          notes: data.notes,
        }),
      });
      console.log(`[Resend] Notificación enviada a ${NOTIFY_EMAIL}`);
    } catch (emailError) {
      console.error('[Resend] Error:', emailError);
    }

    return NextResponse.json(
      {
        success: true,
        data: { orderNumber, customerName: data.customerName, totalPrice, quantity: data.quantity, estimatedDelivery },
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('[Orders API]', err);
    return NextResponse.json({ success: false, error: 'Error interno del servidor' }, { status: 500 });
  }
}

// ─── GET /api/orders ──────────────────────────────────────
export async function GET(): Promise<NextResponse> {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
    return NextResponse.json({ success: true, data: orders });
  } catch (err) {
    console.error('[Orders API] GET:', err);
    return NextResponse.json({ success: false, error: 'Error al obtener pedidos' }, { status: 500 });
  }
}