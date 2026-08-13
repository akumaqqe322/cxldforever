import React from 'react';
import { motion } from 'framer-motion';

export const SusanooBackdrop: React.FC = () => {
  return (
    <div
      id="susanoo-backdrop-layer"
      className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden"
      aria-hidden="true"
    >
      <motion.div
        className="relative w-full max-w-[1300px] h-[90vh] flex items-center justify-center"
        initial={{ opacity: 0.18, scale: 1 }}
        animate={{
          scale: [1, 1.025, 1],
          opacity: [0.18, 0.25, 0.18],
        }}
        transition={{
          repeat: Infinity,
          duration: 9,
          ease: 'easeInOut',
        }}
        style={{
          maskImage: 'radial-gradient(ellipse 70% 65% at 50% 50%, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 65% at 50% 50%, black 40%, transparent 80%)',
        }}
      >
        <svg
          viewBox="0 0 1000 900"
          className="w-full h-full object-contain filter drop-shadow-[0_0_60px_rgba(225,29,72,0.35)] drop-shadow-[0_0_90px_rgba(147,51,234,0.25)] select-none pointer-events-none"
        >
          <defs>
            {/* Susanoo Indigo & Crimson Primary Gradient */}
            <linearGradient id="susanoo-flame-body" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#9333ea" stopOpacity="0.85" />
              <stop offset="35%" stopColor="#ff003c" stopOpacity="0.75" />
              <stop offset="70%" stopColor="#4c0519" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.1" />
            </linearGradient>

            <linearGradient id="susanoo-armor-plate" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff003c" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#6b21a8" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#09090b" stopOpacity="0.8" />
            </linearGradient>

            {/* Flaming Wings / Mantle Gradient */}
            <linearGradient id="susanoo-wing-flame" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#581c87" stopOpacity="0" />
              <stop offset="40%" stopColor="#ff003c" stopOpacity="0.45" />
              <stop offset="70%" stopColor="#9333ea" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#ff003c" stopOpacity="0.1" />
            </linearGradient>

            {/* Glowing Eye Visor Radial */}
            <radialGradient id="susanoo-eye-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="30%" stopColor="#ffea79" stopOpacity="1" />
              <stop offset="65%" stopColor="#ff003c" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#880020" stopOpacity="0" />
            </radialGradient>

            {/* Subtle Aura Filter */}
            <filter id="chakra-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* =========================================================================
              1. PERFECT SUSANOO WINGS / ETHEREAL CHAKRA MANTLE (OUTER WINGS)
              ========================================================================= */}
          <g id="susanoo-wings" opacity="0.75" filter="url(#chakra-glow)">
            {/* Left Ethereal Wing Plumes */}
            <path
              d="M 500 450 
                 C 380 320, 200 240, 60 120 
                 C 100 220, 160 360, 240 480 
                 C 120 380, 40 320, 10 260 
                 C 60 400, 150 560, 320 660 
                 C 200 580, 120 540, 80 500 
                 C 140 640, 260 740, 450 780 
                 Z"
              fill="url(#susanoo-wing-flame)"
            />
            {/* Right Ethereal Wing Plumes */}
            <path
              d="M 500 450 
                 C 620 320, 800 240, 940 120 
                 C 900 220, 840 360, 760 480 
                 C 880 380, 960 320, 990 260 
                 C 940 400, 850 560, 680 660 
                 C 800 580, 880 540, 920 500 
                 C 860 640, 740 740, 550 780 
                 Z"
              fill="url(#susanoo-wing-flame)"
            />
          </g>

          {/* =========================================================================
              2. PERFECT SUSANOO SAMURAI / TENGU SHOULDER ARMOR (PAULDRONS)
              ========================================================================= */}
          <g id="susanoo-pauldrons">
            {/* Left Shoulder Armor Tier 1 */}
            <path
              d="M 380 380 L 220 340 L 160 420 L 320 480 Z"
              fill="url(#susanoo-armor-plate)"
              stroke="#ff003c"
              strokeWidth="2"
              strokeOpacity="0.8"
            />
            {/* Left Shoulder Armor Tier 2 */}
            <path
              d="M 360 460 L 190 430 L 140 510 L 310 550 Z"
              fill="url(#susanoo-armor-plate)"
              stroke="#ff003c"
              strokeWidth="1.5"
              strokeOpacity="0.7"
            />
            {/* Left Shoulder Blade Spike */}
            <path
              d="M 220 340 L 130 250 L 160 420 Z"
              fill="#581c87"
              stroke="#ff003c"
              strokeWidth="2"
            />

            {/* Right Shoulder Armor Tier 1 */}
            <path
              d="M 620 380 L 780 340 L 840 420 L 680 480 Z"
              fill="url(#susanoo-armor-plate)"
              stroke="#ff003c"
              strokeWidth="2"
              strokeOpacity="0.8"
            />
            {/* Right Shoulder Armor Tier 2 */}
            <path
              d="M 640 460 L 810 430 L 860 510 L 690 550 Z"
              fill="url(#susanoo-armor-plate)"
              stroke="#ff003c"
              strokeWidth="1.5"
              strokeOpacity="0.7"
            />
            {/* Right Shoulder Blade Spike */}
            <path
              d="M 780 340 L 870 250 L 840 420 Z"
              fill="#581c87"
              stroke="#ff003c"
              strokeWidth="2"
            />
          </g>

          {/* =========================================================================
              3. TORSO & CHAKRA RIBCAGE / SAMURAI CUIRASS
              ========================================================================= */}
          <g id="susanoo-torso">
            {/* Main Torso Block */}
            <path
              d="M 400 360 L 500 390 L 600 360 L 580 580 L 500 660 L 420 580 Z"
              fill="url(#susanoo-flame-body)"
              stroke="#ff003c"
              strokeWidth="2"
              strokeOpacity="0.9"
            />

            {/* Chest Plate / Diamond Core */}
            <polygon
              points="500,410 540,460 500,510 460,460"
              fill="#180007"
              stroke="#ff003c"
              strokeWidth="3"
            />
            <circle cx="500" cy="460" r="14" fill="#ff003c" filter="url(#chakra-glow)" />

            {/* Rib Armor Segments */}
            <path
              d="M 420 480 Q 500 520 580 480"
              fill="none"
              stroke="#ff003c"
              strokeWidth="2"
              strokeOpacity="0.7"
            />
            <path
              d="M 430 530 Q 500 570 570 530"
              fill="none"
              stroke="#ff003c"
              strokeWidth="2"
              strokeOpacity="0.7"
            />
            <path
              d="M 440 580 Q 500 620 560 580"
              fill="none"
              stroke="#ff003c"
              strokeWidth="2"
              strokeOpacity="0.7"
            />
          </g>

          {/* =========================================================================
              4. TENGU HELMET, HORNS & LONG SHINOBI MASK
              ========================================================================= */}
          <g id="susanoo-head">
            {/* Giant Crown Horns / Tengu Crest */}
            {/* Left Horn */}
            <path
              d="M 480 200 C 440 120, 360 60, 290 20 C 340 90, 390 180, 430 250 Z"
              fill="#ff003c"
              stroke="#6b21a8"
              strokeWidth="3"
            />
            {/* Right Horn */}
            <path
              d="M 520 200 C 560 120, 640 60, 710 20 C 660 90, 610 180, 570 250 Z"
              fill="#ff003c"
              stroke="#6b21a8"
              strokeWidth="3"
            />

            {/* Helmet Forehead Crest / Diamond Jewel */}
            <polygon
              points="500,160 530,220 500,280 470,220"
              fill="#2e0854"
              stroke="#ff003c"
              strokeWidth="3.5"
            />
            <polygon
              points="500,185 515,220 500,255 485,220"
              fill="#ff003c"
              filter="url(#chakra-glow)"
            />

            {/* Tengu Samurai Mask Base */}
            <path
              d="M 440 230 L 560 230 L 580 320 L 540 380 L 500 400 L 460 380 L 420 320 Z"
              fill="#120005"
              stroke="#ff003c"
              strokeWidth="3"
            />

            {/* Long Tengu Nose / Center Ridge */}
            <path
              d="M 500 230 L 508 330 L 500 350 L 492 330 Z"
              fill="#ff003c"
              stroke="#581c87"
              strokeWidth="1.5"
            />

            {/* Fierce Samurai Brow & Visor Slits */}
            <path
              d="M 445 270 L 485 285 L 480 300 L 440 285 Z"
              fill="#1e0009"
              stroke="#ff003c"
              strokeWidth="2"
            />
            <path
              d="M 555 270 L 515 285 L 520 300 L 560 285 Z"
              fill="#1e0009"
              stroke="#ff003c"
              strokeWidth="2"
            />

            {/* Glowing Golden / Crimson Susanoo Eyes */}
            {/* Left Eye */}
            <polygon
              points="450,280 480,290 475,296 445,286"
              fill="url(#susanoo-eye-glow)"
              filter="url(#chakra-glow)"
            />
            <circle cx="465" cy="286" r="4" fill="#ffffff" />

            {/* Right Eye */}
            <polygon
              points="550,280 520,290 525,296 555,286"
              fill="url(#susanoo-eye-glow)"
              filter="url(#chakra-glow)"
            />
            <circle cx="535" cy="286" r="4" fill="#ffffff" />

            {/* Fierce Tengu Fangs / Lower Mask Teeth */}
            <polygon points="475,340 485,360 480,340" fill="#ffffff" />
            <polygon points="525,340 515,360 520,340" fill="#ffffff" />
            <polygon points="495,355 500,370 505,355" fill="#ffffff" />
          </g>

          {/* Outer Chakra Energy Flakes / Floating Orbs */}
          <g fill="#ff003c" filter="url(#chakra-glow)" opacity="0.6">
            <circle cx="280" cy="180" r="5" />
            <circle cx="720" cy="180" r="5" />
            <circle cx="210" cy="380" r="4" />
            <circle cx="790" cy="380" r="4" />
            <circle cx="340" cy="620" r="6" />
            <circle cx="660" cy="620" r="6" />
          </g>
        </svg>
      </motion.div>
    </div>
  );
};
