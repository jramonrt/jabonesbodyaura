import ScrollReveal from '@/components/ui/ScrollReveal';

const benefits = [
  {
    num: '01',
    title: 'Ingredientes Naturales',
    desc: 'Aceites vegetales, mantecas y extractos botánicos seleccionados por sus propiedades nutritivas.',
  },
  {
    num: '02',
    title: 'Hecho a Mano',
    desc: 'Cada barra es elaborada artesanalmente en pequeños lotes para garantizar la máxima calidad.',
  },
  {
    num: '03',
    title: 'Suave en tu Piel',
    desc: 'Formulación gentil, libre de sulfatos y parabenos. Apto para todo tipo de piel, incluso sensible.',
  },
  {
    num: '04',
    title: 'Empaque Sostenible',
    desc: 'Embalaje biodegradable y mínimo, porque cuidar tu piel y el planeta no debería ser excluyente.',
  },
];

export default function BenefitsSection() {
  return (
    <section className="py-32 md:py-48 px-6 md:px-24" style={{ background: '#fbfefa' }}>
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-16 md:gap-32">
        
        {/* Left Side: Sticky Title */}
        <div className="lg:w-1/3">
          <div className="lg:sticky lg:top-40">
            <ScrollReveal>
              <span className="font-dm text-[10px] tracking-[0.3em] uppercase mb-6 block" style={{ color: '#2e8868' }}>
                Por qué Bodyaura
              </span>
              <h2 className="font-playfair text-5xl md:text-6xl leading-[1.1]" style={{ color: '#1d6763' }}>
                La diferencia está <br/>
                <span className="italic font-light opacity-80">en cada detalle</span>
              </h2>
            </ScrollReveal>
          </div>
        </div>

        {/* Right Side: Flowing List without cards and NO emojis */}
        <div className="lg:w-2/3 flex flex-col gap-16 md:gap-24">
          {benefits.map((b, i) => (
            <ScrollReveal key={b.title} delay={i * 100} direction="up">
              <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start border-t border-[#1d6763]/10 pt-10 md:pt-16">
                <span className="font-dm text-xs tracking-[0.2em] text-[#2e8868] shrink-0 mt-2 block w-12 border-b border-[#2e8868]/30 pb-1">
                  {b.num}
                </span>
                <div className="flex flex-col gap-4 w-full">
                  <h3 className="font-playfair text-2xl md:text-3xl" style={{ color: '#1a2e28' }}>
                    {b.title}
                  </h3>
                  <p className="font-dm text-base md:text-lg leading-relaxed font-light text-[#4a7a6a] max-w-xl">
                    {b.desc}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}