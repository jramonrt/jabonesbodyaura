import type { Metadata } from 'next';
import { ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SoapVisual from '@/components/ui/SoapVisual';
import OrderForm from '@/components/shop/OrderForm';
import { formatCurrency, PRODUCT_PRICE } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Tienda — Haz tu pedido',
  description: 'Compra el Jabón Artesanal Bodyaura. Formulario de compra rápida con ingredientes naturales.',
};

export default function TiendaPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-14 px-[5%] bg-crema">
        <div className="container-max text-center">
          <ScrollReveal>
            <span className="section-label justify-center">Tienda</span>
            <h1 className="section-title mt-2">Haz tu pedido</h1>
            <p className="text-gris text-sm mt-3">
              Completa el formulario y te confirmamos la entrega en menos de 24 horas
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Main content */}
      <section className="px-[5%] pb-20 bg-blanco">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            {/* Product card */}
            <ScrollReveal direction="left">
              <div
                className="rounded-3xl p-10 relative overflow-hidden sticky top-28"
                style={{ background: 'linear-gradient(145deg, #EDE5D5, #F5F0E8)' }}
              >
                <div className="absolute top-[-30px] right-[-30px] w-40 h-40 rounded-full border border-beige/25" />
                <div className="absolute bottom-4 left-4 w-20 h-20 rounded-full bg-verde/5" />

                {/* Visual */}
                <div className="flex justify-center mb-8">
                  <SoapVisual size="md" />
                </div>

                {/* Info */}
                <h2 className="font-playfair font-bold text-2xl text-oscuro mb-1">
                  Jabón Artesanal Bodyaura
                </h2>
                <p className="text-gris text-sm mb-4">Barra premium de cuidado corporal · 120g</p>

                <div className="flex items-baseline gap-2 mb-6">
                  <span className="font-playfair font-bold text-3xl text-verde">
                    {formatCurrency(PRODUCT_PRICE)}
                  </span>
                  <span className="text-gris text-sm">/ unidad</span>
                </div>

                {/* Features */}
                <div className="space-y-2.5 mb-6">
                  {[
                    'Ingredientes 100% naturales',
                    'Hecho a mano en Guatemala',
                    'No testado en animales',
                    'Empaque biodegradable',
                  ].map((feat) => (
                    <div key={feat} className="flex items-center gap-2 text-sm text-oscuro/80">
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Trust badges */}
                <div className="border-t border-beige/30 pt-5 grid grid-cols-3 gap-3 text-center">
                  {[
                    { icon: <ShieldCheck size={16} />, label: 'Pago Seguro' },
                    { icon: <Truck size={16} />, label: 'Entrega Rápida' },
                    { icon: <RotateCcw size={16} />, label: 'Garantía' },
                  ].map((b) => (
                    <div key={b.label} className="flex flex-col items-center gap-1 text-verde">
                      {b.icon}
                      <span className="text-[0.65rem] text-gris tracking-wide">{b.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Order form */}
            <ScrollReveal direction="right">
              <div className="bg-white rounded-3xl p-8 shadow-soft">
                <h3 className="font-playfair font-semibold text-xl mb-6"> Formulario de Compra</h3>
                <OrderForm />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
