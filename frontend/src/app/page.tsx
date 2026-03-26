import type { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import BenefitsSection from '@/components/sections/BenefitsSection';
import ProductPreviewSection from '@/components/sections/ProductPreviewSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import CtaBannerSection from '@/components/sections/CtaBannerSection';
import ScrollVideoSection from '@/components/sections/ScrollVideoSection';

export const metadata: Metadata = {
  title: 'Bodyaura — Jabones Artesanales Naturales',
  description:
    'Transforma el autocuidado en una experiencia sensorial. Jabones artesanales con ingredientes 100% naturales.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ScrollVideoSection /> 
      <BenefitsSection />
      <ProductPreviewSection />
      <TestimonialsSection />
      <CtaBannerSection />
    </>
  );
}
