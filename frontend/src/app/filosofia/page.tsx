import type { Metadata } from 'next';
import ScrollReveal from '@/components/ui/ScrollReveal';

export const metadata: Metadata = {
  title: 'Filosofía — Misión, Visión y Valores',
  description: 'La filosofía de Bodyaura: nuestra misión, visión, valores y política de calidad.',
};

const valores = [
  { icon: '🌱', title: 'Cuidado Consciente', desc: 'Cada ingrediente, cada decisión, cada producto está pensado con intención y responsabilidad.' },
  { icon: '✨', title: 'Simplicidad', desc: 'Lo esencial es lo que funciona. Eliminamos lo innecesario para quedarnos con lo que realmente nutre.' },
  { icon: '💎', title: 'Calidad Real', desc: 'No hay atajos. Usamos materias primas de alta calidad porque tu piel lo merece.' },
  { icon: '🤝', title: 'Responsabilidad', desc: 'Con nuestra comunidad, con el ambiente y con los estándares de lo que ponemos en tu piel.' },
  { icon: '🧘', title: 'Bienestar Auténtico', desc: 'El bienestar no es una tendencia. Es una práctica diaria que comienza con pequeños rituales.' },
];

export default function FilosofiaPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 px-[5%] bg-verde relative overflow-hidden grain-overlay">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.4) 1px, transparent 0)`, backgroundSize: '32px 32px' }}
        />
        <div className="container-max relative z-10">
          <ScrollReveal>
            <span className="section-label text-beige" style={{ color: '#C8A97E' }}>
              <span className="bg-beige" style={{ display: 'inline-block', width: '30px', height: '1px' }} />
              Filosofía
            </span>
            <h1 className="section-title mt-2 max-w-xl text-white">
              Lo que creemos y cómo lo vivimos
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Misión & Visión */}
      <section className="section-padding bg-blanco">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <ScrollReveal direction="left">
              <div className="h-full bg-crema rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-verde to-beige rounded-t-3xl" />
                <span className="text-xs text-beige tracking-[0.14em] uppercase font-medium mb-3 block">
                  Misión
                </span>
                <h2 className="font-playfair font-bold text-2xl text-verde mb-4">Lo que hacemos</h2>
                <p className="text-gris leading-relaxed text-sm">
                  Crear productos de cuidado corporal eficaces y responsables que cuiden la piel y hagan
                  del autocuidado un hábito diario, accesible y significativo para cada persona.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="h-full bg-crema rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-beige to-verde rounded-t-3xl" />
                <span className="text-xs text-beige tracking-[0.14em] uppercase font-medium mb-3 block">
                  Visión
                </span>
                <h2 className="font-playfair font-bold text-2xl text-verde mb-4">Hacia dónde vamos</h2>
                <p className="text-gris leading-relaxed text-sm">
                  Ser una marca que transforme el autocuidado en una experiencia sensorial que une piel,
                  bienestar y confianza, inspirando a las personas a habitar plenamente su momento presente.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Valores */}
          <div className="text-center mb-12">
            <ScrollReveal>
              <span className="section-label justify-center">Nuestros Valores</span>
              <h2 className="section-title mt-2">Los principios que nos guían</h2>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {valores.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 80}>
                <div className="card-soft p-6 text-center group cursor-default h-full">

                  <h3 className="font-playfair font-semibold text-base mb-2 group-hover:text-verde transition-colors">
                    {v.title}
                  </h3>
                  <p className="text-xs text-gris leading-relaxed">{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Política de Calidad */}
      <section
        className="section-padding grain-overlay relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #2A3D27 0%, #4A6741 60%, #5D7A52 100%)' }}
      >
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-beige/10 -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="container-max relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <span
                className="inline-flex items-center gap-2.5 text-xs font-medium tracking-[0.14em] uppercase mb-4"
                style={{ color: '#C8A97E' }}
              >
                <span className="inline-block w-8 h-px bg-beige" />
                Política de Calidad
              </span>
              <h2 className="font-playfair font-bold text-4xl text-white mb-6 leading-tight">
                Nuestro compromiso es tu bienestar
              </h2>
              <p className="text-white/70 leading-relaxed mb-10 text-base">
                Bodyaura se compromete a diseñar, producir y comercializar jabones corporales artesanales
                que cumplan con requisitos de calidad, seguridad y eficacia, garantizando el cuidado de
                la piel y promoviendo el bienestar del cliente en cada etapa del proceso.
              </p>

            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
