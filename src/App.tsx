import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Lenis from 'lenis';
import { 
  ArrowUpRight,
  Disc3,
  Flame,
  Radio,
  Music2,
  ShieldCheck,
  Trophy,
  Zap,
  ExternalLink,
  Sparkles,
  Mouse,
  Keyboard,
  Monitor,
  Layers,
  Cpu,
  Copy,
  Check
} from 'lucide-react';
import { 
  FaDiscord, 
  FaTwitch, 
  FaTelegramPlane,
  FaSpotify
} from 'react-icons/fa';
import { useLanyard } from './hooks/useLanyard';
import { AtmosphericVoidEngine } from './components/AtmosphericVoidEngine';
import { MadaraEMS } from './components/MadaraEMS';

// Direct static asset imports from root (Vite bundles and optimizes these for Netlify)
import garouImg from '../garou.jpg';
import igrisImg from '../igris.png';
import spotifyImg from '../spotifyart.png';
import milestonesImg from '../milestonesart.png';
import hardwareImg from '../hardwareart.png';

// Discord ID for Lanyard Presence
const DISCORD_USER_ID = '373840651600789504';

// Customizable Achievements & Milestones List
const ACHIEVEMENTS = [
  {
    tag: '◈ TOP 1% ELO',
    desc: 'Absolute mechanical precision',
    highlight: 'text-red-400/90',
    borderGlow: 'hover:border-red-500/40'
  },
  {
    tag: '◈ BROADCAST',
    desc: 'Live execution',
    highlight: 'text-purple-300/90',
    borderGlow: 'hover:border-purple-500/40'
  },
  {
    tag: '◈ ZENITH',
    desc: 'Solitary at the peak',
    highlight: 'text-zinc-200',
    borderGlow: 'hover:border-white/30'
  },
];

// Customizable Peripherals & Hardware Setup List
const HARDWARE_PERIPHERALS = [
  {
    category: 'MOUSE',
    model: 'Attack Shark R5 Ultra',
    icon: Mouse,
    accent: 'text-red-400',
    border: 'hover:border-red-500/30'
  },
  {
    category: 'KEYBOARD',
    model: 'MonsGeek Fun60 Pro',
    icon: Keyboard,
    accent: 'text-purple-400',
    border: 'hover:border-purple-500/30'
  },
  {
    category: 'PAD',
    model: 'Aqua Control+',
    icon: Layers,
    accent: 'text-zinc-300',
    border: 'hover:border-white/30'
  },
  {
    category: 'DISPLAY',
    model: 'AOC 27G50Z',
    icon: Monitor,
    accent: 'text-rose-400',
    border: 'hover:border-rose-500/30'
  },
];

export default function App() {
  const [isEntered, setIsEntered] = useState<boolean>(false);
  const [cursorVisible, setCursorVisible] = useState<boolean>(true);
  const [copiedTag, setCopiedTag] = useState<boolean>(false);

  // Tactical Haptic Vibration Engine for Mobile & Touch
  const triggerHaptic = (duration: number = 15) => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(duration);
      } catch {
        // Safe fallback on browsers without vibration permission
      }
    }
  };

  const handleCopyDiscord = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    triggerHaptic(25);
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText('cxldforever');
      setCopiedTag(true);
      setTimeout(() => setCopiedTag(false), 2000);
    }
  };

  const handleEnter = () => {
    triggerHaptic(30);
    setIsEntered(true);
  };

  // Framer Motion Parallax Background Scroll Hooks
  const { scrollYProgress } = useScroll();
  
  // Parallax Y displacement for ambient background glow
  const bgGlowParallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const bgGlowParallaxYReverse = useTransform(scrollYProgress, [0, 1], [0, 80]);

  // Lenis Kinetic Smooth Momentum Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Lanyard Live Presence Hook
  const { 
    isListeningToSpotify, 
    spotify, 
    status, 
    avatarUrl, 
    discordUser 
  } = useLanyard(DISCORD_USER_ID);

  // Blinking terminal cursor on splash
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  // Keyboard shortcut listener to enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isEntered && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        handleEnter();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isEntered]);

  // Discord status visual mapper
  const getStatusConfig = () => {
    switch (status) {
      case 'online':
        return {
          dotColor: 'bg-emerald-400',
          shadowColor: 'shadow-[0_0_10px_#34d399]',
          label: 'ONLINE // ASCENDED',
        };
      case 'dnd':
        return {
          dotColor: 'bg-[#ff003c]',
          shadowColor: 'shadow-[0_0_10px_#ff003c]',
          label: 'DO NOT DISTURB',
        };
      case 'idle':
        return {
          dotColor: 'bg-amber-400',
          shadowColor: 'shadow-[0_0_10px_#fbbf24]',
          label: 'IDLE // MEDITATING',
        };
      default:
        return {
          dotColor: 'bg-zinc-500',
          shadowColor: 'shadow-[0_0_6px_rgba(255,255,255,0.2)]',
          label: 'RESTING IN VOID',
        };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <main 
      id="anime-dark-root"
      className="relative min-h-screen w-full bg-[#040406] text-zinc-100 select-none font-sans overflow-x-hidden antialiased"
    >
      {/* Atmospheric Void Engine: Volumetric Nebulae + Celestial Rings + 3D Multi-Layer Embers + Vignette */}
      <AtmosphericVoidEngine />

      {/* SVG Film Grain Texture Overlay */}
      <div 
        id="grain-overlay" 
        className="fixed inset-0 pointer-events-none z-[2] bg-noise opacity-30" 
      />

      {/* Subtle Scanline Grid */}
      <div 
        id="scanlines-overlay" 
        className="fixed inset-0 pointer-events-none z-[3] scanlines opacity-20" 
      />

      {/* =========================================================================
         SCREEN CONTROLLER: SPLASH OR SCROLLABLE SOVEREIGN DOMAIN
         ========================================================================= */}
      <AnimatePresence mode="wait">
        {!isEntered ? (
          /* =========================================================================
             SPLASH SCREEN: [ cxldforever — wake up to reality ] + BLOOD ECLIPSE HALO
             ========================================================================= */
          <motion.div
            id="ascension-splash"
            key="splash"
            onClick={handleEnter}
            onTouchStart={handleEnter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ 
              opacity: 0, 
              scale: 1.08, 
              filter: 'blur(20px)',
              transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } 
            }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center cursor-pointer bg-[#040406]/95 backdrop-blur-md p-4 sm:p-6 overflow-hidden touch-manipulation active:scale-[0.99] transition-transform"
          >
            {/* Atmospheric Background Calligraphic Kanji 虚空 */}
            <div 
              className="absolute font-serif text-8xl sm:text-9xl md:text-[14rem] font-black text-red-500/[0.04] pointer-events-none select-none tracking-widest leading-none z-0 scale-125"
              aria-hidden="true"
            >
              虚空
            </div>

            {/* Blood Eclipse Halo (Radiant Deep Red / Violet Vortex) */}
            <div className="absolute w-[320px] sm:w-[520px] h-[320px] sm:h-[520px] rounded-full bg-gradient-to-r from-red-600/25 via-purple-900/20 to-transparent blur-[80px] sm:blur-[100px] animate-pulse pointer-events-none z-0 transform-gpu" />

            {/* Background Rotating EMS Halo */}
            <div className="absolute w-64 h-64 sm:w-72 sm:h-72 pointer-events-none opacity-20 z-0 animate-slow-spin">
              <MadaraEMS size="100%" opacity={0.35} />
            </div>

            {/* Center Monospace Awakening Prompt */}
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="group relative z-10 px-5 sm:px-9 py-4 sm:py-6 rounded-2xl border border-red-500/30 bg-black/70 backdrop-blur-2xl shadow-[0_0_50px_-10px_rgba(255,0,60,0.4)] transition-all duration-300 hover:border-[#ff003c]/70 hover:shadow-[0_0_65px_rgba(255,0,60,0.55)] active:scale-95 touch-manipulation"
            >
              {/* Subtle Red & Susanoo Halo on box */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#ff003c]/30 via-[#9333ea]/25 to-[#ff003c]/30 opacity-70 blur-xl transition duration-500 group-hover:opacity-100" />

              <div className="relative flex items-center gap-2.5 sm:gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff003c] shadow-[0_0_10px_#ff003c] animate-ping shrink-0" />
                
                <h1 className="font-mono text-xs sm:text-base md:text-lg font-medium tracking-wider text-zinc-100 animate-crimson-glow">
                  [ cxldforever — wake up to reality ]
                </h1>
                
                <span className={`font-mono text-base text-[#ff003c] ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}>
                  _
                </span>
              </div>
            </motion.div>

            <p className="relative z-10 mt-5 sm:mt-6 text-[10px] sm:text-[11px] font-mono text-zinc-500 tracking-widest uppercase flex items-center gap-2">
              <span>◈</span>
              <span>tap anywhere or press space to awaken</span>
              <span>◈</span>
            </p>
          </motion.div>
        ) : (
          /* =========================================================================
             SCROLLABLE FULL VIEWPORT EXPERIENCE (3 SECTIONS — DENSE & SEAMLESS)
             ========================================================================= */
          <div 
            id="ascension-scroll-wrapper"
            key="content"
            className="relative z-10 w-full max-w-6xl mx-auto px-3.5 sm:px-6 py-6 sm:py-10 min-h-dvh flex flex-col items-center space-y-6 sm:space-y-8"
          >
            {/* =======================================================================
               SECTION 1: THE VOID PINNACLE (HERO SCREEN)
               ======================================================================= */}
            <section 
              id="section-hero"
              className="w-full flex flex-col gap-3.5 sm:gap-4"
            >
              {/* TOP MINIMAL ASCENSION BAR */}
              <motion.header
                id="top-ascension-bar"
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="relative w-full rounded-xl backdrop-blur-xl bg-[#07070a]/80 border border-white/[0.08] hover:border-red-500/40 px-3.5 sm:px-5 py-2.5 flex items-center justify-between shadow-lg shadow-black/60 shrink-0 transition-all duration-300"
              >
                {/* Left Live Status */}
                <div className="flex items-center gap-2 font-mono text-xs text-zinc-300">
                  <span className={`w-2 h-2 rounded-full ${statusConfig.dotColor} ${statusConfig.shadowColor} animate-pulse`} />
                  <span className="font-bold tracking-wider text-zinc-200 text-[11px] sm:text-xs">
                    {statusConfig.label}
                  </span>
                </div>

                {/* Right Status Indicator: 「 SOVEREIGN 」 */}
                <div className="font-mono text-[11px] sm:text-xs font-medium tracking-wide flex items-center gap-1">
                  <span className="text-zinc-500">「</span>
                  <span className="text-red-400 font-semibold tracking-wider flex items-center gap-1 sm:gap-1.5">
                    <Zap className="w-3 h-3 text-[#ff003c]" />
                    SOVEREIGN
                  </span>
                  <span className="text-zinc-500">」</span>
                </div>
              </motion.header>

              {/* BENTO GRID (PROFILE + SPOTIFY + ACHIEVEMENTS + HARDWARE — DENSE) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-5 items-stretch">
                {/* 1. ГЛАВНЫЙ СУВЕРЕННЫЙ ПРОФИЛЬ — lg:col-span-7 */}
                <motion.div
                  id="bento-card-profile"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
                  whileHover={{ 
                    y: -3,
                    boxShadow: '0 0 35px -10px rgba(255, 0, 60, 0.35)',
                  }}
                  className="col-span-1 lg:col-span-7 relative rounded-2xl backdrop-blur-xl bg-[#07070a]/80 border border-white/[0.08] hover:border-red-500/40 p-5 sm:p-7 transition-all duration-300 shadow-xl shadow-black/60 flex flex-col justify-between group overflow-hidden"
                >
                  {/* Background EMS Watermark */}
                  <div className="absolute -right-12 -top-12 sm:-right-8 sm:-top-8 w-56 h-56 sm:w-80 sm:h-80 z-0 pointer-events-none opacity-[0.08] sm:opacity-[0.09] group-hover:opacity-[0.14] transition-opacity duration-500">
                    <MadaraEMS size="100%" opacity={1} />
                  </div>

                  {/* Japanese Vertical Calligraphy Watermark: 虚空 覇者 */}
                  <div 
                    className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 font-serif text-4xl sm:text-6xl font-black text-red-500/[0.04] sm:text-red-500/[0.05] group-hover:text-red-500/[0.08] transition-colors duration-500 pointer-events-none select-none tracking-widest leading-none z-0 [writing-mode:vertical-rl]"
                    aria-hidden="true"
                  >
                    虚空 覇者
                  </div>

                  {/* Corner Markers */}
                  <span className="absolute top-3 left-3 font-mono text-[10px] text-zinc-600 font-bold tracking-widest">+</span>
                  <span className="absolute top-3 right-3 font-mono text-[10px] text-zinc-600 font-bold tracking-widest">+</span>
                  <span className="absolute bottom-3 left-3 font-mono text-[10px] text-zinc-600 font-bold tracking-widest">+</span>
                  <span className="absolute bottom-3 right-3 font-mono text-[10px] text-zinc-600 font-bold tracking-widest">+</span>

                  <div className="relative z-10">
                    <div className="flex items-center gap-4 sm:gap-6">
                      {/* Discord Live Avatar with Glowing Halo */}
                      <div className="relative shrink-0">
                        <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-[#ff003c] via-[#9333ea] to-[#ff003c] opacity-60 blur-md group-hover:opacity-90 animate-pulse transition-opacity" />

                        <div className="relative w-16 h-16 sm:w-22 sm:h-22 rounded-full bg-[#08080c] ring-2 ring-red-500/70 shadow-[0_0_30px_rgba(255,0,60,0.5),0_0_15px_rgba(147,51,234,0.35)] flex items-center justify-center overflow-hidden">
                          {avatarUrl ? (
                            <img 
                              src={avatarUrl} 
                              alt={discordUser.global_name || 'cxldforever'}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-b from-[#180005] via-[#0b0003] to-black flex items-center justify-center">
                              <span className="font-mono font-bold text-red-500 text-base sm:text-lg">CXLD</span>
                            </div>
                          )}
                        </div>

                        {/* Discord Real-time Status Dot */}
                        <div className="absolute bottom-0.5 right-0.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#040406] border border-white/10 flex items-center justify-center shadow-lg">
                          <div className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${statusConfig.dotColor} ${statusConfig.shadowColor}`} />
                        </div>
                      </div>

                      {/* Nickname & Subtitle */}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                          <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-b from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent drop-shadow-[0_0_14px_rgba(255,0,60,0.35)] truncate">
                            cxldforever
                          </h2>
                          <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ff003c] shrink-0" />
                          
                          {/* Interactive Copyable Discord Tag Button with Haptics */}
                          <button
                            type="button"
                            onClick={handleCopyDiscord}
                            className="group/tag inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/[0.04] hover:bg-[#ff003c]/20 border border-white/[0.08] hover:border-red-500/40 text-zinc-400 hover:text-white transition-all cursor-pointer text-[10px] font-mono shrink-0 active:scale-95 touch-manipulation"
                            title="Click to copy Discord handle"
                          >
                            {copiedTag ? (
                              <>
                                <Check className="w-2.5 h-2.5 text-emerald-400" />
                                <span className="text-emerald-400 font-bold">COPIED</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-2.5 h-2.5 text-zinc-400 group-hover/tag:text-red-400" />
                                <span>@cxldforever</span>
                              </>
                            )}
                          </button>
                        </div>

                        <div className="font-mono text-xs sm:text-sm text-red-400 font-semibold tracking-wider mt-0.5 sm:mt-1 flex items-center gap-1.5 truncate">
                          <span>VOID WALKER // UNCONTESTED</span>
                        </div>

                        <div className="font-mono text-[10px] sm:text-xs text-zinc-500 mt-0.5 truncate">
                          // 虚空の覇者 &bull; pinnacle sovereign
                        </div>
                      </div>
                    </div>

                    {/* 3 Badges */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mt-3.5 sm:mt-4">
                      <span className="font-mono text-[10px] sm:text-[11px] font-semibold px-2 sm:px-2.5 py-1 rounded-md bg-white/[0.03] border border-red-500/30 text-red-300/90 shadow-[0_0_8px_rgba(255,0,60,0.15)] flex items-center gap-1.5">
                        <Flame className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#ff003c]" />
                        [ TOP 1% ELO ]
                      </span>
                      <span className="font-mono text-[10px] sm:text-[11px] font-semibold px-2 sm:px-2.5 py-1 rounded-md bg-white/[0.03] border border-indigo-500/30 text-indigo-300/90 shadow-[0_0_8px_rgba(99,102,241,0.15)] flex items-center gap-1.5">
                        <Disc3 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-indigo-400" />
                        [ ASCENDED ]
                      </span>
                      <span className="font-mono text-[10px] sm:text-[11px] font-semibold px-2 sm:px-2.5 py-1 rounded-md bg-white/[0.03] border border-zinc-700/60 text-zinc-300/90 flex items-center gap-1.5">
                        [ SOVEREIGN ]
                      </span>
                    </div>
                  </div>

                  {/* Dense Manifest Quote inside Profile Card */}
                  <div className="relative z-10 mt-3.5 sm:mt-4 pt-3 border-t border-white/[0.06] flex items-center">
                    <p className="font-mono text-[10px] sm:text-xs text-zinc-400 italic">
                      &ldquo;drifting between midnight broadcasts and the pinnacle of the void.&rdquo;
                    </p>
                  </div>
                </motion.div>

                {/* 2. SPOTIFY LIVE PULSE — lg:col-span-5 */}
                <motion.div
                  id="bento-card-spotify"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1, type: 'spring', stiffness: 120 }}
                  whileHover={{ 
                    y: -3,
                    boxShadow: '0 0 35px -10px rgba(16, 185, 129, 0.25)',
                  }}
                  className="col-span-1 lg:col-span-5 relative rounded-2xl backdrop-blur-xl bg-[#07070a]/80 border border-white/[0.08] hover:border-emerald-500/40 p-5 sm:p-7 transition-all duration-300 shadow-xl shadow-black/60 flex flex-col justify-between group overflow-hidden"
                >
                  {/* Aesthetic Spotify Artwork Background with Gradient Mask */}
                  <img 
                    src={spotifyImg} 
                    alt="Spotify Art" 
                    className="absolute right-0 bottom-0 top-0 w-2/3 sm:w-1/2 h-full object-cover object-center pointer-events-none z-0 opacity-20 sm:opacity-35 group-hover:scale-105 group-hover:opacity-55 transition-all duration-700 select-none" 
                    style={{ 
                      maskImage: 'linear-gradient(to left, rgba(0,0,0,0.85) 15%, transparent 95%)', 
                      WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,0.85) 15%, transparent 95%)' 
                    }} 
                    onError={(e) => { 
                      e.currentTarget.style.display = 'none'; 
                    }} 
                  />

                  <span className="absolute top-3 left-3 font-mono text-[10px] text-zinc-600 font-bold tracking-widest pointer-events-none z-10">+</span>
                  <span className="absolute top-3 right-3 font-mono text-[10px] text-zinc-600 font-bold tracking-widest pointer-events-none z-10">+</span>
                  <span className="absolute bottom-3 left-3 font-mono text-[10px] text-zinc-600 font-bold tracking-widest pointer-events-none z-10">+</span>
                  <span className="absolute bottom-3 right-3 font-mono text-[10px] text-zinc-600 font-bold tracking-widest pointer-events-none z-10">+</span>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3.5 sm:mb-4">
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 text-[#1DB954] inline-flex items-center justify-center">
                          <FaSpotify size={16} />
                        </span>
                        <span className="font-mono text-xs font-semibold text-zinc-200 tracking-wider">
                          [ SPOTIFY ]
                        </span>
                      </div>

                      {isListeningToSpotify ? (
                        <div className="flex items-end gap-1 h-6 px-2 py-1 bg-emerald-950/40 rounded border border-emerald-500/30">
                          <motion.div 
                            className="w-1 bg-[#1DB954] rounded-full"
                            animate={{ height: [4, 18, 8, 22, 5] }}
                            transition={{ repeat: Infinity, duration: 1.1, ease: "easeInOut" }}
                          />
                          <motion.div 
                            className="w-1 bg-[#1DB954] rounded-full"
                            animate={{ height: [8, 24, 6, 16, 10] }}
                            transition={{ repeat: Infinity, duration: 0.9, ease: "easeInOut" }}
                          />
                          <motion.div 
                            className="w-1 bg-[#1DB954] rounded-full"
                            animate={{ height: [6, 14, 22, 8, 18] }}
                            transition={{ repeat: Infinity, duration: 1.3, ease: "easeInOut" }}
                          />
                          <motion.div 
                            className="w-1 bg-[#1DB954] rounded-full"
                            animate={{ height: [12, 6, 20, 10, 4] }}
                            transition={{ repeat: Infinity, duration: 1.0, ease: "easeInOut" }}
                          />
                        </div>
                      ) : (
                        <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-white/[0.04] text-zinc-500 border border-white/[0.06]">
                          OFFLINE
                        </span>
                      )}
                    </div>

                    {/* Dynamic Presence Content */}
                    {isListeningToSpotify && spotify ? (
                      <div className="p-3 sm:p-3.5 rounded-xl bg-black/60 border border-white/[0.06] flex items-center gap-3 sm:gap-3.5 overflow-hidden">
                        {(spotify.album_art_url || spotify.albumArt) && (
                          <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden shrink-0 border border-white/10 shadow-md">
                            <img 
                              src={spotify.album_art_url || spotify.albumArt} 
                              alt={spotify.album || spotify.song}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}

                        <div className="min-w-0 flex-1 flex flex-col">
                          <span className="font-semibold text-xs sm:text-sm text-zinc-100 truncate">
                            {spotify.song}
                          </span>
                          <span className="font-mono text-[10px] sm:text-xs text-zinc-400 truncate mt-0.5">
                            {spotify.artist}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="p-3.5 sm:p-4 rounded-xl bg-black/40 border border-white/[0.04] flex items-center gap-3 text-zinc-400">
                        <Music2 className="w-4 h-4 text-zinc-600 shrink-0" />
                        <span className="font-mono text-xs font-semibold text-zinc-400 tracking-wider">
                          SILENCE // ZERO FREQUENCY
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* 3. ACHIEVEMENTS // MILESTONES — lg:col-span-6 */}
                <motion.div
                  id="bento-card-achievements"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15, type: 'spring', stiffness: 120 }}
                  whileHover={{ 
                    y: -2,
                    boxShadow: '0 0 35px -10px rgba(255, 0, 60, 0.25)',
                  }}
                  className="col-span-1 lg:col-span-6 relative rounded-2xl backdrop-blur-xl bg-[#07070a]/80 border border-white/[0.08] hover:border-red-500/40 p-4 sm:p-6 transition-all duration-300 shadow-xl shadow-black/60 group overflow-hidden flex flex-col justify-between"
                >
                  {/* Milestones Artwork Background with Clean Standard Mask & Fit */}
                  <img 
                    src={milestonesImg} 
                    alt="Milestones Art" 
                    className="absolute right-0 bottom-0 top-0 w-2/3 sm:w-1/2 h-full object-cover object-center pointer-events-none z-0 opacity-20 sm:opacity-35 group-hover:scale-105 group-hover:opacity-55 transition-all duration-700 select-none" 
                    style={{ 
                      maskImage: 'linear-gradient(to left, rgba(0,0,0,0.85) 15%, transparent 95%)', 
                      WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,0.85) 15%, transparent 95%)' 
                    }} 
                    onError={(e) => { 
                      e.currentTarget.style.display = 'none'; 
                    }} 
                  />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-[#ff003c]" />
                        <span className="font-mono text-xs font-semibold text-zinc-200 tracking-wider">
                          「 MILESTONES & DOMAIN STANDING 」
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-2 sm:gap-2.5">
                      {ACHIEVEMENTS.map((item, idx) => (
                        <div
                          key={idx}
                          onClick={() => triggerHaptic(10)}
                          className={`p-2.5 px-3 rounded-xl bg-black/50 border border-white/[0.06] ${item.borderGlow} active:scale-[0.98] transition-all duration-200 flex items-center justify-between gap-2 cursor-pointer touch-manipulation`}
                        >
                          <div className={`font-mono text-xs font-bold tracking-wide ${item.highlight}`}>
                            {item.tag}
                          </div>
                          <div className="font-mono text-[10px] sm:text-[11px] text-zinc-400 leading-none truncate">
                            {item.desc}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* 4. HARDWARE // PERIPHERALS — lg:col-span-6 */}
                <motion.div
                  id="bento-card-hardware"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 120 }}
                  whileHover={{ 
                    y: -2,
                    boxShadow: '0 0 35px -10px rgba(255, 0, 60, 0.2)',
                  }}
                  className="col-span-1 lg:col-span-6 relative rounded-2xl backdrop-blur-xl bg-[#07070a]/80 border border-white/[0.08] hover:border-red-500/40 p-4 sm:p-6 transition-all duration-300 shadow-xl shadow-black/60 group overflow-hidden flex flex-col justify-between"
                >
                  {/* Hardware Artwork Background with Clean Standard Mask & Fit */}
                  <img 
                    src={hardwareImg} 
                    alt="Hardware Art" 
                    className="absolute right-0 bottom-0 top-0 w-2/3 sm:w-1/2 h-full object-cover object-center pointer-events-none z-0 opacity-20 sm:opacity-35 group-hover:scale-105 group-hover:opacity-55 transition-all duration-700 select-none" 
                    style={{ 
                      maskImage: 'linear-gradient(to left, rgba(0,0,0,0.85) 15%, transparent 95%)', 
                      WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,0.85) 15%, transparent 95%)' 
                    }} 
                    onError={(e) => { 
                      e.currentTarget.style.display = 'none'; 
                    }} 
                  />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-[#ff003c]" />
                        <span className="font-mono text-xs font-semibold text-zinc-200 tracking-wider">
                          ◈ [ HARDWARE ]
                        </span>
                      </div>
                      <span className="font-mono text-[9px] sm:text-[10px] text-zinc-500 tracking-widest">
                        SPECS // RIG
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                      {HARDWARE_PERIPHERALS.map((peri, idx) => {
                        const IconComponent = peri.icon;
                        return (
                          <div
                            key={idx}
                            onClick={() => triggerHaptic(10)}
                            className={`p-2 sm:p-2.5 px-2.5 sm:px-3 rounded-xl bg-black/50 border border-white/[0.06] ${peri.border} active:scale-[0.97] transition-all duration-200 flex items-center gap-2 sm:gap-2.5 cursor-pointer touch-manipulation`}
                          >
                            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-zinc-900/80 border border-white/[0.06] flex items-center justify-center shrink-0">
                              <IconComponent className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${peri.accent}`} />
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-wider text-zinc-500 font-bold">
                                {peri.category}
                              </span>
                              <span className="font-mono text-[11px] sm:text-xs text-zinc-200 font-medium truncate">
                                {peri.model}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* =======================================================================
               SECTION 2: DOMAIN TRANSMISSIONS (GAROU TWITCH + IGRIS SHADOW COMMS)
               Kinetic Cinematic Entrance with Blur & Parallax Spring Physics
               ======================================================================= */}
            <motion.section 
              id="section-transmissions"
              initial={{ opacity: 0, y: 60, scale: 0.96, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex flex-col gap-3.5 sm:gap-5"
            >
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5 sm:pb-3">
                <div className="flex items-center gap-2 sm:gap-2.5 font-mono text-xs sm:text-sm text-zinc-200 tracking-wider">
                  <Radio className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-400" />
                  <span className="font-bold">「 DOMAIN TRANSMISSIONS 」</span>
                </div>
                <span className="font-mono text-[10px] sm:text-xs text-zinc-500">
                  // UNCONTESTED
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 sm:gap-5 items-stretch">
                {/* -------------------------------------------------------------------
                   CARD 1: TWITCH [GAROU // COSMIC EGO DOMAIN]
                   ------------------------------------------------------------------- */}
                <motion.div
                  id="card-twitch-garou"
                  whileHover={{ 
                    y: -4,
                    boxShadow: '0 0 45px -10px rgba(168, 85, 247, 0.35)',
                  }}
                  className="relative rounded-2xl backdrop-blur-xl bg-[#07070a]/85 border border-purple-500/20 hover:border-purple-500/50 p-5 sm:p-7 transition-all duration-300 shadow-xl shadow-black/70 flex flex-col justify-between group overflow-hidden"
                >
                  {/* Real Garou Cosmic Artwork with Gradient Fade Mask */}
                  <img
                    src={garouImg}
                    alt="Garou"
                    className="absolute right-0 bottom-0 top-0 w-2/3 sm:w-1/2 h-full object-cover object-center pointer-events-none z-0 opacity-25 sm:opacity-40 group-hover:scale-105 group-hover:opacity-60 transition-all duration-700 select-none"
                    style={{
                      maskImage: 'linear-gradient(to left, rgba(0,0,0,0.85) 15%, transparent 95%)',
                      WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,0.85) 15%, transparent 95%)',
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />

                  {/* Corner Accent Markers */}
                  <span className="absolute top-3 left-3 font-mono text-[10px] text-purple-400/60 font-bold tracking-widest">+</span>
                  <span className="absolute top-3 right-3 font-mono text-[10px] text-purple-400/60 font-bold tracking-widest">+</span>
                  <span className="absolute bottom-3 left-3 font-mono text-[10px] text-purple-400/60 font-bold tracking-widest">+</span>
                  <span className="absolute bottom-3 right-3 font-mono text-[10px] text-purple-400/60 font-bold tracking-widest">+</span>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3.5 sm:mb-4">
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-purple-950/60 border border-purple-500/40 flex items-center justify-center text-[#a855f7] shadow-[0_0_15px_rgba(168,85,247,0.35)] group-hover:scale-105 transition-transform">
                          <FaTwitch size={18} />
                        </div>
                        <div>
                          <div className="font-mono text-[10px] sm:text-xs text-purple-400 font-semibold tracking-wider">
                            // UNCONTESTED
                          </div>
                          <h3 className="text-lg sm:text-2xl font-black text-white tracking-tight">
                            ABSOLUTE DOMINION
                          </h3>
                        </div>
                      </div>
                    </div>

                    <p className="mt-2.5 sm:mt-3 font-mono text-[11px] sm:text-xs text-zinc-300 leading-relaxed italic max-w-md bg-black/40 p-2.5 sm:p-3 rounded-lg border border-white/[0.04]">
                      &ldquo;I don&apos;t play to participate. I play to dominate. Unmatched.&rdquo;
                    </p>

                    <div className="mt-3 sm:mt-4 flex flex-wrap gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-mono text-zinc-400">
                      <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06]">
                        #Absolute
                      </span>
                      <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06]">
                        #Dominion
                      </span>
                      <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06]">
                        #Dominate
                      </span>
                    </div>
                  </div>

                  <div className="relative z-10 mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-purple-500/20">
                    <a
                      href="https://twitch.tv/cxldforever"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => triggerHaptic(15)}
                      className="group/btn relative w-full min-h-[46px] py-3 sm:py-3.5 px-4 rounded-xl bg-gradient-to-r from-purple-900/60 via-purple-800/40 to-black hover:from-purple-600 hover:to-purple-800 active:scale-95 touch-manipulation text-white font-mono text-xs sm:text-sm font-bold tracking-wider border border-purple-500/40 hover:border-purple-400 shadow-[0_0_25px_rgba(168,85,247,0.3)] transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden"
                    >
                      <span>WITNESS ↗</span>
                    </a>
                  </div>
                </motion.div>

                {/* -------------------------------------------------------------------
                   CARD 2: COMMS [IGRIS // SHADOW GUILD & COMMS]
                   ------------------------------------------------------------------- */}
                <motion.div
                  id="card-comms-igris"
                  whileHover={{ 
                    y: -4,
                    boxShadow: '0 0 45px -10px rgba(255, 0, 60, 0.35)',
                  }}
                  className="relative rounded-2xl backdrop-blur-xl bg-[#07070a]/85 border border-red-600/20 hover:border-red-600/50 p-5 sm:p-7 transition-all duration-300 shadow-xl shadow-black/70 flex flex-col justify-between group overflow-hidden"
                >
                  {/* Real Igris Shadow Domain Artwork with Gradient Fade Mask */}
                  <img
                    src={igrisImg}
                    alt="Igris"
                    className="absolute right-0 bottom-0 top-0 w-2/3 sm:w-1/2 h-full object-cover object-center pointer-events-none z-0 opacity-25 sm:opacity-40 group-hover:scale-105 group-hover:opacity-60 transition-all duration-700 select-none"
                    style={{
                      maskImage: 'linear-gradient(to left, rgba(0,0,0,0.85) 15%, transparent 95%)',
                      WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,0.85) 15%, transparent 95%)',
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />

                  {/* Corner Accent Markers */}
                  <span className="absolute top-3 left-3 font-mono text-[10px] text-red-500/60 font-bold tracking-widest">+</span>
                  <span className="absolute top-3 right-3 font-mono text-[10px] text-red-500/60 font-bold tracking-widest">+</span>
                  <span className="absolute bottom-3 left-3 font-mono text-[10px] text-red-500/60 font-bold tracking-widest">+</span>
                  <span className="absolute bottom-3 right-3 font-mono text-[10px] text-red-500/60 font-bold tracking-widest">+</span>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3.5 sm:mb-4">
                      <div>
                        <div className="font-mono text-[10px] sm:text-xs text-red-400 font-semibold tracking-wider">
                          // SHADOW CIRCLE
                        </div>
                        <h3 className="text-lg sm:text-2xl font-black text-white tracking-tight">
                          SANCTUARY
                        </h3>
                      </div>
                    </div>

                    <p className="mt-2.5 sm:mt-3 font-mono text-[11px] sm:text-xs text-zinc-300 leading-relaxed italic max-w-md bg-black/40 p-2.5 sm:p-3 rounded-lg border border-white/[0.04]">
                      &ldquo;Only the worthy remain.&rdquo;
                    </p>

                    {/* 2 Big Action Buttons inside Igris card */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mt-3.5 sm:mt-4">
                      {/* Telegram */}
                      <a
                        href="https://t.me/rebuildtoascension"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => triggerHaptic(15)}
                        className="group/btn relative min-h-[46px] p-3 sm:p-3.5 rounded-xl bg-black/60 hover:bg-[#229ED9]/15 active:scale-95 touch-manipulation border border-white/[0.08] hover:border-[#229ED9]/50 hover:shadow-[0_0_20px_rgba(34,158,217,0.25)] transition-all duration-200 flex flex-col justify-between"
                      >
                        <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#229ED9]/20 border border-[#229ED9]/30 flex items-center justify-center text-[#229ED9] group-hover/btn:scale-105 transition-transform">
                            <FaTelegramPlane size={14} />
                          </div>
                          <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover/btn:text-[#229ED9]" />
                        </div>
                        <div>
                          <div className="font-bold text-xs text-zinc-100 group-hover/btn:text-white">
                            TELEGRAM
                          </div>
                          <div className="font-mono text-[10px] text-zinc-400 mt-0.5">
                            Raw thoughts. Zero filter.
                          </div>
                        </div>
                      </a>

                      {/* Discord */}
                      <a
                        href="https://discord.gg/WNdZdNryHv"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => triggerHaptic(15)}
                        className="group/btn relative min-h-[46px] p-3 sm:p-3.5 rounded-xl bg-black/60 hover:bg-[#ff003c]/15 active:scale-95 touch-manipulation border border-white/[0.08] hover:border-[#ff003c]/50 hover:shadow-[0_0_20px_rgba(255,0,60,0.25)] transition-all duration-200 flex flex-col justify-between"
                      >
                        <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#ff003c]/20 border border-[#ff003c]/30 flex items-center justify-center text-[#ff003c] group-hover/btn:scale-105 transition-transform">
                            <FaDiscord size={14} />
                          </div>
                          <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover/btn:text-[#ff003c]" />
                        </div>
                        <div>
                          <div className="font-bold text-xs text-zinc-100 group-hover/btn:text-white">
                            DISCORD
                          </div>
                          <div className="font-mono text-[10px] text-zinc-400 mt-0.5">
                            The 1% sanctuary. Enter.
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>

                  <div className="relative z-10 mt-4 sm:mt-5 pt-3 border-t border-red-500/20 flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-zinc-500">
                    <span>◈ REBUILD TO ASCENSION</span>
                    <span className="text-zinc-600">EST. 2024</span>
                  </div>
                </motion.div>
              </div>
            </motion.section>

            {/* =======================================================================
               SECTION 3: ФИЛОСОФИЯ ВОЗВЫШЕНИЯ (НИЖНИЙ БЛОК)
               ======================================================================= */}
            <motion.section 
              id="section-philosophy"
              initial={{ opacity: 0, y: 50, scale: 0.96, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="w-full pb-8 sm:pb-12"
            >
              <div
                className="relative rounded-2xl backdrop-blur-xl bg-[#07070a]/80 border border-white/[0.08] hover:border-red-500/40 p-5 sm:p-8 transition-all duration-300 shadow-xl shadow-black/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3.5 sm:gap-4 group overflow-hidden"
              >
                {/* Japanese Calligraphy Watermark: 天蓋泰星 (Tengai Shinsei) */}
                <div 
                  className="absolute right-3 sm:right-12 top-1/2 -translate-y-1/2 font-serif text-3xl sm:text-6xl font-black text-red-500/[0.04] group-hover:text-red-500/[0.07] transition-colors duration-500 pointer-events-none select-none tracking-widest leading-none z-0"
                  aria-hidden="true"
                >
                  天蓋泰星
                </div>

                <span className="absolute top-3 left-3 font-mono text-[10px] text-zinc-600 font-bold tracking-widest">+</span>
                <span className="absolute top-3 right-3 font-mono text-[10px] text-zinc-600 font-bold tracking-widest">+</span>
                <span className="absolute bottom-3 left-3 font-mono text-[10px] text-zinc-600 font-bold tracking-widest">+</span>
                <span className="absolute bottom-3 right-3 font-mono text-[10px] text-zinc-600 font-bold tracking-widest">+</span>

                {/* Ascension Philosophy Quote */}
                <div className="relative z-10 max-w-2xl font-mono text-xs sm:text-sm text-zinc-300 leading-relaxed italic">
                  &ldquo;When a man learns to love, he must bear the risk of hatred. Standing alone at the pinnacle.&rdquo;
                </div>

                <div className="relative z-10 font-mono text-xs text-red-400 font-semibold tracking-wider shrink-0 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff003c] animate-ping" />
                  <span>// rebuild to ascension.</span>
                </div>
              </div>
            </motion.section>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}

