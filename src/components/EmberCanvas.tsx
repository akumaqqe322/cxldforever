import React, { useEffect, useRef } from 'react';

interface Ember {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  baseOpacity: number;
  color: string;
  glowColor: string;
  oscillationSpeed: number;
  oscillationDistance: number;
  oscillationOffset: number;
}

export const EmberCanvas: React.FC = () => {
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

    // Madara / Shinobi Battlefield Ember Palette
    const emberColors = [
      { color: '#ff003c', glow: 'rgba(255, 0, 60, 0.8)' },    // Blood Crimson
      { color: '#ff3b00', glow: 'rgba(255, 59, 0, 0.8)' },    // Blazing Orange
      { color: '#ff7700', glow: 'rgba(255, 119, 0, 0.7)' },   // Fire Amber
      { color: '#8b0028', glow: 'rgba(139, 0, 40, 0.6)' },    // Deep Uchiha Red
      { color: '#a855f7', glow: 'rgba(168, 85, 247, 0.5)' },  // Susanoo Violet
    ];

    const particleCount = Math.min(Math.floor((width * height) / 22000), 55);
    const embers: Ember[] = [];

    const createEmber = (initialSpawn: boolean = false): Ember => {
      const colorProfile = emberColors[Math.floor(Math.random() * emberColors.length)];
      const baseOpacity = Math.random() * 0.55 + 0.25;
      
      return {
        x: Math.random() * width,
        y: initialSpawn ? Math.random() * height : height + Math.random() * 40,
        size: Math.random() * 2.2 + 0.8,
        speedY: -(Math.random() * 0.75 + 0.35),
        speedX: (Math.random() - 0.5) * 0.4,
        opacity: baseOpacity,
        baseOpacity,
        color: colorProfile.color,
        glowColor: colorProfile.glow,
        oscillationSpeed: Math.random() * 0.03 + 0.01,
        oscillationDistance: Math.random() * 1.5 + 0.5,
        oscillationOffset: Math.random() * Math.PI * 2,
      };
    };

    for (let i = 0; i < particleCount; i++) {
      embers.push(createEmber(true));
    }

    let time = 0;

    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < embers.length; i++) {
        const p = embers[i];

        // Motion physics
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(time * p.oscillationSpeed + p.oscillationOffset) * 0.3;

        // Subtle flicker
        p.opacity = p.baseOpacity * (0.8 + Math.sin(time * 0.05 + p.oscillationOffset) * 0.2);

        // Respawn if moved offscreen
        if (p.y < -20 || p.x < -20 || p.x > width + 20) {
          embers[i] = createEmber(false);
          continue;
        }

        // Draw Ember Particle with Soft Radial Glow
        ctx.save();
        ctx.shadowBlur = 10;
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
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1] opacity-75"
      aria-hidden="true"
    />
  );
};
