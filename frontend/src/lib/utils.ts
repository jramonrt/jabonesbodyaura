import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-GT', {
    style: 'currency',
    currency: 'GTQ',
    minimumFractionDigits: 0,
  }).format(amount);
}

export function generateOrderNumber(): string {
  const now = new Date();
  const date = now.getFullYear().toString() +
    String(now.getMonth() + 1).padStart(2, '0') +
    String(now.getDate()).padStart(2, '0');
  const rand = String(Math.floor(Math.random() * 9000) + 1000);
  return `BA-${date}-${rand}`;
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('es-GT', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

export const PRODUCT_PRICE = Number(process.env.NEXT_PUBLIC_PRODUCT_PRICE) || 180;

export const NAV_ITEMS = [
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Filosofía', href: '/filosofia' },
  { label: 'Producto', href: '/producto' },
  { label: 'Contacto', href: '/contacto' },
];
