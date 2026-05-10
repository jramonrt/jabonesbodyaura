import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { formatCurrency, PRODUCT_PRICE } from '@/lib/utils';

const highlights = [
  'Manteca de karité y aceite de coco',
  'Avena coloidal para piel sensible',
  'Aroma de rosas y vainilla',
  'Sin sulfatos ni parabenos',
  '120g — duración de 4 a 6 semanas',
];

export default function ProductPreviewSection() {
  return (
    <section className="py-32 md:py-48 px-6 md:px-24" style={{ background: '#fbfefa' }}>
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">

          {/* Image Side: Clean, no shadow, big */}
          <ScrollReveal direction="left">
            <div className="relative w-full aspect-[3/4] overflow-hidden group">
              <img
                src="/img/imagbody.png"
                alt="Jabón Bodyaura"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3s] ease-out group-hover:scale-[1.03]"
              />
              {/* Elegant price overlay */}
              <div className="absolute bottom-8 left-8 flex flex-col z-10 drop-shadow-md">
                <span className="font-dm text-[10px] tracking-[0.2em] uppercase text-white">

                </span>
                <span className="font-playfair text-4xl md:text-5xl text-white drop-shadow-lg">
                  {formatCurrency(PRODUCT_PRICE)}
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* Info Side: Typographic */}
          <ScrollReveal direction="right">
            <div className="flex flex-col lg:pl-12">
              <span className="font-dm text-[10px] tracking-[0.3em] uppercase mb-6 block text-[#2e8868]">
                Nuestro Producto
              </span>
              <h2 className="font-playfair text-5xl md:text-7xl lg:text-[5rem] leading-[0.9] text-[#1d6763] mb-8 tracking-tighter">
                Jabón <br /> Artesanal <br />
                <span className="italic font-light opacity-90 block mt-2">Bodyaura</span>
              </h2>

              <div className="w-16 h-px bg-[#1d6763]/20 mb-8" />

              <p className="font-dm text-xs md:text-sm uppercase tracking-widest text-[#7a9a8e] mb-8">
                Barra premium de cuidado corporal · 120g
              </p>

              <p className="font-dm text-lg md:text-xl leading-relaxed text-[#4a7a6a] font-light mb-12 max-w-md">
                Un jabón que nutre, suaviza y deja tu piel con un aroma delicado que perdura. Formulado con los mejores ingredientes de origen vegetal.
              </p>

              <ul className="space-y-5 mb-16">
                {highlights.map((h, i) => (
                  <li key={i} className="flex items-center gap-6">
                    <div className="w-8 h-[1px] bg-[#2e8868]/40" />
                    <span className="font-dm text-sm md:text-base font-light text-[#1a2e28]">{h}</span>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-8 md:gap-12">
                <Link
                  href="/tienda"
                  className="group inline-flex items-center gap-4 text-xs font-medium uppercase tracking-[0.15em] text-[var(--teal-deep)]"
                >
                  <span className="border-b border-[var(--teal-deep)] pb-1">Comprar ahora</span>
                  <span className="w-12 h-12 rounded-full border border-[var(--teal-deep)] flex items-center justify-center group-hover:bg-[var(--teal-deep)] group-hover:text-white transition-all duration-500">
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>

                <Link
                  href="/producto"
                  className="font-dm text-[10px] md:text-xs uppercase tracking-widest text-[#5a7a6e] hover:text-[#1d6763] transition-colors"
                >
                  Ver detalles
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}