'use client';

import { useEffect, useRef, useCallback } from 'react';
import { Leaf, Droplets, Sparkles } from 'lucide-react'; // Iconos para las tarjetas

/* ─── Config ──────────────────────────────────────────────── */
const TOTAL_FRAMES = 120;
const FRAME_WIDTH = 1920;
const FRAME_HEIGHT = 1080;
const SCROLL_HEIGHT = '500vh';

const frameSrc = (n: number) =>
  `/frames/frame_${String(n).padStart(4, '0')}.webp`;

/* ─── Contenido Dinámico (Tarjetas) ──────────────────────── */
// Aquí defines en qué frame (de 0 a 119) entra y sale cada tarjeta
/* ─── Contenido Dinámico (Tarjetas) ──────────────────────── */
const OVERLAYS = [
  {
    id: 'origen',
    startFrame: 15,
    endFrame: 45,
    // Empujado más a la izquierda (5%) y un poco más arriba
    position: 'left-[5%] top-[25%]',
    icon: <Leaf size={20} className="text-[#6B5038]" />,
    title: 'Origen Natural',
    description: 'Nuestros ingredientes nacen de la tierra, cosechados en su punto de máxima pureza para cuidar tu piel.'
  },
  {
    id: 'textura',
    startFrame: 50,
    endFrame: 80,
    // Empujado más a la derecha (5%)
    position: 'right-[5%] top-[45%]',
    icon: <Droplets size={20} className="text-[#5eaa7f]" />,
    title: 'Textura Sedosa',
    description: 'Una espuma densa y suave que limpia sin resecar, respetando el pH natural de tu cuerpo.'
  },
  {
    id: 'sin-quimicos',
    startFrame: 85,
    endFrame: 115,
    // De vuelta a la izquierda, más abajo
    position: 'left-[5%] bottom-[20%]',
    icon: <Sparkles size={20} className="text-[#6B5038]" />,
    title: 'Cero Químicos',
    description: 'Sin sulfatos, sin parabenos, sin fragancias artificiales. Solo la esencia pura de la naturaleza.'
  }
];

/* ─── Component ───────────────────────────────────────────── */
export default function ScrollVideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentRef = useRef<number>(-1);
  const targetRef = useRef<number>(0);
  const rafRef = useRef<number>(0);
  const readyRef = useRef<boolean>(false);
  const loaderRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  // Referencias para las tarjetas flotantes
  const overlayRefs = useRef<(HTMLDivElement | null)[]>([]);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const scale = Math.max(
      window.innerWidth / FRAME_WIDTH,
      window.innerHeight / FRAME_HEIGHT,
    );
    canvas.width = Math.round(FRAME_WIDTH * scale);
    canvas.height = Math.round(FRAME_HEIGHT * scale);
    if (readyRef.current) drawFrame(currentRef.current < 0 ? 0 : currentRef.current);
  }, []);

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img = framesRef.current[index];
    if (!canvas || !img?.complete) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  }, []);

  /* ── Lógica de animación de las tarjetas ── */
  const updateOverlays = useCallback((currentFrame: number) => {
    const FADE_DURATION = 8; // Cuántos frames tarda en hacer la transición (fade in/out)

    OVERLAYS.forEach((overlay, i) => {
      const el = overlayRefs.current[i];
      if (!el) return;

      const { startFrame, endFrame } = overlay;
      let opacity = 0;
      let translateY = 20; // Empieza 20px más abajo

      if (currentFrame >= startFrame && currentFrame <= endFrame) {
        if (currentFrame < startFrame + FADE_DURATION) {
          // Fade IN
          const progress = (currentFrame - startFrame) / FADE_DURATION;
          opacity = progress;
          translateY = 20 * (1 - progress);
        } else if (currentFrame > endFrame - FADE_DURATION) {
          // Fade OUT
          const progress = (endFrame - currentFrame) / FADE_DURATION;
          opacity = progress;
          translateY = -20 * (1 - progress); // Sube ligeramente al desaparecer
        } else {
          // Totalmente visible
          opacity = 1;
          translateY = 0;
        }
      }

      // Aplicar estilos directamente al DOM (Máximo rendimiento)
      el.style.opacity = opacity.toString();
      el.style.transform = `translateY(${translateY}px)`;
      el.style.pointerEvents = opacity > 0.5 ? 'auto' : 'none';
    });
  }, []);

  const preload = useCallback((): Promise<void> => {
    return new Promise((resolve) => {
      let loaded = 0;
      framesRef.current = new Array(TOTAL_FRAMES);

      for (let i = 0; i < TOTAL_FRAMES; i++) {
        const img = new Image();
        const index = i;

        img.onload = img.onerror = () => {
          loaded++;
          const pct = (loaded / TOTAL_FRAMES) * 100;
          if (fillRef.current) fillRef.current.style.width = `${pct}%`;
          if (countRef.current) countRef.current.textContent = `${loaded} / ${TOTAL_FRAMES}`;
          if (loaded === TOTAL_FRAMES) resolve();
        };

        img.src = frameSrc(i + 1);
        framesRef.current[index] = img;
      }
    });
  }, []);

  const getProgress = useCallback((): number => {
    const section = sectionRef.current;
    if (!section) return 0;
    const rect = section.getBoundingClientRect();
    const total = section.offsetHeight - window.innerHeight;
    return Math.max(0, Math.min(-rect.top / total, 1));
  }, []);

  const renderLoop = useCallback(() => {
    if (targetRef.current !== currentRef.current) {
      currentRef.current = targetRef.current;
      drawFrame(currentRef.current);
      updateOverlays(currentRef.current); // Actualizamos las tarjetas
    }
    rafRef.current = requestAnimationFrame(renderLoop);
  }, [drawFrame, updateOverlays]);

  const onScroll = useCallback(() => {
    const progress = getProgress();
    targetRef.current = Math.min(
      Math.floor(progress * TOTAL_FRAMES),
      TOTAL_FRAMES - 1,
    );
    if (progress > 0.02 && hintRef.current) {
      hintRef.current.style.opacity = '0';
    }
  }, [getProgress]);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    preload().then(() => {
      if (loaderRef.current) {
        loaderRef.current.style.opacity = '0';
        setTimeout(() => {
          if (loaderRef.current) loaderRef.current.style.display = 'none';
        }, 600);
      }
      readyRef.current = true;
      drawFrame(0);
      rafRef.current = requestAnimationFrame(renderLoop);
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    });

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', onScroll);
    };
  }, [resizeCanvas, preload, drawFrame, renderLoop, onScroll]);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        height: SCROLL_HEIGHT,
        background: '#0a0a0a',
        margin: 0,
        padding: 0
      }}
    >
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <canvas
          ref={canvasRef}
          style={{ display: 'block', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', }}
        />

        {/* ─── Tarjetas Flotantes (Overlays) ─── */}
        <div className="absolute inset-0 pointer-events-none w-full h-full max-w-[1600px] mx-auto">
          {OVERLAYS.map((overlay, index) => (
            <div
              key={overlay.id}
              ref={(el) => { overlayRefs.current[index] = el; }}
              className={`absolute ${overlay.position} max-w-[320px] md:max-w-sm p-6 rounded-2xl transition-transform will-change-transform`}
              style={{
                opacity: 0,
                background: 'rgba(251, 254, 250, 0.08)', // Ligeramente más transparente
                backdropFilter: 'blur(20px)', // Más blur para compensar
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3)', // Sombra más profunda
                color: '#fbfefa',
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-white/10 rounded-full">
                  {overlay.icon}
                </div>
                <h3 className="font-playfair font-bold text-xl tracking-wide text-green-700">
                  {overlay.title}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-[#6B5038] ">
                {overlay.description}
              </p>
            </div>
          ))}
        </div>

        {/* Loading overlay */}
        <div
          ref={loaderRef}
          style={{
            position: 'absolute',
            inset: 0,
            background: '#0a0a0a',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.25rem',
            transition: 'opacity 0.6s ease',
            zIndex: 10,
          }}
        >
          {/* ... (Todo tu código del loader se mantiene exactamente igual aquí) ... */}
          <span style={{ fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#c8e6c9', opacity: 0.8 }}>
            Cargando
          </span>
          <div style={{ width: 'min(300px, 60vw)', height: '2px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
            <div ref={fillRef} style={{ height: '100%', width: '0%', background: '#c8e6c9', borderRadius: '2px', transition: 'width 0.1s linear' }} />
          </div>
          <span ref={countRef} style={{ fontSize: '0.65rem', opacity: 0.35, letterSpacing: '0.1em' }}>
            0 / {TOTAL_FRAMES}
          </span>
        </div>

        {/* Scroll hint */}
        <div
          ref={hintRef}
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'opacity 0.5s ease',
            pointerEvents: 'none',
          }}
        >
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#fff', opacity: 0.4 }}>
            scroll
          </span>
          <div style={{ width: '1px', height: '36px', background: 'linear-gradient(to bottom, transparent, #c8e6c9)', animation: 'pulse 1.6s ease-in-out infinite' }} />
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scaleY(0.7); }
          50%       { opacity: 1;   transform: scaleY(1); }
        }
      `}</style>
    </section>
  );
}