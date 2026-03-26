'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { contactSchema, type ContactFormValues } from '@/lib/validations';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || 'Error al enviar el mensaje');

      toast.success('¡Mensaje enviado! Te responderemos pronto.');
      reset();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Error inesperado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div>
        <label className="label-field" htmlFor="name">Nombre</label>
        <input
          id="name"
          className={cn('input-field', errors.name && 'border-red-400')}
          placeholder="Tu nombre"
          {...register('name')}
        />
        {errors.name && <p className="error-msg">{errors.name.message}</p>}
      </div>

      <div>
        <label className="label-field" htmlFor="contact-email">Email</label>
        <input
          id="contact-email"
          type="email"
          className={cn('input-field', errors.email && 'border-red-400')}
          placeholder="tu@correo.com"
          {...register('email')}
        />
        {errors.email && <p className="error-msg">{errors.email.message}</p>}
      </div>

      <div>
        <label className="label-field" htmlFor="message">Mensaje</label>
        <textarea
          id="message"
          className={cn('input-field resize-none h-28', errors.message && 'border-red-400')}
          placeholder="¿En qué podemos ayudarte?"
          {...register('message')}
        />
        {errors.message && <p className="error-msg">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className={cn(
          'w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-medium text-sm transition-all duration-300',
          loading
            ? 'bg-verde/50 text-white cursor-not-allowed'
            : 'bg-verde text-white hover:bg-verde-light'
        )}
      >
        {loading ? (
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            <Send size={14} />
            Enviar Mensaje
          </>
        )}
      </button>
    </form>
  );
}
