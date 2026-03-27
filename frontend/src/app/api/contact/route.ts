import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { prisma } from '@/lib/prisma';
import { contactSchema } from '@/lib/validations';
import type { ApiResponse } from '@/types';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || process.env.SMTP_USER!;

function buildContactEmail(params: { name: string; email: string; message: string }): string {
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
            ✉️ NUEVO MENSAJE DE CONTACTO
          </p>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding:36px 40px;">
          <p style="margin:0 0 20px;font-size:15px;color:#555;line-height:1.6;">
            Has recibido un nuevo mensaje a través del formulario de contacto de tu sitio web.
          </p>

          <table width="100%" cellpadding="0" cellspacing="0"
                 style="border:1px solid #E8E3DA;border-radius:12px;overflow:hidden;margin-bottom:20px;">
            <tr>
              <td style="padding:11px 18px;font-size:13px;color:#888;background:#F5F0E8;width:140px;">Nombre</td>
              <td style="padding:11px 18px;font-size:13px;color:#2C2C2C;">${params.name}</td>
            </tr>
            <tr style="border-top:1px solid #E8E3DA;">
              <td style="padding:11px 18px;font-size:13px;color:#888;background:#F5F0E8;">Email</td>
              <td style="padding:11px 18px;font-size:13px;">
                <a href="mailto:${params.email}" style="color:#4A6741;">${params.email}</a>
              </td>
            </tr>
            <tr style="border-top:1px solid #E8E3DA;">
              <td style="padding:11px 18px;font-size:13px;color:#888;background:#F5F0E8;">Mensaje</td>
              <td style="padding:11px 18px;font-size:13px;color:#2C2C2C;white-space:pre-wrap;">${params.message}</td>
            </tr>
          </table>

          <!-- Reply CTA -->
          <p style="margin:0 0 12px;font-size:14px;color:#555;line-height:1.6;">
            Puedes responder a este correo para contactar directamente a ${params.name}:
          </p>
          <a href="mailto:${params.email}?subject=Respuesta a tu mensaje en Bodyaura"
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
</html>`;
}

function buildClientGreetingEmail(name: string): string {
  return `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#F5F0E8;font-family:Georgia,serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0"
           style="background:#FAFAF8;border-radius:20px;overflow:hidden;max-width:600px;width:100%;">
      <tr>
        <td style="background:linear-gradient(135deg,#2A3D27,#4A6741);padding:36px 40px;text-align:center;">
          <p style="margin:0;font-size:30px;font-weight:bold;color:#FAFAF8;letter-spacing:0.05em;">
            Body<span style="color:#C8A97E;">aura</span>
          </p>
        </td>
      </tr>
      <tr>
        <td style="padding:36px 40px; text-align:center;">
          <h2 style="color:#2C2C2C; margin-bottom:16px;">¡Hola ${name}!</h2>
          <p style="font-size:15px;color:#555;line-height:1.6;">
            Hemos recibido tu mensaje correctamente y nos pondremos en contacto contigo lo antes posible para atender tu solicitud.
          </p>
          <p style="font-size:15px;color:#555;line-height:1.6; margin-top:20px;">
            ¡Gracias por preferir Bodyaura!
          </p>
        </td>
      </tr>
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
</html>`;
}

export async function POST(req: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    const body = await req.json();

    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.errors[0]?.message || 'Datos inválidos' },
        { status: 400 }
      );
    }

    const { name, email, message } = parsed.data;

    try {
      await prisma.contact.create({
        data: { name, email, message },
      });
    } catch (dbError) {
      console.warn('[Contact API] DB unavailable:', dbError);
    }

    // Enviar notificaciones por Nodemailer
    try {
      if (process.env.SMTP_USER) {
        // Al dueño de la tienda
        await transporter.sendMail({
          from: `"Bodyaura" <${process.env.SMTP_USER}>`,
          to: NOTIFY_EMAIL,
          replyTo: email,
          subject: `✉️ Nuevo mensaje de ${name}`,
          html: buildContactEmail({ name, email, message }),
        });

        // Al cliente (confirmación automática)
        await transporter.sendMail({
          from: `"Bodyaura" <${process.env.SMTP_USER}>`,
          to: email, // Correo del usuario que llenó el form
          subject: `Hemos recibido tu mensaje - Bodyaura`,
          html: buildClientGreetingEmail(name),
        });

        console.log(`[Nodemailer] Notificaciones de contacto enviadas a ${NOTIFY_EMAIL} y al cliente`);
      } else {
        console.warn('Faltan credenciales SMTP_USER.');
      }
    } catch (emailError) {
      console.error('[Nodemailer] Error enviando contacto:', emailError);
    }

    return NextResponse.json(
      { success: true, message: 'Mensaje recibido correctamente' },
      { status: 201 }
    );
  } catch (err) {
    console.error('[Contact API]', err);
    return NextResponse.json({ success: false, error: 'Error interno' }, { status: 500 });
  }
}
