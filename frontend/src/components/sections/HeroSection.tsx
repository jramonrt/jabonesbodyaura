"use client";

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-[100svh] w-full flex items-end pb-12 overflow-hidden bg-[var(--off-white)]">
      {/* Textura cruda */}
      <div className="absolute inset-0 pointer-events-none z-10 grain-overlay opacity-40 mix-blend-multiply" />

      {/* Líneas divisorias estructurales (Editorial Touch) */}
      <div className="absolute left-12 top-0 bottom-0 w-px bg-[#1d6763]/10 hidden md:block" />
      <div className="absolute right-12 top-0 bottom-0 w-px bg-[#1d6763]/10 hidden md:block" />

      <div className="relative z-20 w-full px-6 md:px-24 flex flex-col justify-end h-full mt-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">

          {/* Bloque Izquierdo: Titular Masivo */}
          <div className="lg:col-span-8 flex flex-col">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--teal-mid)] mb-8 ml-2 border-l border-[var(--teal-mid)] pl-4">
              Colección Botánica
            </span>
            <h1 className="font-playfair text-[clamp(4rem,10vw,11rem)] leading-[0.85] text-[var(--teal-deep)] tracking-tighter">
              Siente <br />
              <span className="italic font-light opacity-90 pl-0 md:pl-24">tu piel,</span>
            </h1>
          </div>

          {/* Bloque Derecho: Descripción y CTA alineados abajo */}
          <div className="lg:col-span-4 flex flex-col justify-end pb-4 lg:pl-12 border-t lg:border-t-0 lg:border-l border-[#1d6763]/10 pt-8 lg:pt-0">
            <p className="text-[13px] leading-relaxed text-[#4a7a6a] font-light mb-10 max-w-xs uppercase tracking-wide">
              Transformando el autocuidado cotidiano en un ritual estético. Ingredientes puros.
            </p>
            <Link
              href="/tienda"
              className="group inline-flex items-center gap-4 text-xs font-medium uppercase tracking-[0.15em] text-[var(--teal-deep)] w-fit"
            >
              <span className="border-b border-[var(--teal-deep)] pb-1">Explorar Colección</span>
              <span className="w-8 h-8 rounded-full border border-[var(--teal-deep)] flex items-center justify-center group-hover:bg-[var(--teal-deep)] group-hover:text-white transition-all duration-500">
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}