import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        verde: {
          DEFAULT: '#4A6741',
          light: '#6B8F60',
          dark: '#3D5738',
          50: '#F0F5EE',
          100: '#D6E6D2',
        },
        beige: {
          DEFAULT: '#C8A97E',
          light: '#D4B896',
          dark: '#A8845A',
        },
        crema: {
          DEFAULT: '#F5F0E8',
          dark: '#EDE5D5',
        },
        blanco: '#FAFAF8',
        oscuro: '#2C2C2C',
        gris: {
          DEFAULT: '#888888',
          light: '#E8E3DA',
          medium: '#BBBBBB',
        },
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'Georgia', 'serif'],
        dm: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.4s ease forwards',
        'slide-right': 'slideRight 0.5s ease forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(-3deg)' },
          '50%': { transform: 'translateY(-18px) rotate(2deg)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideRight: {
          from: { opacity: '0', transform: 'translateX(-20px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
      },
      boxShadow: {
        'soft': '0 4px 40px rgba(44,44,44,0.08)',
        'medium': '0 8px 40px rgba(44,44,44,0.12)',
        'large': '0 16px 60px rgba(44,44,44,0.14)',
        'verde': '0 8px 24px rgba(74,103,65,0.3)',
        'beige': '0 8px 24px rgba(200,169,126,0.4)',
      },
    },
  },
  plugins: [],
}

export default config
