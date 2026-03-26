import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { contactSchema } from '@/lib/validations';
import type { ApiResponse } from '@/types';

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

    // Also forward to PHP backend if available
    try {
      const phpUrl = process.env.PHP_API_URL;
      if (phpUrl) {
        await fetch(`${phpUrl}/api/contact.php`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, message }),
          signal: AbortSignal.timeout(3000),
        });
      }
    } catch {
      console.warn('[Contact API] PHP service unavailable');
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
