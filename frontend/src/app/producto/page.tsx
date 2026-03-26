import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check, Star } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SoapVisual from '@/components/ui/SoapVisual';
import { formatCurrency, PRODUCT_PRICE } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Jabón Artesanal Bodyaura',
  description: 'Descubre nuestro jabón artesanal con ingredientes naturales. Hidratación, suavidad y aromas únicos para tu piel.',
};

const ingredients = [
  { emoji: '🫒', name: 'Aceite de Oliva', benefit: 'Hidratación profunda' },
  { emoji: '🥥', name: 'Aceite de Coco', benefit: 'Limpieza suave' },
  { emoji: '🌾', name: 'Avena Coloidal', benefit: 'Calma la irritación' },
  { emoji: '🍯', name: 'Manteca de Karité', benefit: 'Nutrición intensiva' },
  { emoji: '🌹', name: 'Aceite de Rosa', benefit: 'Aroma natural' },
  { emoji: '🌿', name: 'Extracto de Aloe', benefit: 'Regenera la piel' },
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
    <>
      {/* Hero producto */}
      <section className="pt-32 pb-0 px-[5%] bg-crema relative overflow-hidden">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
            {/* Info */}
            <ScrollReveal direction="left" className="pb-16">
              <span className="section-label">Nuestro Producto</span>
              <h1 className="section-title mt-2 mb-2">
                Jabón Artesanal
                <span className="block italic text-verde">Bodyaura</span>
              </h1>
              <p className="text-gris mb-1 text-sm">Barra premium de cuidado corporal · 120g</p>

              {/* Rating */}


              <div className="flex items-baseline gap-3 mb-6">
                <span className="font-playfair font-bold text-4xl text-verde">
                  {formatCurrency(PRODUCT_PRICE)}
                </span>
                <span className="text-gris text-sm">/ unidad</span>
              </div>

              <p className="text-gris leading-relaxed mb-8 text-sm max-w-md">
                Un jabón que nutre, suaviza y envuelve tu piel con un aroma delicado que perdura.
                Elaborado a mano con los mejores ingredientes de origen vegetal.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link href="/tienda" className="btn-primary">
                  Comprar Ahora
                  <ArrowRight size={15} />
                </Link>
                <Link href="/contacto" className="btn-secondary">
                  Preguntar
                </Link>
              </div>
            </ScrollReveal>

            {/* Soap image */}
            <ScrollReveal direction="right" className="flex justify-center items-end">
              <div
                className="w-full max-w-sm rounded-t-3xl flex items-center justify-center py-12 relative overflow-hidden"
                style={{ background: 'linear-gradient(160deg, #EDE5D5, #E8DFD0)' }}
              >
                <div className="absolute top-[-40px] right-[-40px] w-48 h-48 rounded-full border border-beige/30" />
                <SoapVisual size="lg" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Ingredientes */}
      <section className="section-padding bg-blanco">
        <div className="container-max">
          <div className="text-center mb-12">
            <ScrollReveal>
              <span className="section-label justify-center">Formulación</span>
              <h2 className="section-title mt-2">Ingredientes que reconocerás</h2>
              <p className="text-gris text-sm mt-3 max-w-md mx-auto">
                Sin nombres imposibles de pronunciar. Solo ingredientes que conoces y que tu piel agradece.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {ingredients.map((ing, i) => (
              <ScrollReveal key={ing.name} delay={i * 80}>
                <div className="card-soft p-5 flex items-center gap-4">
                  <div className="w-11 h-11 bg-crema rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                    {ing.emoji}
                  </div>
                  <div>
                    <p className="font-medium text-oscuro text-sm">{ing.name}</p>
                    <p className="text-gris text-xs mt-0.5">{ing.benefit}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="section-padding bg-crema">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <span className="section-label">Beneficios</span>
              <h2 className="section-title mt-2 mb-6 max-w-md text-3xl">
                Lo que sentirás desde la primera barra
              </h2>
              <ul className="space-y-4">
                {benefits.map((b) => (
                  <li key={b} className="flex items-center gap-3 text-sm text-oscuro">
                    <span className="w-5 h-5 bg-verde rounded-full flex items-center justify-center flex-shrink-0">
                      <Check size={11} className="text-white" strokeWidth={3} />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link href="/tienda" className="btn-primary">
                  Quiero mi jabón
                  <ArrowRight size={15} />
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="bg-white rounded-3xl p-8 shadow-soft">
                <h3 className="font-playfair font-semibold text-xl mb-5">Información del producto</h3>
                <table className="w-full text-sm">
                  <tbody className="divide-y divide-gris-light">
                    {[
                      ['Peso neto', '120 g'],
                      ['Tipo de piel', 'Todos los tipos'],
                      ['Aroma', 'Rosa y vainilla'],
                      ['Textura', 'Cremosa, espuma densa'],
                      ['Conservantes', 'Ninguno artificial'],
                      ['Caducidad', '24 meses sin abrir'],
                      ['Empaque', 'Papel kraft reciclado'],
                    ].map(([label, value]) => (
                      <tr key={label}>
                        <td className="py-2.5 pr-4 text-gris font-medium">{label}</td>
                        <td className="py-2.5 text-oscuro">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
