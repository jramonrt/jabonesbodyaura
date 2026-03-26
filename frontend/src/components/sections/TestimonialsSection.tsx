import ScrollReveal from '@/components/ui/ScrollReveal';

const testimonials = [
  {
    name: 'María G.',
    location: 'GTM',
    text: 'Mi piel nunca había estado tan suave. El aroma es increíble y dura todo el día. No volvería a usar otro jabón.',
    rating: 5,
  },
  {
    name: 'Sofía R.',
    location: 'GTM',
    text: 'Tengo piel sensible y por fin encontré algo que no me irrita. Los ingredientes son reales, se nota la diferencia.',
    rating: 5,
  },
  {
    name: 'Ana L.',
    location: 'GTM',
    text: 'Lo compré como regalo y terminé pidiendo uno para mí. El empaque es hermoso y el jabón en sí es un lujo accesible.',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="section-padding" style={{ background: '#fbfefa' }}>
      <div className="container-max">
        <div className="text-center mb-14">
          <ScrollReveal>
            <span className="section-label justify-center">Testimonios</span>
            <h2 className="section-title mt-2 mx-auto max-w-lg">
              Lo que dicen quienes ya lo viven
            </h2>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 120}>
              <div className="card-soft p-7 h-full flex flex-col">
                {/* Stars — lavender tint */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <span key={j} className="text-sm" style={{ color: '#a8a7c6' }}>
                      ★
                    </span>
                  ))}
                </div>

                <p
                  className="text-sm leading-relaxed flex-1 mb-5 font-playfair italic"
                  style={{ color: 'rgba(26, 46, 40, 0.75)' }}
                >
                  &ldquo;{t.text}&rdquo;
                </p>

                <div className="flex items-center gap-3">
                  {/* Avatar — sage tint */}
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center font-playfair font-bold text-sm"
                    style={{
                      background: 'rgba(155, 189, 171, 0.3)',
                      color: '#1d6763',
                    }}
                  >
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: '#1a2e28' }}>
                      {t.name}
                    </p>
                    <p className="text-xs" style={{ color: '#7a9a8e' }}>
                      {t.location}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}