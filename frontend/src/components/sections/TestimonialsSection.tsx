import ScrollReveal from '@/components/ui/ScrollReveal';

export default function TestimonialsSection() {
  return (
    <section className="py-32 md:py-48 px-6 md:px-24 bg-[#1a2e28] text-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none grain-overlay opacity-[0.25] mix-blend-overlay" />

      {/* Letras masivas de fondo */}
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-playfair text-[15vw] md:text-[25vw] italic text-white/[0.02] leading-none pointer-events-none whitespace-nowrap">
        Ciencia
      </span>

      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="text-center mb-20 md:mb-32">
          <ScrollReveal>
            <span className="font-dm text-[10px] tracking-[0.3em] uppercase text-[#b4ccbe] block">
            </span>
          </ScrollReveal>
        </div>

        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          <ScrollReveal delay={0} direction="up">
            <h2 className="font-playfair text-4xl md:text-6xl lg:text-7xl leading-[1.2] text-white mb-12">
              Tu piel no es un lienzo inerte, <br className="hidden md:block" />
              <span className="italic text-[#b4ccbe] opacity-90">es un ecosistema biológico vivo.</span>
            </h2>

            <p className="font-dm text-sm md:text-base leading-relaxed font-light text-white/70 max-w-2xl mx-auto mb-16">
              Como químicos biólogos, entendemos la ciencia detrás de la barrera cutánea.
              Nos negamos a formular con sulfatos abrasivos o fragancias sintéticas que alteren tu microbioma natural.
              Extraemos la pureza de cada activo botánico y formulamos con precisión de laboratorio
              para crear productos funcionales, eficaces y en total armonía con tu fisiología.
            </p>

            <div className="flex flex-col items-center gap-4">
              <div className="w-px h-16 bg-[#b4ccbe]/40 mb-2" />
              <p className="font-dm text-[10px] tracking-[0.3em] uppercase text-white font-medium">
                La Ciencia de Bodyaura
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}