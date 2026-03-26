'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'none';
}

export default function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = 'up',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              el.style.opacity = '1';
              el.style.transform = 'translate(0, 0)';
            }, delay);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const initialTransform = {
    up: 'translateY(30px)',
    left: 'translateX(-24px)',
    right: 'translateX(24px)',
    none: 'none',
  }[direction];

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        opacity: 0,
        transform: initialTransform,
        transition: `opacity 0.65s ease, transform 0.65s ease`,
      }}
    >
      {children}
    </div>
  );
}
