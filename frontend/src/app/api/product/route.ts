import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { PRODUCT_PRICE } from '@/lib/utils';

// Default product data when DB is unavailable
const DEFAULT_PRODUCT = {
  id: 1,
  name: 'Jabón Artesanal Bodyaura',
  description: 'Barra premium de cuidado corporal con ingredientes naturales. 120g.',
  price: PRODUCT_PRICE,
  stock: 100,
  active: true,
};

export async function GET() {
  try {
    const product = await prisma.product.findFirst({
      where: { active: true },
    });
    return NextResponse.json({
      success: true,
      data: product ?? DEFAULT_PRODUCT,
    });
  } catch {
    return NextResponse.json({ success: true, data: DEFAULT_PRODUCT });
  }
}
