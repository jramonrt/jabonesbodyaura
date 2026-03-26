import Link from 'next/link';
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';
import { NAV_ITEMS } from '@/lib/utils';

export default function Footer() {
  return (
    <footer className="bg-oscuro text-white/70">
      <div className="px-[5%] pt-16 pb-8">
        <div className="max-w-6xl mx-auto">
          {/* Top grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-white/10">
            {/* Brand */}
            <div>
              <Link
                href="/"
                className="font-playfair font-bold text-2xl tracking-wide text-beige inline-block mb-4"
              >
                Body<span className="text-beige-light">aura</span>
              </Link>
              <p className="text-sm leading-relaxed text-white/55 max-w-[260px]">
                "Siente tu piel, habita tu momento."<br />
                Jabones artesanales para el cuidado consciente de tu piel.
              </p>
              <div className="flex gap-4 mt-5">
                <a
                  href="#"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center transition-colors hover:border-beige hover:text-beige"
                >
                  <Instagram size={15} />
                </a>
                <a
                  href="#"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center transition-colors hover:border-beige hover:text-beige"
                >
                  <Facebook size={15} />
                </a>
              </div>
            </div>

            {/* Nav links */}
            <div>
              <h5 className="text-[0.7rem] tracking-[0.12em] uppercase text-white/35 mb-4">
                Navegación
              </h5>
              <nav className="flex flex-col gap-2">
                <Link href="/" className="text-sm text-white/60 hover:text-beige transition-colors">
                  Inicio
                </Link>
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm text-white/60 hover:text-beige transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link href="/tienda" className="text-sm text-beige hover:text-beige-light transition-colors font-medium">
                  Tienda
                </Link>
              </nav>
            </div>

            {/* Contact */}
            <div>
              <h5 className="text-[0.7rem] tracking-[0.12em] uppercase text-white/35 mb-4">
                Contacto
              </h5>
              <div className="flex flex-col gap-3">
                <a
                  href="mailto:jabonesbodyaura@gmail.com"
                  className="flex items-center gap-2.5 text-sm text-white/60 hover:text-beige transition-colors"
                >
                  <Mail size={14} />
                  jabonesbodyaura@gmail.com
                </a>
                <a
                  href="tel:+000000"
                  className="flex items-center gap-2.5 text-sm text-white/60 hover:text-beige transition-colors"
                >
                  <Phone size={14} />
                  +000000
                </a>
                <span className="flex items-center gap-2.5 text-sm text-white/60">
                  <MapPin size={14} />
                  Ciudad de Guatemala, Guatemala
                </span>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 pt-6 text-xs text-white/30">
            <span>© {new Date().getFullYear()} Bodyaura. Todos los derechos reservados.</span>
            <span>Hecho con 🌿 en Guatemala</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
