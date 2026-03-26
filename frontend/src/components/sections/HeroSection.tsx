"use client";

import Link from 'next/link';
import { ArrowRight, Leaf } from 'lucide-react';
import { DM_Serif_Display, DM_Sans } from 'next/font/google';

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

export default function HeroSection() {
  return (
    <section
      className={`${dmSans.className} relative min-h-[100svh] flex flex-col justify-between overflow-hidden`}
      style={{ background: '#fbfefa' }}
    >
      {/* ── Grain overlay ── */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
        }}
      />

      {/* ── Accent blob — top right ── */}
      <div
        className="pointer-events-none absolute -top-24 -right-24 w-[520px] h-[520px] rounded-full z-0"
        style={{
          background: 'radial-gradient(circle at 40% 40%, rgba(94,170,127,0.18) 0%, rgba(168,167,198,0.08) 60%, transparent 80%)',
          filter: 'blur(48px)',
        }}
      />
      {/* ── Accent blob — bottom left ── */}
      <div
        className="pointer-events-none absolute -bottom-16 -left-16 w-[380px] h-[380px] rounded-full z-0"
        style={{
          background: 'radial-gradient(circle at 60% 60%, rgba(180,204,190,0.25) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* ═══════════════════════════════════════
          TOP BAR — Floating glassmorphism
      ════════════════════════════════════════ */}


      {/* ═══════════════════════════════════════
          MAIN CONTENT
      ════════════════════════════════════════ */}
      <div className="relative z-20 w-full px-[5%] flex-1 flex flex-col justify-center">
        <div className="max-w-5xl mx-auto w-full">

          {/* Eyebrow rule */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px w-12" style={{ background: 'rgba(46,136,104,0.4)' }} />
            <span
              className="text-[11px] tracking-[0.2em] uppercase"
              style={{ color: '#5eaa7f' }}
            >
              Piel que respira
            </span>
          </div>

          {/* H1 */}
          <h1
            className={dmSerif.className}
            style={{ lineHeight: 1.0, letterSpacing: '-0.02em' }}
          >
            <span className="block" style={{ fontSize: 'clamp(3.5rem, 9vw, 8.5rem)', color: '#1d6763' }}>
              Siente tu piel,
            </span>
            <span
              className="block"
              style={{
                fontSize: 'clamp(3.5rem, 9vw, 8.5rem)',
                color: '#2e8868',
                fontStyle: 'italic',
                marginLeft: 'clamp(1rem, 4vw, 5rem)',
              }}
            >
              habita tu momento.
            </span>
          </h1>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          BOTTOM BAR
      ════════════════════════════════════════ */}
      <div className="relative z-20 w-full px-[5%] pb-10">
        <div className="w-full h-px mb-8" style={{ background: 'rgba(29,103,99,0.1)' }} />

        <div className="max-w-5xl mx-auto w-full flex flex-col md:flex-row md:items-end gap-8 md:gap-0 justify-between">

          {/* Left — description + CTAs */}
          <div className="flex flex-col gap-6 max-w-sm">
            <p className="text-[15px] leading-relaxed" style={{ color: '#4a7a6a', fontWeight: 300 }}>
              Ingredientes naturales seleccionados.{' '}
              <span style={{ color: '#1d6763', fontWeight: 500 }}>
                Cero químicos, 100% esencia.
              </span>
            </p>

            <div className="flex items-center gap-4">
              <Link
                href="/tienda"
                className="inline-flex items-center gap-2.5 text-sm font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:-translate-y-0.5"
                style={{ background: '#1d6763', color: '#fbfefa', letterSpacing: '0.02em' }}
              >
                Comprar Ahora
                <ArrowRight size={14} />
              </Link>

              <Link
                href="/nosotros"
                className="text-sm font-medium transition-colors duration-200"
                style={{
                  color: '#5eaa7f',
                  textDecoration: 'underline',
                  textDecorationColor: 'rgba(94,170,127,0.35)',
                  textUnderlineOffset: '4px',
                }}
              >
                Nuestra Historia
              </Link>
            </div>
          </div>

          {/* Right — stats */}
          <div className="flex items-center">
            {[
              { num: '100%', label: 'Natural' },
              { num: '0',   label: 'Químicos' },
              { num: 'Totalmente',    label: 'Artesanal' },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-0.5 px-8 first:pl-0 last:pr-0"
                style={{ borderLeft: i > 0 ? '1px solid rgba(29,103,99,0.12)' : 'none' }}
              >
                <span
                  className={dmSerif.className}
                  style={{
                    fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                    color: '#1d6763',
                    lineHeight: 1,
                  }}
                >
                  {stat.num}
                </span>
                <span className="text-[10px] tracking-[0.18em] uppercase" style={{ color: '#9bbdab' }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}