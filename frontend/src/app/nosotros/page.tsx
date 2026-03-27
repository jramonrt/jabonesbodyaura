import type { Metadata } from 'next';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Quiénes Somos',
  description: 'Conoce la historia de Bodyaura, nuestra pasión por el autocuidado consciente y los ingredientes naturales.',
};

const pillars = [
  { title: 'Origen Natural', desc: 'Seleccionamos cada ingrediente por su pureza y origen responsable.' },
  { title: 'Proceso Artesanal', desc: 'Elaboramos en pequeños lotes para asegurar atención en cada detalle.' },
  { title: 'Compromiso Real', desc: 'Sin greenwashing: somos transparentes en lo que ponemos —y no ponemos— en nuestros jabones.' },
];

export default function NosotrosPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 px-[5%] bg-crema relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-verde/5 -translate-y-1/2 translate-x-1/2" />
        <div className="container-max relative z-10">
          <ScrollReveal>
            <span className="section-label">Quiénes Somos</span>
            <h1 className="section-title mt-2 max-w-xl">
              El autocuidado como práctica consciente
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Historia */}
      <section className="section-padding bg-blanco">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              {/* Profile/About image */}
              <div className="rounded-3xl aspect-square relative overflow-hidden shadow-soft">
                <img
                  src="/img/imgjab3.png"
                  alt="Historia Bodyaura"
                  className="absolute inset-0 w-full h-full object-cover z-0"
                />
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <span className="section-label">Nuestra Historia</span>
              <h2 className="section-title mt-2 mb-5 max-w-md text-3xl">
                Nació de una búsqueda honesta
              </h2>
              <p className="text-gris leading-relaxed mb-4 text-sm">
                Bodyaura comenzó como un experimento en una cocina pequeña. La búsqueda era simple: encontrar
                un jabón que realmente cuidara la piel sin ingredientes que ni siquiera pudieras pronunciar.
              </p>
              <p className="text-gris leading-relaxed mb-4 text-sm">
                Después de meses de pruebas, formulaciones y aromas, encontramos la combinación perfecta:
                aceites vegetales de calidad, mantecas nutritivas y extractos botánicos que trabajan en
                armonía con tu piel.
              </p>
              <p className="text-gris leading-relaxed text-sm">
                Hoy, Bodyaura es más que un jabón. Es una invitación a convertir el baño en un momento
                de presencia, cuidado y conexión con uno mismo.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Propósito */}
      <section className="section-padding bg-crema">
        <div className="container-max">
          <div className="text-center mb-14">
            <ScrollReveal>
              <span className="section-label justify-center">Nuestro Propósito</span>
              <h2 className="section-title mt-2">Por qué hacemos lo que hacemos</h2>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {pillars.map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 100}>
                <div className="bg-white rounded-2xl p-7 h-full shadow-soft">

                  <h3 className="font-playfair font-semibold text-lg mb-2">{p.title}</h3>
                  <p className="text-gris text-sm leading-relaxed">{p.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Autocuidado Consciente */}
      <section className="section-padding bg-blanco">
        <div className="container-max">
          <div className="max-w-2xl mx-auto text-center">
            <ScrollReveal>
              <span className="section-label justify-center">Autocuidado Consciente</span>
              <h2 className="section-title mt-2 mb-6">
                Cada momento de cuidado es un momento contigo
              </h2>
              <p className="text-gris leading-relaxed mb-4 text-sm">
                El autocuidado no es un lujo. Es una necesidad. Cuando te detienes a cuidar tu cuerpo
                con intención, estás diciendo que tu bienestar importa. Eso es lo que Bodyaura quiere
                recordarte cada vez que tomas nuestro jabón.
              </p>
              <p className="text-gris leading-relaxed mb-8 text-sm">
                Los aromas naturales, la textura cuidada y la espuma delicada están diseñados para
                convertir el baño diario en un ritual de presencia plena.
              </p>
              <Link href="/filosofia" className="btn-secondary">
                Conoce nuestra filosofía
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
