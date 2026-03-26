import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import '@/styles/globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['300', '400', '500'],
});

export const metadata: Metadata = {
  title: {
    default: 'Bodyaura — Siente tu piel, habita tu momento',
    template: '%s | Bodyaura',
  },
  description:
    'Jabones artesanales de alta calidad con ingredientes naturales. Transforma el autocuidado en una experiencia sensorial y consciente.',
  keywords: ['jabones artesanales', 'cuidado natural', 'bodyaura', 'bienestar', 'autocuidado'],
  openGraph: {
    title: 'Bodyaura — Jabones Artesanales',
    description: 'Siente tu piel, habita tu momento.',
    type: 'website',
    locale: 'es_GTQ',
    siteName: 'Bodyaura',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="font-dm bg-blanco text-oscuro antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#FAFAF8',
              color: '#2C2C2C',
              border: '1px solid #E8E3DA',
              borderRadius: '12px',
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '0.875rem',
            },
            success: {
              iconTheme: {
                primary: '#4A6741',
                secondary: '#FAFAF8',
              },
            },
            error: {
              iconTheme: {
                primary: '#dc2626',
                secondary: '#FAFAF8',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
