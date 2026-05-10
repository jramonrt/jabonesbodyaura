import type { Metadata } from 'next';
import ScrollReveal from '@/components/ui/ScrollReveal';
import ContactForm from '@/components/shop/ContactForm';

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Contáctanos para dudas sobre pedidos, ingredientes o envíos del Jabón Artesanal Bodyaura.',
};

export default function ContactoPage() {
  return (
    <div className="bg-[#fbfefa] min-h-screen">
      <section className="pt-40 pb-20 px-6 md:px-24">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="mb-24">
            <ScrollReveal>
              <span className="font-dm text-[10px] tracking-[0.3em] uppercase text-[#2e8868] block mb-6">
                Contacto
              </span>
              <h1 className="font-playfair text-6xl md:text-8xl leading-[0.9] text-[#1d6763] tracking-tighter mb-8">
                ¿Tienes alguna <br/>
                <span className="italic font-light opacity-90 block mt-2">pregunta?</span>
              </h1>
              <p className="font-dm text-lg text-[#4a7a6a] max-w-md font-light">
                Estamos aquí para ayudarte con cualquier duda sobre nuestros productos, pedidos o envíos.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            
            {/* Left: Contact Info */}
            <div className="lg:col-span-5 flex flex-col gap-12">
              <ScrollReveal direction="left">
                
                <div className="border-t border-[#1d6763]/10 pt-8 mb-12">
                  <h3 className="font-playfair text-3xl text-[#1a2e28] mb-12">Detalles de contacto</h3>
                  <div className="space-y-10">
                    {[
                      { label: 'Email', value: 'jabonesbodyaura@gmail.com', href: 'mailto:jabonesbodyaura@gmail.com' },
                      { label: 'WhatsApp / Teléfono', value: '+000000', href: 'tel:+000000' },
                      { label: 'Ubicación', value: 'Ciudad de Guatemala, Guatemala' },
                      { label: 'Horario de atención', value: 'Lunes a Viernes, 9:00 – 18:00' },
                    ].map((item) => (
                      <div key={item.label} className="flex flex-col gap-2">
                        <span className="font-dm text-[10px] tracking-[0.2em] uppercase text-[#7a9a8e]">
                          {item.label}
                        </span>
                        {item.href ? (
                          <a href={item.href} className="font-dm text-lg text-[#1a2e28] hover:text-[#2e8868] transition-colors border-b border-transparent hover:border-[#2e8868] w-fit">
                            {item.value}
                          </a>
                        ) : (
                          <span className="font-dm text-lg text-[#1a2e28]">{item.value}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-[#1d6763]/10 pt-8">
                  <span className="font-dm text-[10px] tracking-[0.2em] uppercase text-[#7a9a8e] block mb-6">
                    Redes Sociales
                  </span>
                  <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
                    {[
                      { label: '@bodyaura.gt', href: '#' },
                      { label: 'Bodyaura Facebook', href: '#' },
                    ].map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        className="font-dm text-sm uppercase tracking-widest text-[#1a2e28] hover:text-[#2e8868] transition-colors"
                      >
                        {s.label}
                      </a>
                    ))}
                  </div>
                </div>

              </ScrollReveal>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-7">
              <ScrollReveal direction="right">
                <div className="bg-white p-8 md:p-16 border border-[#1d6763]/10 relative">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#1d6763]/20" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#1d6763]/20" />

                  <h3 className="font-playfair text-3xl mb-3 text-[#1a2e28]">Envíanos un mensaje</h3>
                  <p className="font-dm text-sm text-[#7a9a8e] mb-12 font-light">
                    Respondemos en menos de 24 horas hábiles.
                  </p>
                  
                  <div className="[&_input]:!bg-[#fbfefa] [&_input]:!border-[#1d6763]/10 [&_textarea]:!bg-[#fbfefa] [&_textarea]:!border-[#1d6763]/10 [&_button]:!rounded-none [&_button]:!uppercase [&_button]:!tracking-widest">
                    <ContactForm />
                  </div>
                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
