import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  baseOpacity: number;
  color: string;
  glowColor: string;
  glowBlur: number;
  layer: 'foreground' | 'midground' | 'background';
  oscillationSpeed: number;
  oscillationDistance: number;
  oscillationOffset: number;
  turbulenceFreq: number;
}

export const AtmosphericVoidEngine: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const particles: Particle[] = [];

    // Layer A: Foreground Bokeh (12-16 large particles, 3.5-6.0px with deep soft radial glow)
    const foregroundColors = [
      { color: 'rgba(255, 0, 60, 0.95)', glow: 'rgba(255, 0, 60, 0.95)', blur: 24 },
      { color: 'rgba(255, 60, 0, 0.9)', glow: 'rgba(255, 60, 0, 0.95)', blur: 22 },
      { color: 'rgba(168, 85, 247, 0.9)', glow: 'rgba(168, 85, 247, 0.95)', blur: 26 },
      { color: 'rgba(255, 20, 80, 0.95)', glow: 'rgba(255, 0, 80, 0.9)', blur: 22 },
    ];

    // Layer B: Midground Embers (45-55 crisp glowing sparks, 1.6-3.0px)
    const midgroundColors = [
      { color: '#ff003c', glow: 'rgba(255, 0, 60, 0.9)', blur: 14 },
      { color: '#ff3b00', glow: 'rgba(255, 59, 0, 0.85)', blur: 12 },
      { color: '#ff7700', glow: 'rgba(255, 119, 0, 0.8)', blur: 10 },
      { color: '#c026d3', glow: 'rgba(192, 38, 211, 0.85)', blur: 12 },
      { color: '#e11d48', glow: 'rgba(225, 29, 72, 0.85)', blur: 12 },
    ];

    // Layer C: Background Dust (60-70 faint micro-dust specks, 0.8-1.5px)
    const backgroundColors = [
      { color: 'rgba(244, 63, 94, 0.65)', glow: 'rgba(244, 63, 94, 0.45)', blur: 5 },
      { color: 'rgba(192, 132, 252, 0.6)', glow: 'rgba(192, 132, 252, 0.4)', blur: 5 },
      { color: 'rgba(255, 255, 255, 0.5)', glow: 'rgba(255, 255, 255, 0.3)', blur: 3 },
    ];

    const createParticle = (layer: 'foreground' | 'midground' | 'background', initialSpawn: boolean = false): Particle => {
      let palette;
      let size: number;
      let speedY: number;
      let baseOpacity: number;

      if (layer === 'foreground') {
        palette = foregroundColors[Math.floor(Math.random() * foregroundColors.length)];
        size = Math.random() * 2.5 + 3.5; // 3.5px - 6.0px
        speedY = -(Math.random() * 0.22 + 0.12); // ~0.4x speed
        baseOpacity = Math.random() * 0.35 + 0.55;
      } else if (layer === 'midground') {
        palette = midgroundColors[Math.floor(Math.random() * midgroundColors.length)];
        size = Math.random() * 1.4 + 1.6; // 1.6px - 3.0px
        speedY = -(Math.random() * 0.34 + 0.16); // ~0.4x speed
        baseOpacity = Math.random() * 0.45 + 0.45;
      } else {
        palette = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
        size = Math.random() * 0.7 + 0.8; // 0.8px - 1.5px
        speedY = -(Math.random() * 0.14 + 0.06); // ~0.4x speed
        baseOpacity = Math.random() * 0.35 + 0.25;
      }

      return {
        x: Math.random() * width,
        y: initialSpawn ? Math.random() * height : height + Math.random() * 40,
        size,
        speedY,
        speedX: (Math.random() - 0.5) * 0.15,
        opacity: baseOpacity,
        baseOpacity,
        color: palette.color,
        glowColor: palette.glow,
        glowBlur: palette.glowBlur,
        layer,
        oscillationSpeed: Math.random() * 0.008 + 0.003, // ~0.4x slower sway
        oscillationDistance: layer === 'foreground' ? Math.random() * 2.2 + 1.2 : Math.random() * 1.4 + 0.5,
        oscillationOffset: Math.random() * Math.PI * 2,
        turbulenceFreq: Math.random() * 0.006 + 0.002, // ~0.4x slower turbulence
      };
    };

    const isMobile = window.innerWidth < 768;

    // Responsive Particle Budget: 38 particles on mobile (saves battery & locks 60 FPS), 129 on desktop
    const foregroundCount = isMobile ? 4 : 14;
    const midgroundCount = isMobile ? 16 : 50;
    const backgroundCount = isMobile ? 18 : 65;

    for (let i = 0; i < foregroundCount; i++) particles.push(createParticle('foreground', true));
    for (let i = 0; i < midgroundCount; i++) particles.push(createParticle('midground', true));
    for (let i = 0; i < backgroundCount; i++) particles.push(createParticle('background', true));

    let time = 0;

    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // 3D-like Turbulence and Wind Drift Physics
        const windDrift = Math.sin(time * p.oscillationSpeed + p.oscillationOffset) * p.oscillationDistance;
        const microTurbulence = Math.cos(time * p.turbulenceFreq + p.x * 0.01) * 0.3;

        p.y += p.speedY;
        p.x += p.speedX + windDrift * 0.18 + microTurbulence;

        // Subtle Organic Flicker
        p.opacity = p.baseOpacity * (0.85 + Math.sin(time * 0.05 + p.oscillationOffset) * 0.15);

        // Respawn when reaching top or drifting out
        if (p.y < -30 || p.x < -30 || p.x > width + 30) {
          particles[i] = createParticle(p.layer, false);
          continue;
        }

        // Draw particle based on layer
        ctx.save();
        ctx.shadowBlur = p.glowBlur;
        ctx.shadowColor = p.glowColor;
        ctx.globalAlpha = Math.max(0, Math.min(1, p.opacity));
        ctx.fillStyle = p.color;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      id="atmospheric-void-engine" 
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none"
      aria-hidden="true"
    >
      {/* ---------------------------------------------------------------------
         LAYER 1: VOLUMETRIC NEBULAE & VOID MISTS (VISIBILITY BOOSTED)
         --------------------------------------------------------------------- */}
      {/* Crimson Mist (Top-Left Origin: rich crimson cloud) */}
      <div 
        className="absolute -top-32 -left-32 w-[850px] h-[850px] rounded-full bg-red-600/30 blur-[170px] animate-pulse-slow pointer-events-none transform-gpu" 
      />

      {/* Indigo/Susanoo Mist (Bottom-Right: deep violet core) */}
      <div 
        className="absolute -bottom-32 -right-32 w-[900px] h-[900px] rounded-full bg-purple-700/25 blur-[180px] animate-pulse-slow pointer-events-none transform-gpu" 
        style={{ animationDelay: '3.5s' }}
      />

      {/* Void Pulse (Mid-Right Core) */}
      <div 
        className="absolute top-1/3 -right-44 w-[750px] h-[750px] rounded-full bg-purple-900/25 blur-[160px] animate-pulse-slow pointer-events-none transform-gpu" 
        style={{ animationDelay: '5s' }}
      />

      {/* Central Astral Glow (Subtle center warmth) */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-rose-900/20 blur-[150px] animate-pulse-slow pointer-events-none transform-gpu" 
        style={{ animationDelay: '1.5s' }}
      />

      {/* ---------------------------------------------------------------------
         LAYER 2: GEOMETRIC CELESTIAL SEALS & RITUAL ORBITS (120s slow spin)
         --------------------------------------------------------------------- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] sm:w-[1300px] h-[1000px] sm:h-[1300px] pointer-events-none opacity-[0.14] animate-orbit-120 transform-gpu">
        <svg viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-red-500/80">
          {/* Concentric Void Rings */}
          <circle cx="500" cy="500" r="480" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 14" />
          <circle cx="500" cy="500" r="410" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.9" />
          <circle cx="500" cy="500" r="340" stroke="currentColor" strokeWidth="1.8" strokeDasharray="16 28" />
          <circle cx="500" cy="500" r="260" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 8" />
          <circle cx="500" cy="500" r="180" stroke="currentColor" strokeWidth="1.8" strokeOpacity="0.95" />
          <circle cx="500" cy="500" r="100" stroke="currentColor" strokeWidth="1.2" strokeDasharray="10 10" />

          {/* Axial Crosshairs & Astrological Cardinal Marks */}
          <line x1="500" y1="10" x2="500" y2="990" stroke="currentColor" strokeWidth="1.2" strokeDasharray="8 12" />
          <line x1="10" y1="500" x2="990" y2="500" stroke="currentColor" strokeWidth="1.2" strokeDasharray="8 12" />
          <line x1="150" y1="150" x2="850" y2="850" stroke="currentColor" strokeWidth="1" strokeDasharray="4 16" />
          <line x1="850" y1="150" x2="150" y2="850" stroke="currentColor" strokeWidth="1" strokeDasharray="4 16" />

          {/* Hexagonal Astrolabe Nodes */}
          <polygon points="500,160 794,330 794,670 500,840 206,670 206,330" stroke="currentColor" strokeWidth="1.2" strokeDasharray="12 18" />
          <polygon points="500,240 725,370 725,630 500,760 275,630 275,370" stroke="currentColor" strokeWidth="1" strokeOpacity="0.8" />
        </svg>
      </div>

      {/* ---------------------------------------------------------------------
         LAYER 3: 3D CANVAS EMBERS (BOKEH, SPARKS, DUST & TURBULENCE)
         --------------------------------------------------------------------- */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-95"
      />

      {/* ---------------------------------------------------------------------
         LAYER 4: CINEMATIC RADIAL VIGNETTE
         --------------------------------------------------------------------- */}
      <div 
        className="absolute inset-0 pointer-events-none bg-radial-vignette z-20" 
      />
    </div>
  );
};
