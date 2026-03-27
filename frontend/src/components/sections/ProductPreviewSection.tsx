import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SoapVisual from '@/components/ui/SoapVisual';
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
    <section className="section-padding" style={{ background: '#fbfefa' }}>
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <ScrollReveal direction="left">
            <div className="relative">
              <div
                className="w-full aspect-[4/5] rounded-3xl flex items-center justify-center relative overflow-hidden"
                style={{
                  boxShadow: '0 24px 64px rgba(29, 103, 99, 0.12)',
                }}
              >
                <img
                  src="/img/imagbody.png"
                  alt="Jabón Bodyaura"
                  className="absolute inset-0 w-full h-full object-cover z-0"
                />

                {/* Price tag */}
                <div
                  className="absolute top-6 right-6 rounded-2xl px-4 py-2 text-center"
                  style={{
                    background: '#2e8868',
                    boxShadow: '0 4px 16px rgba(46, 136, 104, 0.4)',
                  }}
                >
                  <span className="block font-playfair font-bold text-xl leading-none text-white">
                    {formatCurrency(PRODUCT_PRICE)}
                  </span>
                  <span className="text-[0.65rem] tracking-wide" style={{ color: 'rgba(255,255,255,0.65)' }}>

                  </span>
                </div>
              </div>

              {/* Floating card */}
              <div
                className="absolute -bottom-6 -left-4 bg-white rounded-2xl px-4 py-3 flex items-center gap-3"
                style={{
                  boxShadow: '0 8px 28px rgba(29, 103, 99, 0.12)',
                  border: '1px solid rgba(180, 204, 190, 0.5)',
                }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                  style={{ background: 'rgba(180, 204, 190, 0.35)' }}
                >
                  🌿
                </div>
                <div>
                  <p className="text-xs font-semibold" style={{ color: '#1a2e28' }}>
                    Ingredientes
                  </p>
                  <p className="text-[0.7rem]" style={{ color: '#5a7a6e' }}>
                    100% naturales
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Info */}
          <ScrollReveal direction="right">
            <span className="section-label">Nuestro Producto</span>
            <h2 className="section-title mt-2 mb-2 max-w-md">
              Jabón Artesanal
              <span className="block font-playfair italic" style={{ color: '#2e8868' }}>
                Bodyaura
              </span>
            </h2>
            <p className="text-sm mb-1" style={{ color: '#7a9a8e' }}>
              Barra premium de cuidado corporal · 120g
            </p>
            <p className="leading-relaxed mb-7 text-sm" style={{ color: '#5a7a6e' }}>
              Un jabón que nutre, suaviza y deja tu piel con un aroma delicado que perdura.
              Formulado con los mejores ingredientes de origen vegetal.
            </p>

            <ul className="space-y-3 mb-8">
              {highlights.map((h) => (
                <li key={h} className="flex items-center gap-3 text-sm" style={{ color: '#1a2e28' }}>
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(94, 170, 127, 0.2)' }}
                  >
                    <Check size={11} style={{ color: '#2e8868' }} strokeWidth={2.5} />
                  </span>
                  {h}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3">
              <Link href="/producto" className="btn-secondary">
                Ver detalles
              </Link>
              <Link href="/tienda" className="btn-primary">
                Comprar ahora
                <ArrowRight size={15} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}