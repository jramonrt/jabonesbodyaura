import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { formatCurrency, PRODUCT_PRICE } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Jabón Artesanal Bodyaura',
  description: 'Descubre nuestro jabón artesanal con ingredientes naturales. Hidratación, suavidad y aromas únicos para tu piel.',
};

const ingredients = [
  { num: '01', name: 'Aceite de Oliva', benefit: 'Hidratación profunda' },
  { num: '02', name: 'Aceite de Coco', benefit: 'Limpieza suave' },
  { num: '03', name: 'Avena Coloidal', benefit: 'Calma la irritación' },
  { num: '04', name: 'Manteca de Karité', benefit: 'Nutrición intensiva' },
  { num: '05', name: 'Aceite de Rosa', benefit: 'Aroma natural' },
  { num: '06', name: 'Extracto de Aloe', benefit: 'Regenera la piel' },
];

const benefits = [
  'Hidratación profunda y duradera',
  'Limpieza suave sin resecar',
  'Aroma natural y relajante',
  'Libre de parabenos y sulfatos',
  'Apto para piel sensible',
  'Espuma densa y cremosa',
  'Formulación pH balanceada',
];

export default function ProductoPage() {
  return (
    <div className="bg-[#fbfefa]">
      {/* Hero producto */}
      <section className="pt-40 pb-20 px-6 md:px-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none grain-overlay opacity-[0.03]" />

        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">

            {/* Info */}
            <ScrollReveal direction="left" className="pb-8">
              <span className="font-dm text-[10px] tracking-[0.3em] uppercase text-[#2e8868] block mb-6">
                Colección Botánica
              </span>
              <h1 className="font-playfair text-6xl md:text-8xl leading-[0.9] text-[#1d6763] tracking-tighter mb-8">
                Jabón <br />
                <span className="italic font-light opacity-90 block mt-2">Artesanal</span>
              </h1>

              <div className="w-16 h-[1px] bg-[#1d6763]/20 mb-8" />

              <div className="flex items-baseline gap-4 mb-8">
                <span className="font-playfair text-4xl text-[#1d6763]">
                  {formatCurrency(PRODUCT_PRICE)}
                </span>
                <span className="font-dm text-xs tracking-widest uppercase text-[#7a9a8e]">
                  / unidad · 120g
                </span>
              </div>

              <p className="font-dm text-lg leading-relaxed mb-12 max-w-md font-light text-[#4a7a6a]">
                Un jabón que nutre, suaviza y envuelve tu piel con un aroma delicado que perdura.
                Elaborado a mano con los mejores ingredientes de origen vegetal.
              </p>

              <div className="flex items-center gap-8">
                <Link
                  href="/tienda"
                  className="group inline-flex items-center gap-4 text-xs font-medium uppercase tracking-[0.15em] text-[#1d6763]"
                >
                  <span className="border-b border-[#1d6763] pb-1">Comprar Ahora</span>
                  <span className="w-12 h-12 rounded-full border border-[#1d6763] flex items-center justify-center group-hover:bg-[#1d6763] group-hover:text-white transition-all duration-500">
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <Link
                  href="/contacto"
                  className="font-dm text-[10px] md:text-xs uppercase tracking-widest text-[#5a7a6e] hover:text-[#1d6763] transition-colors"
                >
                  Preguntar
                </Link>
              </div>
            </ScrollReveal>

            {/* Soap image */}
            <ScrollReveal direction="right" className="relative">
              <div className="w-full aspect-[4/5] overflow-hidden group bg-white/50">
                <img
                  src="/img/imgjab2.png"
                  alt="Jabón Artesanal Bodyaura"
                  className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-105"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Ingredientes (Sin cajas, sin emojis) */}
      <section className="py-32 px-6 md:px-24 border-t border-[#1d6763]/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">

            <div className="lg:col-span-4">
              <ScrollReveal>
                <span className="font-dm text-[10px] tracking-[0.3em] uppercase block text-[#2e8868] mb-6">
                  Formulación
                </span>
                <h2 className="font-playfair text-4xl md:text-5xl text-[#1d6763] mb-6">
                  Ingredientes <br />
                  <span className="italic font-light">puros.</span>
                </h2>
                <p className="font-dm text-sm leading-relaxed text-[#4a7a6a] max-w-sm">
                  Ingredientes que conoces y que tu piel agradece.
                </p>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                {ingredients.map((ing, i) => (
                  <ScrollReveal key={ing.name} delay={i * 80}>
                    <div className="flex items-start gap-6 border-b border-[#1d6763]/10 pb-6 group">
                      <div className="relative mt-1">
                        {/* Soft glow on hover */}
                        <div className="absolute inset-0 bg-[#5eaa7f]/30 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <span className="relative flex items-center justify-center w-8 h-8 rounded-full border border-[#2e8868]/30 font-dm text-[10px] tracking-[0.2em] text-[#2e8868] bg-[#fbfefa]">
                          {ing.num}
                        </span>
                      </div>
                      <div>
                        <p className="font-playfair text-2xl text-[#1a2e28] mb-2">{ing.name}</p>
                        <p className="font-dm text-sm text-[#7a9a8e] uppercase tracking-widest">{ing.benefit}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Beneficios y Detalles */}
      <section className="py-32 px-6 md:px-24 bg-[#1d6763] text-white">
        <div className="absolute inset-0 pointer-events-none grain-overlay opacity-[0.15] mix-blend-overlay" />
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">

            <ScrollReveal direction="left">
              <span className="font-dm text-[10px] tracking-[0.3em] uppercase block text-white/70 mb-6">
                Beneficios
              </span>
              <h2 className="font-playfair text-4xl md:text-5xl mb-12 font-light">
                Lo que sentirás desde la <br />
                <span className="italic font-bold opacity-90">primera barra</span>
              </h2>
              <ul className="space-y-6">
                {benefits.map((b) => (
                  <li key={b} className="flex items-center gap-6">
                    <div className="w-12 h-[1px] bg-white/40" />
                    <span className="font-dm text-base md:text-lg font-light tracking-wide">{b}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="border border-white/20 p-10 md:p-16 relative">
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white -translate-x-px -translate-y-px" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white translate-x-px translate-y-px" />

                <h3 className="font-playfair text-2xl mb-10 italic">Información Técnica</h3>
                <div className="space-y-6 font-dm text-sm">
                  {[
                    ['Peso neto', '120 g'],
                    ['Tipo de piel', 'Todos los tipos'],
                    ['Aroma', 'Rosa y vainilla'],
                    ['Textura', 'Cremosa, espuma densa'],
                    ['Conservantes', 'Ninguno artificial'],
                    ['Caducidad', '24 meses sin abrir'],
                    ['Empaque', 'Papel kraft reciclado'],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between border-b border-white/10 pb-4">
                      <span className="uppercase tracking-widest text-white/60 text-[10px] w-1/2">{label}</span>
                      <span className="text-right font-light w-1/2">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>
    </div>
  );
}
