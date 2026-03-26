import type { Metadata } from 'next';
import { Mail, Phone, MapPin, Clock, Instagram, Facebook } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import ContactForm from '@/components/shop/ContactForm';

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Contáctanos para dudas sobre pedidos, ingredientes o envíos del Jabón Artesanal Bodyaura.',
};

export default function ContactoPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 px-[5%] bg-crema">
        <div className="container-max">
          <ScrollReveal>
            <span className="section-label">Contacto</span>
            <h1 className="section-title mt-2 max-w-xl">
              ¿Tienes alguna pregunta?
            </h1>
            <p className="text-gris text-sm mt-3 max-w-md">
              Estamos aquí para ayudarte con cualquier duda sobre nuestros productos, pedidos o envíos.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-blanco">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact info */}
            <ScrollReveal direction="left">
              <div className="space-y-6">
                {[
                  {
                    icon: <Mail size={18} />,
                    label: 'Email',
                    value: 'jabonesbodyaura@gmail.com',
                    href: 'mailto:jabonesbodyaura@gmail.com',
                  },
                  {
                    icon: <Phone size={18} />,
                    label: 'WhatsApp / Teléfono',
                    value: '+000000',
                    href: 'tel:+000000',
                  },
                  {
                    icon: <MapPin size={18} />,
                    label: 'Ubicación',
                    value: 'Ciudad de Guatemala, Guatemala',
                    href: undefined,
                  },
                  {
                    icon: <Clock size={18} />,
                    label: 'Horario de atención',
                    value: 'Lunes a Viernes, 9:00 – 18:00',
                    href: undefined,
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-crema rounded-xl flex items-center justify-center text-verde flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.08em] text-gris font-medium mb-0.5">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-sm text-oscuro hover:text-verde transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm text-oscuro">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}

                {/* Social */}
                <div className="pt-4 border-t border-gris-light">
                  <p className="text-xs uppercase tracking-[0.08em] text-gris font-medium mb-3">
                    Redes Sociales
                  </p>
                  <div className="flex gap-3">
                    {[
                      { icon: <Instagram size={16} />, label: '@bodyaura.gt', href: '#' },
                      { icon: <Facebook size={16} />, label: 'Bodyaura', href: '#' },
                    ].map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        className="flex items-center gap-2 text-sm text-gris hover:text-verde transition-colors bg-crema px-4 py-2 rounded-full"
                      >
                        {s.icon}
                        {s.label}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Map placeholder */}
                <div
                  className="rounded-2xl overflow-hidden mt-6"
                  style={{ height: '200px', background: 'linear-gradient(145deg, #EDE5D5, #F5F0E8)' }}
                >
                  <div className="h-full flex items-center justify-center text-gris text-sm flex-col gap-2">
                    <MapPin size={24} className="text-verde" />
                    <span>Ciudad de Guatemala, Guatemala</span>
                    <span className="text-xs opacity-60">Entregas a domicilio disponibles</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Form */}
            <ScrollReveal direction="right">
              <div className="bg-crema rounded-3xl p-8">
                <h3 className="font-playfair font-semibold text-xl mb-2">Envíanos un mensaje</h3>
                <p className="text-gris text-sm mb-6">Respondemos en menos de 24 horas hábiles.</p>
                <ContactForm />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
