import type { Metadata } from 'next';
import ScrollReveal from '@/components/ui/ScrollReveal';

export const metadata: Metadata = {
  title: 'Filosofía — Misión, Visión y Valores',
  description: 'La filosofía de Bodyaura: nuestra misión, visión, valores y política de calidad.',
};

const valores = [
  { num: '01', title: 'Cuidado Consciente', desc: 'Cada ingrediente, cada decisión, cada producto está pensado con intención y responsabilidad.' },
  { num: '02', title: 'Simplicidad', desc: 'Lo esencial es lo que funciona. Eliminamos lo innecesario para quedarnos con lo que realmente nutre.' },
  { num: '03', title: 'Calidad Real', desc: 'No hay atajos. Usamos materias primas de alta calidad porque tu piel lo merece.' },
  { num: '04', title: 'Responsabilidad', desc: 'Con nuestra comunidad, con el ambiente y con los estándares de lo que ponemos en tu piel.' },
  { num: '05', title: 'Bienestar Auténtico', desc: 'El bienestar no es una tendencia. Es una práctica diaria que comienza con pequeños rituales.' },
];

export default function FilosofiaPage() {
  return (
    <div className="bg-[#fbfefa]">
      {/* Hero */}
      <section className="pt-40 pb-32 px-6 md:px-24 bg-[#1d6763] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none grain-overlay opacity-20 mix-blend-overlay" />
        <div className="max-w-[1400px] mx-auto relative z-10 text-center">
          <ScrollReveal>
            <span className="font-dm text-[10px] tracking-[0.3em] uppercase text-[#b4ccbe] block mb-6">
              Filosofía
            </span>
            <h1 className="font-playfair text-5xl md:text-7xl lg:text-[6rem] leading-[1] text-white tracking-tighter">
              Lo que creemos <br/>
              <span className="italic font-light opacity-90">y cómo lo vivimos</span>
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Misión & Visión */}
      <section className="py-32 px-6 md:px-24">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
            <ScrollReveal direction="left">
              <div className="border-t border-[#1d6763] pt-8">
                <span className="font-dm text-[10px] tracking-[0.3em] uppercase text-[#2e8868] block mb-8">
                  Misión
                </span>
                <h2 className="font-playfair text-4xl text-[#1a2e28] mb-6">Lo que hacemos</h2>
                <p className="font-dm text-lg leading-relaxed text-[#4a7a6a] font-light">
                  Crear productos de cuidado corporal eficaces y responsables que cuiden la piel y hagan
                  del autocuidado un hábito diario, accesible y significativo para cada persona.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="border-t border-[#1d6763] pt-8">
                <span className="font-dm text-[10px] tracking-[0.3em] uppercase text-[#2e8868] block mb-8">
                  Visión
                </span>
                <h2 className="font-playfair text-4xl text-[#1a2e28] mb-6">Hacia dónde vamos</h2>
                <p className="font-dm text-lg leading-relaxed text-[#4a7a6a] font-light">
                  Ser una marca que transforme el autocuidado en una experiencia sensorial que une piel,
                  bienestar y confianza, inspirando a las personas a habitar plenamente su momento presente.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-32 px-6 md:px-24 border-t border-[#1d6763]/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <ScrollReveal>
                <span className="font-dm text-[10px] tracking-[0.3em] uppercase block text-[#2e8868] mb-6">
                  Nuestros Valores
                </span>
                <h2 className="font-playfair text-5xl text-[#1d6763] mb-6">
                  Los principios <br/>
                  <span className="italic font-light">que nos guían</span>
                </h2>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-8">
              <div className="flex flex-col gap-12">
                {valores.map((v, i) => (
                  <ScrollReveal key={v.title} delay={i * 80}>
                    <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start border-b border-[#1d6763]/10 pb-12 group">
                      <span className="font-dm text-xs tracking-[0.2em] text-[#2e8868] shrink-0 mt-2 block w-12 border-b border-[#2e8868]/30 pb-1">
                        {v.num}
                      </span>
                      <div className="flex flex-col gap-4 w-full">
                        <h3 className="font-playfair text-3xl text-[#1a2e28]">
                          {v.title}
                        </h3>
                        <p className="font-dm text-lg leading-relaxed font-light text-[#4a7a6a] max-w-xl">
                          {v.desc}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Política de Calidad */}
      <section className="py-40 px-6 md:px-24 bg-[#1a2e28] text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none grain-overlay opacity-[0.25] mix-blend-overlay" />
        
        <div className="max-w-[1000px] mx-auto text-center relative z-10">
          <ScrollReveal>
            <div className="flex items-center justify-center gap-6 mb-12">
              <div className="w-12 h-px bg-white/30" />
              <span className="font-dm text-[10px] tracking-[0.3em] uppercase text-[#b4ccbe]">
                Política de Calidad
              </span>
              <div className="w-12 h-px bg-white/30" />
            </div>
            
            <h2 className="font-playfair text-5xl md:text-7xl mb-12 font-light">
              Nuestro compromiso <br/>
              <span className="italic opacity-90 block mt-2">es tu bienestar</span>
            </h2>
            
            <p className="font-dm text-base md:text-xl leading-relaxed font-light text-white/70 max-w-3xl mx-auto">
              Bodyaura se compromete a diseñar, producir y comercializar jabones corporales artesanales
              que cumplan con requisitos de calidad, seguridad y eficacia, garantizando el cuidado de
              la piel y promoviendo el bienestar del cliente en cada etapa del proceso.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
