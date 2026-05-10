import type { Metadata } from 'next';
import { ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import OrderForm from '@/components/shop/OrderForm';
import { formatCurrency, PRODUCT_PRICE } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Tienda — Haz tu pedido',
  description: 'Compra el Jabón Artesanal Bodyaura. Formulario de compra rápida con ingredientes naturales.',
};

export default function TiendaPage() {
  return (
    <div className="bg-[#fbfefa] min-h-screen">
      <section className="pt-40 pb-20 px-6 md:px-24">
        <div className="max-w-[1400px] mx-auto">
          
          <ScrollReveal>
            <div className="mb-20 md:mb-32">
              <span className="font-dm text-[10px] tracking-[0.3em] uppercase text-[#2e8868] block mb-6">
                Boutique
              </span>
              <h1 className="font-playfair text-6xl md:text-8xl leading-[0.9] text-[#1d6763] tracking-tighter">
                Adquiere <br/>
                <span className="italic font-light opacity-90 block mt-2">tu ritual.</span>
              </h1>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            
            {/* Left: Product Showcase */}
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <ScrollReveal direction="left">
                <div className="relative aspect-[3/4] overflow-hidden bg-[#1d6763]/[0.03] p-8 flex flex-col justify-between">
                  {/* Subtle corners */}
                  <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-[#1d6763]/20" />
                  <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-[#1d6763]/20" />
                  
                  <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <img
                      src="/img/productimg.png"
                      alt="Jabón Artesanal Bodyaura"
                      className="w-full h-auto object-cover mix-blend-multiply"
                    />
                  </div>

                  <div className="relative z-20 mt-8 pt-8 border-t border-[#1d6763]/10">
                    <h2 className="font-playfair text-3xl text-[#1a2e28] mb-2">Colección Botánica</h2>
                    <div className="flex items-baseline gap-3 mb-8">
                      <span className="font-playfair text-4xl text-[#1d6763]">
                        {formatCurrency(PRODUCT_PRICE)}
                      </span>
                      <span className="font-dm text-[10px] tracking-widest uppercase text-[#7a9a8e]">
                        / unidad
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 border-t border-[#1d6763]/10 pt-8">
                      {[
                        { icon: <ShieldCheck size={18} strokeWidth={1.5} />, label: 'Seguro' },
                        { icon: <Truck size={18} strokeWidth={1.5} />, label: 'Rápido' },
                        { icon: <RotateCcw size={18} strokeWidth={1.5} />, label: 'Garantía' },
                      ].map((b) => (
                        <div key={b.label} className="flex flex-col items-center gap-3 text-[#2e8868]">
                          {b.icon}
                          <span className="font-dm text-[9px] uppercase tracking-widest text-[#7a9a8e]">{b.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-7">
              <ScrollReveal direction="right">
                <div className="bg-white p-8 md:p-16 border border-[#1d6763]/10">
                  <h3 className="font-playfair text-3xl mb-3 text-[#1a2e28]">Detalles de envío</h3>
                  <p className="font-dm text-sm text-[#7a9a8e] mb-12 font-light">
                    Por favor, completa la información para procesar tu pedido artesanal.
                  </p>
                  
                  <div className="[&_input]:!bg-[#fbfefa] [&_input]:!border-[#1d6763]/10 [&_button]:!rounded-none [&_button]:!uppercase [&_button]:!tracking-widest">
                    <OrderForm />
                  </div>
                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
