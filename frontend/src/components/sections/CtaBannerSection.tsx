import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function CtaBannerSection() {
  return (
    <section className="relative py-40 md:py-56 overflow-hidden bg-[#1d6763] text-[#fbfefa]">
      {/* Subtle Noise */}
      <div className="absolute inset-0 pointer-events-none grain-overlay opacity-[0.15] mix-blend-overlay" />
      
      <div className="max-w-[1400px] mx-auto px-6 md:px-24 relative z-10">
        <ScrollReveal>
          <div className="flex flex-col items-center text-center">
            
            <div className="flex items-center gap-6 mb-12">
              <div className="w-12 h-[1px] bg-white/30" />
              <span className="font-dm text-[10px] tracking-[0.3em] uppercase text-white/80">
                Producción Limitada
              </span>
              <div className="w-12 h-[1px] bg-white/30" />
            </div>

            <h2 className="font-playfair text-5xl md:text-7xl lg:text-[6rem] leading-[1.05] mb-12 max-w-5xl tracking-tight">
              Tu ritual de autocuidado <br/>
              <span className="italic font-light text-[#b4ccbe] opacity-90 block mt-2">empieza hoy.</span>
            </h2>

            <p className="font-dm text-base md:text-lg font-light leading-relaxed mb-16 max-w-xl text-white/70">
              Cada barra está hecha a mano. Disponibilidad limitada para mantener la calidad artesanal que nos caracteriza.
            </p>

            <Link
              href="/tienda"
              className="group inline-flex items-center gap-5 text-xs md:text-sm font-medium uppercase tracking-[0.2em] text-[#fbfefa]"
            >
              <span className="border-b border-white/40 pb-1 group-hover:border-white transition-colors">
                Hacer mi pedido
              </span>
              <span className="w-14 h-14 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-[#1d6763] transition-all duration-500">
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}