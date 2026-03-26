'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Minus, Plus, ShoppingBag, Check, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { orderSchema, type OrderFormValues } from '@/lib/validations';
import { formatCurrency, PRODUCT_PRICE } from '@/lib/utils';
import { cn } from '@/lib/utils';
import type { OrderConfirmation } from '@/types';

export default function OrderForm() {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState<OrderConfirmation | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: { quantity: 1, paymentMethod: 'TRANSFER' },
  });

  const total = quantity * PRODUCT_PRICE;

  const changeQty = (delta: number) => {
    const next = Math.min(Math.max(1, quantity + delta), 99);
    setQuantity(next);
  };

  const onSubmit = async (data: OrderFormValues) => {
    setLoading(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, quantity }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || 'Error al procesar el pedido');

      setConfirmation(json.data);
      reset();
      setQuantity(1);
      toast.success('¡Pedido registrado exitosamente!');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Error inesperado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="space-y-4">
          {/* Row: nombre + email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label-field" htmlFor="customerName">Nombre completo *</label>
              <input
                id="customerName"
                className={cn('input-field', errors.customerName && 'border-red-400 focus:border-red-400 focus:ring-red-100')}
                placeholder="María García López"
                {...register('customerName')}
              />
              {errors.customerName && <p className="error-msg">{errors.customerName.message}</p>}
            </div>
            <div>
              <label className="label-field" htmlFor="email">Correo electrónico *</label>
              <input
                id="email"
                type="email"
                className={cn('input-field', errors.email && 'border-red-400')}
                placeholder="correo@ejemplo.com"
                {...register('email')}
              />
              {errors.email && <p className="error-msg">{errors.email.message}</p>}
            </div>
          </div>

          {/* Row: teléfono + ciudad */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label-field" htmlFor="phone">Teléfono *</label>
              <input
                id="phone"
                type="tel"
                className={cn('input-field', errors.phone && 'border-red-400')}
                placeholder="12345678"
                {...register('phone')}
              />
              {errors.phone && <p className="error-msg">{errors.phone.message}</p>}
            </div>
            <div>
              <label className="label-field" htmlFor="city">Ciudad *</label>
              <input
                id="city"
                className={cn('input-field', errors.city && 'border-red-400')}
                placeholder="Ciudad de Guatemala"
                {...register('city')}
              />
              {errors.city && <p className="error-msg">{errors.city.message}</p>}
            </div>
          </div>

          {/* Dirección */}
          <div>
            <label className="label-field" htmlFor="address">Dirección de entrega *</label>
            <input
              id="address"
              className={cn('input-field', errors.address && 'border-red-400')}
              placeholder="Calle, número, colonia"
              {...register('address')}
            />
            {errors.address && <p className="error-msg">{errors.address.message}</p>}
          </div>

          {/* Row: estado + CP */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label-field" htmlFor="state">Estado *</label>
              <input
                id="state"
                className={cn('input-field', errors.state && 'border-red-400')}
                placeholder="GTM"
                {...register('state')}
              />
              {errors.state && <p className="error-msg">{errors.state.message}</p>}
            </div>
            <div>
              <label className="label-field" htmlFor="zipCode">Código Postal *</label>
              <input
                id="zipCode"
                className={cn('input-field', errors.zipCode && 'border-red-400')}
                placeholder="06600"
                {...register('zipCode')}
              />
              {errors.zipCode && <p className="error-msg">{errors.zipCode.message}</p>}
            </div>
          </div>

          {/* Cantidad */}
          <div>
            <label className="label-field">Cantidad</label>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => changeQty(-1)}
                className="w-10 h-10 rounded-full border border-gris-light bg-blanco flex items-center justify-center transition-all hover:bg-verde hover:text-white hover:border-verde"
              >
                <Minus size={14} />
              </button>
              <span className="font-playfair font-bold text-2xl text-verde w-10 text-center tabular-nums">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => changeQty(1)}
                className="w-10 h-10 rounded-full border border-gris-light bg-blanco flex items-center justify-center transition-all hover:bg-verde hover:text-white hover:border-verde"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* Método de pago */}
          <div>
            <label className="label-field" htmlFor="paymentMethod">Método de pago *</label>
            <select
              id="paymentMethod"
              className={cn('input-field', errors.paymentMethod && 'border-red-400')}
              {...register('paymentMethod')}
            >
              <option value="">Selecciona un método</option>
              <option value="TRANSFER">Transferencia bancaria</option>
              <option value="CASH">Efectivo al recoger</option>
            </select>
            {errors.paymentMethod && <p className="error-msg">{errors.paymentMethod.message}</p>}
          </div>

          {/* Notas */}
          <div>
            <label className="label-field" htmlFor="notes">Notas adicionales</label>
            <textarea
              id="notes"
              className="input-field resize-none h-20"
              placeholder="Instrucciones especiales de entrega, referencias, etc."
              {...register('notes')}
            />
          </div>

          {/* Resumen */}
          <div className="bg-crema rounded-xl p-5 space-y-2.5">
            <div className="flex justify-between text-sm text-gris">
              <span>Jabón Artesanal Bodyaura</span>
              <span>{formatCurrency(PRODUCT_PRICE)}</span>
            </div>
            <div className="flex justify-between text-sm text-gris">
              <span>Cantidad</span>
              <span>× {quantity}</span>
            </div>
            <div className="flex justify-between text-sm text-gris">
              <span>Envío</span>
              <span className="text-verde font-medium">Por confirmar</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-oscuro border-t border-gris-light pt-2.5">
              <span>Total estimado</span>
              <span className="text-verde text-base">{formatCurrency(total)}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={cn(
              'w-full flex items-center justify-center gap-2 py-4 rounded-xl font-medium text-sm transition-all duration-300',
              loading
                ? 'bg-verde/50 text-white cursor-not-allowed'
                : 'bg-verde text-white hover:bg-verde-light hover:shadow-verde active:scale-[0.99]'
            )}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Procesando...
              </>
            ) : (
              <>
                <ShoppingBag size={16} />
                Confirmar Pedido
              </>
            )}
          </button>
        </div>
      </form>

      {/* Confirmation modal */}
      {confirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-oscuro/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-blanco rounded-3xl p-8 max-w-md w-full shadow-large animate-fade-up text-center">
            <div className="w-16 h-16 bg-verde rounded-full flex items-center justify-center mx-auto mb-5 shadow-verde">
              <Check size={28} className="text-white" strokeWidth={2.5} />
            </div>
            <h3 className="font-playfair font-bold text-2xl text-oscuro mb-2">
              ¡Pedido Recibido!
            </h3>
            <p className="text-gris text-sm mb-5 leading-relaxed">
              Gracias, <strong>{confirmation.customerName}</strong>. Hemos registrado tu pedido y
              nos pondremos en contacto en las próximas 24 horas.
            </p>
            <div className="bg-crema rounded-xl px-5 py-3 mb-5 inline-block">
              <p className="text-xs text-gris mb-0.5">Número de pedido</p>
              <p className="font-playfair font-bold text-lg text-verde">{confirmation.orderNumber}</p>
            </div>
            <div className="flex justify-between text-sm text-gris mb-5 border-t border-gris-light pt-4">
              <span>{confirmation.quantity} jabón{confirmation.quantity > 1 ? 'es' : ''}</span>
              <span className="font-semibold text-oscuro">{formatCurrency(confirmation.totalPrice)}</span>
            </div>
            <p className="text-xs text-gris mb-5">
              Entrega estimada: <strong>{confirmation.estimatedDelivery}</strong>
            </p>
            <button
              onClick={() => setConfirmation(null)}
              className="btn-primary w-full justify-center"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
