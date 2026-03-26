'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { cn, NAV_ITEMS } from '@/lib/utils';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navBase = cn(
    'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-[5%]',
    scrolled || !isHome
      ? 'py-3.5 bg-blanco/95 backdrop-blur-md shadow-[0_1px_24px_rgba(44,44,44,0.08)]'
      : 'py-5 bg-transparent'
  );

  const linkColor = cn(
    'text-xs font-medium tracking-[0.06em] uppercase transition-colors duration-200',
    scrolled || !isHome ? 'text-oscuro hover:text-verde' : 'text-white/85 hover:text-white'
  );

  const logoColor = cn(
    'font-playfair font-bold text-[1.5rem] tracking-wide transition-colors duration-200',
    scrolled || !isHome ? 'text-verde' : 'text-violet-400'
  );

  return (
    <>
      <nav className={navBase}>
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          {/* Logo */}
          <Link href="/" className={logoColor}>
            Body<span className={scrolled || !isHome ? 'text-beige' : 'text-beige-light'}>aura</span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-9 list-none">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    linkColor,
                    pathname === item.href && 'text-verde font-semibold underline underline-offset-4'
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden md:block">
            <Link
              href="/tienda"
              className="bg-verde text-white text-xs font-medium tracking-wide uppercase px-6 py-2.5 rounded-full transition-all duration-300 hover:bg-verde-light hover:shadow-verde"
            >
              Comprar
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className={cn('md:hidden p-2 transition-colors', scrolled || !isHome ? 'text-oscuro' : 'text-white')}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-blanco flex flex-col justify-center px-[8%] transition-all duration-300 md:hidden',
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        <nav className="flex flex-col gap-6">
          {NAV_ITEMS.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              style={{ animationDelay: `${i * 60}ms` }}
              className={cn(
                'font-playfair text-3xl font-semibold text-oscuro transition-colors hover:text-verde',
                mobileOpen && 'animate-fade-up',
                pathname === item.href && 'text-verde'
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/tienda"
            className="mt-4 inline-block btn-primary w-fit"
          >
            Comprar Ahora
          </Link>
        </nav>
      </div>
    </>
  );
}
