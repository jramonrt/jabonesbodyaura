import ScrollReveal from '@/components/ui/ScrollReveal';

const benefits = [
  {
    icon: '🌿',
    title: 'Ingredientes Naturales',
    desc: 'Aceites vegetales, mantecas y extractos botánicos seleccionados por sus propiedades nutritivas.',
  },
  {
    icon: '✋',
    title: 'Hecho a Mano',
    desc: 'Cada barra es elaborada artesanalmente en pequeños lotes para garantizar la máxima calidad.',
  },
  {
    icon: '🫧',
    title: 'Suave en tu Piel',
    desc: 'Formulación gentil, libre de sulfatos y parabenos. Apto para todo tipo de piel, incluso sensible.',
  },
  {
    icon: '♻️',
    title: 'Empaque Sostenible',
    desc: 'Embalaje biodegradable y mínimo, porque cuidar tu piel y el planeta no debería ser excluyente.',
  },
];

export default function BenefitsSection() {
  return (
    <section className="section-padding" style={{ background: '#fbfefa' }}>
      <div className="container-max">
        <div className="text-center mb-14">
          <ScrollReveal>
            <span className="section-label justify-center">Por qué Bodyaura</span>
            <h2 className="section-title mt-2 mx-auto max-w-xl">
              La diferencia está en cada detalle
            </h2>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => (
            <ScrollReveal key={b.title} delay={i * 100} direction="up">
              <div className="card-soft p-7 h-full flex flex-col">
                {/* Icon container — sage-light tint */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5"
                  style={{ background: 'rgba(180, 204, 190, 0.35)' }}
                >
                  {b.icon}
                </div>
                <h3 className="font-playfair font-semibold text-lg mb-2" style={{ color: '#1a2e28' }}>
                  {b.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#5a7a6e' }}>
                  {b.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}