'use client';

import { cn } from '@/lib/utils';

interface SoapVisualProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  animated?: boolean;
}

export default function SoapVisual({ size = 'md', className, animated = true }: SoapVisualProps) {
  const sizes = {
    sm: 'w-40 h-48',
    md: 'w-52 h-64',
    lg: 'w-72 h-88',
  };

  return (
    <div className={cn('relative flex items-center justify-center', className)}>
      {/* Shadow */}
      <div
        className={cn(
          'absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full bg-black/15',
          animated && 'animate-float',
          size === 'sm' && 'w-28 h-6',
          size === 'md' && 'w-36 h-8',
          size === 'lg' && 'w-52 h-10',
        )}
        style={{ filter: 'blur(12px)', animationDelay: '0s', animationDirection: 'reverse' }}
      />

      {/* Soap bar */}
      <div
        className={cn(
          sizes[size],
          'relative flex items-center justify-center',
          animated && 'animate-float',
          'rounded-[35%_25%_40%_30%]',
        )}
        style={{
          background: 'linear-gradient(145deg, #D4B896 0%, #C8A97E 30%, #B8946A 60%, #C8A97E 100%)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.18), inset 0 2px 20px rgba(255,255,255,0.2), inset -4px -4px 12px rgba(0,0,0,0.08)',
        }}
      >
        {/* Top highlight */}
        <div
          className="absolute top-[15%] left-[15%] right-[40%] h-[12%] rounded-full opacity-30"
          style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.6), transparent)' }}
        />

        {/* Brand stamp */}
        <div className="flex flex-col items-center gap-0.5 z-10">
          <span
            className="font-playfair font-semibold tracking-[0.3em] text-[#2A3D27]/40"
            style={{
              fontSize: size === 'lg' ? '0.85rem' : size === 'md' ? '0.7rem' : '0.55rem',
            }}
          >
            BODY
          </span>
          <div
            className="border-b border-[#2A3D27]/20"
            style={{ width: size === 'lg' ? '48px' : '36px' }}
          />
          <span
            className="font-playfair font-semibold tracking-[0.3em] text-[#2A3D27]/40"
            style={{
              fontSize: size === 'lg' ? '0.85rem' : size === 'md' ? '0.7rem' : '0.55rem',
            }}
          >
            AURA
          </span>
        </div>

        {/* Side texture dots */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#2A3D27]/10"
            style={{
              top: `${25 + i * 20}%`,
              right: '12%',
            }}
          />
        ))}
      </div>
    </div>
  );
}
