import { z } from 'zod';

export const orderSchema = z.object({
  customerName: z
    .string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(150, 'El nombre es demasiado largo'),
  email: z
    .string()
    .email('Ingresa un correo electrónico válido'),
  phone: z
    .string()
    .regex(/^\d{8}$/, 'El teléfono debe tener exactamente 8 dígitos'),
  address: z
    .string()
    .min(10, 'Ingresa una dirección completa'),
  city: z
    .string()
    .min(2, 'Ingresa la ciudad'),
  state: z
    .string()
    .min(2, 'Ingresa el estado'),
  zipCode: z
    .string()
    .regex(/^\d{5}$/, 'El código postal debe tener 5 dígitos'),
  quantity: z
    .number()
    .int('La cantidad debe ser un número entero')
    .min(1, 'La cantidad mínima es 1')
    .max(99, 'La cantidad máxima es 99'),
  paymentMethod: z.enum(['TRANSFER', 'CASH'], {
    errorMap: () => ({ message: 'Selecciona un método de pago' }),
  }),
  notes: z.string().max(500, 'Las notas no pueden superar 500 caracteres').optional(),
});

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(150),
  email: z
    .string()
    .email('Ingresa un correo electrónico válido'),
  message: z
    .string()
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
    .max(1000, 'El mensaje no puede superar 1000 caracteres'),
});

export type OrderFormValues = z.infer<typeof orderSchema>;
export type ContactFormValues = z.infer<typeof contactSchema>;
