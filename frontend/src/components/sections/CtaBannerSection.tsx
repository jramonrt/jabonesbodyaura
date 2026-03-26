import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function CtaBannerSection() {
  return (
    <section className="section-padding overflow-hidden">
      <div className="container-max">
        <ScrollReveal>
          <div
            className="relative rounded-3xl px-10 py-16 md:py-20 text-center overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #1d6763 0%, #2e8868 55%, #5eaa7f 100%)',
            }}
          >
            {/* Lavender glow blob — top right */}
            <div
              className="absolute top-0 right-0 w-72 h-72 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"
              style={{ background: 'rgba(168, 167, 198, 0.2)' }}
            />
            {/* Sage glow blob — bottom left */}
            <div
              className="absolute bottom-0 left-0 w-56 h-56 rounded-full translate-y-1/2 -translate-x-1/4 blur-2xl"
              style={{ background: 'rgba(180, 204, 190, 0.15)' }}
            />

            <div className="relative z-10">
              {/* Label — lavender */}
              <span
                className="inline-block text-xs tracking-[0.16em] uppercase mb-4 px-3 py-1 rounded-full"
                style={{
                  color: '#c8c8e8',
                  background: 'rgba(168, 167, 198, 0.18)',
                  border: '1px solid rgba(168, 167, 198, 0.25)',
                }}
              >
                ✦ Producción limitada ✦
              </span>

              <h2 className="font-playfair font-bold text-4xl md:text-5xl text-white leading-tight mb-4">
                Tu ritual de autocuidado
                <br />
                <span className="italic" style={{ color: '#d4f5e8' }}>
                  empieza hoy.
                </span>
              </h2>

              <p
                className="max-w-md mx-auto text-sm leading-relaxed mb-8"
                style={{ color: 'rgba(255,255,255,0.58)' }}
              >
                Cada barra está hecha a mano. Disponibilidad limitada para mantener la calidad
                artesanal que nos caracteriza.
              </p>

              <Link href="/tienda" className="btn-accent text-sm inline-flex">
                Hacer mi pedido
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}