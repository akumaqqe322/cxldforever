import React from 'react';
import { motion } from 'framer-motion';

interface MadaraEMSProps {
  className?: string;
  size?: number | string;
  opacity?: number;
}

export const MadaraEMS: React.FC<MadaraEMSProps> = ({ 
  className = '', 
  size = '100%',
  opacity = 0.08
}) => {
  return (
    <div 
      className={`pointer-events-none select-none flex items-center justify-center ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <motion.svg
        viewBox="0 0 400 400"
        style={{ width: size, height: size }}
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 65,
          ease: 'linear',
        }}
        className="transform-gpu filter drop-shadow-[0_0_20px_rgba(255,0,60,0.6)]"
      >
        <defs>
          {/* Crimson Flame / Chakra Glow */}
          <radialGradient id="ems-crimson-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff003c" stopOpacity="0.8" />
            <stop offset="65%" stopColor="#800020" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>

          <filter id="ems-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Crimson Background Aura */}
        <circle cx="200" cy="200" r="185" fill="url(#ems-crimson-glow)" opacity="0.4" />

        {/* Outer Eyeball / Iris Border */}
        <circle 
          cx="200" 
          cy="200" 
          r="180" 
          fill="none" 
          stroke="#ff003c" 
          strokeWidth="3.5" 
          strokeDasharray="4 2" 
          opacity="0.75" 
        />
        <circle 
          cx="200" 
          cy="200" 
          r="170" 
          fill="none" 
          stroke="#ff003c" 
          strokeWidth="6" 
          opacity="0.85" 
        />

        {/* Madara Eternal Mangekyo Intersecting Blades (3 Symmetry) */}
        <g id="ems-pattern" filter="url(#ems-glow)">
          {/* Blade 1 (0 deg) */}
          <path
            d="M 200 200 
               C 170 120, 160 50, 200 25 
               C 240 50, 230 120, 200 200 Z"
            fill="#ff003c"
            stroke="#120004"
            strokeWidth="3"
          />
          <path
            d="M 200 25 
               C 140 70, 70 140, 25 200
               C 70 180, 140 120, 200 25 Z"
            fill="#800020"
            opacity="0.6"
          />

          {/* Blade 2 (120 deg) */}
          <g transform="rotate(120 200 200)">
            <path
              d="M 200 200 
                 C 170 120, 160 50, 200 25 
                 C 240 50, 230 120, 200 200 Z"
              fill="#ff003c"
              stroke="#120004"
              strokeWidth="3"
            />
            <path
              d="M 200 25 
                 C 140 70, 70 140, 25 200
                 C 70 180, 140 120, 200 25 Z"
              fill="#800020"
              opacity="0.6"
            />
          </g>

          {/* Blade 3 (240 deg) */}
          <g transform="rotate(240 200 200)">
            <path
              d="M 200 200 
                 C 170 120, 160 50, 200 25 
                 C 240 50, 230 120, 200 200 Z"
              fill="#ff003c"
              stroke="#120004"
              strokeWidth="3"
            />
            <path
              d="M 200 25 
                 C 140 70, 70 140, 25 200
                 C 70 180, 140 120, 200 25 Z"
              fill="#800020"
              opacity="0.6"
            />
          </g>

          {/* Outer Tomoe Intersecting Rings */}
          <circle 
            cx="200" 
            cy="200" 
            r="120" 
            fill="none" 
            stroke="#ff003c" 
            strokeWidth="4" 
            opacity="0.9" 
          />

          {/* Central Pupil Core */}
          <circle 
            cx="200" 
            cy="200" 
            r="38" 
            fill="#050002" 
            stroke="#ff003c" 
            strokeWidth="4" 
          />
          <circle 
            cx="200" 
            cy="200" 
            r="16" 
            fill="#ff003c" 
          />
          <circle 
            cx="200" 
            cy="200" 
            r="7" 
            fill="#000000" 
          />
        </g>
      </motion.svg>
    </div>
  );
};
