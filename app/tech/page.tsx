"use client";

import React, { useState, useCallback, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { techIcons, TechStackItem, Icons } from "@/components/ui/Icons";
import { ScrambleText, StarBackground } from "@/components/ui/Animations";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Ambil semua key tech stack untuk looping
const techKeys = Object.keys(techIcons) as Array<keyof typeof techIcons>;

// State untuk melacak tombol mana yang sedang di-hover/diklik
type ActiveTech = {
  key: string; 
  name: string;
  description: string;
  color: string;
  index: number;
} | null;


// ============================================================================
// Component untuk satu tombol Tech Key 3D
// ============================================================================

interface TechKeyProps {
  iconKey: keyof typeof techIcons;
  index: number;
  setActiveTech: (tech: ActiveTech) => void;
  isActive: boolean;
  onTap: () => void;
}

const TechKey = React.memo(({ iconKey, index, setActiveTech, isActive, onTap }: TechKeyProps) => {
  const iconData = techIcons[iconKey] as TechStackItem;
  const IconComponent = iconData.Component;
  const baseColor = iconData.color;

  const handleMouseEnter = useCallback(() => {
    // Only work on desktop when no key is locked (not tapped)
    if (!('ontouchstart' in window) && !isActive) {
      setActiveTech({
        key: iconKey as string, 
        name: iconData.name,
        description: iconData.description,
        color: baseColor,
        index: index,
      });
    }
  }, [iconKey, iconData.name, iconData.description, baseColor, index, setActiveTech, isActive]);

  const handleMouseLeave = useCallback(() => {
    // Only work on desktop when no key is locked (not tapped)
    if (!('ontouchstart' in window) && !isActive) {
      setActiveTech(null);
    }
  }, [setActiveTech, isActive]);

  const handleClick = useCallback(() => {
    // Lock the selection when clicked (mobile & desktop)
    onTap();
  }, [onTap]);

  // Perhitungan visual 3D
  const [isPressed, setIsPressed] = useState(false);
  
  // Gaya untuk BADAN/KEDALAMAN tombol 3D - Enhanced depth
  const depth = 12; // Kedalaman tombol dalam piksel
  
  const keyDepthStyle: React.CSSProperties = {
    backgroundColor: '#000000', 
    boxShadow: `
      0 ${depth}px 0 -1px #0a0a0a,
      0 ${depth + 2}px 0 -2px #050505,
      0 ${depth + 4}px 20px rgba(0,0,0,0.9), 
      0 0 10px ${baseColor}10,
      inset 0 -2px 4px rgba(0,0,0,0.8)
    `,
    transform: isPressed 
      ? `translateY(${depth - 2}px)` 
      : `translateY(0px)`, 
    transition: 'transform 0.12s ease-out, box-shadow 0.12s ease-out',
    border: `1px solid rgba(0,0,0,0.8)`, 
  };
  
  // Gaya untuk PERMUKAAN ATAS tombol 3D - More realistic
  const keyTopStyle: React.CSSProperties = {
    background: `linear-gradient(145deg, 
      ${baseColor}08 0%, 
      #1a1f2e 15%, 
      #0f1419 50%, 
      #0a0e17 85%,
      #050810 100%
    )`,
    boxShadow: isPressed
      ? `
        inset 0 3px 8px rgba(0,0,0,0.7), 
        inset 0 1px 2px rgba(0,0,0,0.9),
        0 0 15px ${baseColor}40
      `
      : `
        0 -1px 0 rgba(255,255,255,0.15),
        0 1px 2px rgba(255,255,255,0.05),
        inset 0 1px 1px rgba(255,255,255,0.15),
        inset 0 -1px 3px rgba(0,0,0,0.4),
        0 ${depth}px 0 rgba(0,0,0,0.3),
        0 ${depth + 2}px 8px rgba(0,0,0,0.4),
        0 2px 6px ${baseColor}15,
        0 0 0 1px rgba(255,255,255,0.05)
      `,
    transform: isPressed 
      ? `translateY(${depth - 2}px)` 
      : `translateY(0px)`, 
    transition: 'transform 0.12s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.15s ease-out',
    position: 'absolute',
    inset: 0,
    borderRadius: '0.5rem',
    border: `1px solid rgba(255,255,255,0.1)`,
    borderTop: `1px solid rgba(255,255,255,0.2)`,
    borderBottom: `1px solid rgba(0,0,0,0.5)`,
  };

  const glowStyle: React.CSSProperties = {
    background: `radial-gradient(circle at 50% 30%, ${baseColor}70 0%, ${baseColor}30 40%, transparent 70%)`,
    mixBlendMode: 'screen',
    opacity: 0.6,
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.04, duration: 0.6, type: "spring", stiffness: 160, damping: 14 }}
      className="relative w-full aspect-square" 
    >
      
      {/* 1. KEYCAP BODY (Badan 3D di belakang) */}
      <motion.div 
        className="rounded-lg w-full h-full absolute inset-0 pointer-events-none"
        style={{ 
          ...keyDepthStyle,
        }}
        aria-hidden="true" 
      />

      {/* 2. KEYCAP TOP SURFACE (Permukaan atas) */}
      <motion.div 
        className={`rounded-lg cursor-pointer group relative z-10 ${isActive ? 'ring-2 ring-offset-2 ring-offset-[#0a0e17]' : ''}`}
        style={{
          ...keyTopStyle,
          ...(isActive && {
            boxShadow: `
              inset 0 2px 4px rgba(0,0,0,0.5),
              0 0 20px ${baseColor}60,
              0 0 40px ${baseColor}40
            `,
            ringColor: baseColor,
          })
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onTouchStart={() => setIsPressed(true)}
        onTouchEnd={() => setIsPressed(false)}
      >
        {/* Konten Ikon Only */}
        <div className="absolute inset-0 flex items-center justify-center p-3 z-10 pointer-events-none">
          <div className="relative w-9 h-9 md:w-11 md:h-11 flex items-center justify-center">
            <IconComponent 
              size="100%" 
              color={baseColor} 
              className={`w-full h-full transition-all duration-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}
              style={{
                filter: isActive 
                  ? `drop-shadow(0 0 12px ${baseColor}80)` 
                  : `drop-shadow(0 0 8px ${baseColor}40)`,
              }}
            />
          </div>
        </div>

        {/* Top highlight shine */}
        <div 
          className="absolute top-0 left-1/4 right-1/4 h-[30%] rounded-t-lg pointer-events-none z-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.12), transparent)',
          }}
        />

        {/* Glow Effect on Hover */}
        <div 
          className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
          style={glowStyle}
        />
        
        {/* Border / Outline Glow on Hover */}
        <div 
          className="absolute inset-0 rounded-lg border-2 border-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-0"
          style={{ 
            borderColor: `${baseColor}70`, 
            boxShadow: `
              inset 0 0 20px ${baseColor}40,
              0 0 30px ${baseColor}50,
              0 0 60px ${baseColor}30
            `,
          }}
        />
      </motion.div>
    </motion.div>
  );
});
TechKey.displayName = 'TechKey';


// ============================================================================
// Main Page Component
// ============================================================================

export default function TechStackPage() {
  const [activeTech, setActiveTech] = useState<ActiveTech>(null);
  const [activeKeyMobile, setActiveKeyMobile] = useState<string | null>(null);
  const [tapCounts, setTapCounts] = useState<{ [key: string]: number }>({});
  const [showTaurus, setShowTaurus] = useState(false);
  const [tapTimers, setTapTimers] = useState<{ [key: string]: NodeJS.Timeout }>({});
  
  // Memoize total tech count
  const totalTechCount = useMemo(() => techKeys.length, []);
  
  // Ambil data untuk display awal jika tidak ada hover
  const defaultTech: ActiveTech = useMemo(() => ({
    key: "default",
    name: "BEHIND THE STARSHIP ENGINE",
    description: `Ever wondered what it takes to build a digital system that runs at warp speed? This is the hardware. Our stack is a collection of tried-and-true tools and next-gen components, all working in harmony like a well-oiled space station. Take a peek under the hood to see the fuel (tech) that drives our innovation.`,
    color: "#FFFFFF", // White
    index: -1,
  }), [totalTechCount]);

  // Handler untuk tap pada key (mobile & desktop click)
  const handleKeyTap = useCallback((key: string) => {
    // Always set the tapped key as active (no toggle)
    setActiveKeyMobile(key);
    const iconData = techIcons[key as keyof typeof techIcons] as TechStackItem;
    const index = techKeys.indexOf(key as keyof typeof techIcons);
    setActiveTech({
      key: key,
      name: iconData.name,
      description: iconData.description,
      color: iconData.color,
      index: index,
    });

    // Track tap count for easter egg with timer
    setTapCounts(prev => {
      const currentCount = (prev[key] || 0) + 1;
      const newCounts = { ...prev, [key]: currentCount };
      
      // Clear existing timer for this key
      setTapTimers(prevTimers => {
        if (prevTimers[key]) {
          clearTimeout(prevTimers[key]);
        }
        
        // Check if reached 4 taps
        if (currentCount === 4) {
          // Trigger Taurus constellation animation
          setShowTaurus(true);
          
          // Hide after 5 seconds
          setTimeout(() => {
            setShowTaurus(false);
          }, 5000);
          
          // Reset tap count for this key
          newCounts[key] = 0;
          
          // Remove timer for this key
          const newTimers = { ...prevTimers };
          delete newTimers[key];
          return newTimers;
        } else {
          // Set new timer to reset count after 5 seconds of inactivity
          const newTimer = setTimeout(() => {
            setTapCounts(counts => {
              const updatedCounts = { ...counts };
              updatedCounts[key] = 0;
              return updatedCounts;
            });
            setTapTimers(timers => {
              const updatedTimers = { ...timers };
              delete updatedTimers[key];
              return updatedTimers;
            });
          }, 5000);
          
          return { ...prevTimers, [key]: newTimer };
        }
      });
      
      return newCounts;
    });
  }, []);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      Object.values(tapTimers).forEach(timer => {
        if (timer) clearTimeout(timer);
      });
    };
  }, [tapTimers]);

  // Taurus constellation stars positions (simplified)
  const taurusStars = [
    // Aldebaran (brightest star - eye of the bull)
    { x: 50, y: 50, size: 6, delay: 0 },
    // Pleiades cluster (7 sisters)
    { x: 30, y: 30, size: 3, delay: 0.1 },
    { x: 32, y: 28, size: 3, delay: 0.15 },
    { x: 28, y: 32, size: 2, delay: 0.2 },
    { x: 34, y: 30, size: 2, delay: 0.25 },
    { x: 30, y: 34, size: 2, delay: 0.3 },
    { x: 26, y: 30, size: 2, delay: 0.35 },
    { x: 32, y: 32, size: 2, delay: 0.4 },
    // Horn tips
    { x: 40, y: 35, size: 4, delay: 0.45 },
    { x: 60, y: 35, size: 4, delay: 0.5 },
    // Body
    { x: 45, y: 45, size: 3, delay: 0.55 },
    { x: 55, y: 45, size: 3, delay: 0.6 },
    { x: 50, y: 55, size: 3, delay: 0.65 },
    { x: 48, y: 60, size: 3, delay: 0.7 },
    { x: 52, y: 60, size: 3, delay: 0.75 },
    // Additional stars
    { x: 38, y: 48, size: 2, delay: 0.8 },
    { x: 62, y: 48, size: 2, delay: 0.85 },
    { x: 50, y: 40, size: 3, delay: 0.9 },
  ];

  // Constellation lines (connecting stars)
  const taurusLines = [
    { x1: 30, y1: 30, x2: 40, y2: 35 }, // Pleiades to horn
    { x1: 40, y1: 35, x2: 50, y2: 40 }, // Horn to head
    { x1: 50, y1: 40, x2: 60, y2: 35 }, // Head to other horn
    { x1: 50, y1: 40, x2: 50, y2: 50 }, // Head to eye (Aldebaran)
    { x1: 50, y1: 50, x2: 45, y2: 45 }, // Eye to body
    { x1: 50, y1: 50, x2: 55, y2: 45 }, // Eye to body
    { x1: 45, y1: 45, x2: 50, y2: 55 }, // Body center
    { x1: 55, y1: 45, x2: 50, y2: 55 }, // Body center
    { x1: 50, y1: 55, x2: 48, y2: 60 }, // Body to legs
    { x1: 50, y1: 55, x2: 52, y2: 60 }, // Body to legs
  ];

  return (
    <div className="min-h-screen bg-[#020205] text-white selection:bg-cyan-500/30 overflow-x-hidden relative">
      <StarBackground />
      <Header />

      {/* Taurus Constellation Easter Egg */}
      <AnimatePresence>
        {showTaurus && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
            style={{
              background: 'radial-gradient(circle at center, rgba(255,107,53,0.2) 0%, transparent 70%)',
            }}
          >
            {/* Constellation Container */}
            <div className="relative w-[600px] h-[600px] max-w-[90vw] max-h-[90vh]">
              
              {/* Glow effect behind constellation */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  background: 'radial-gradient(circle at center, rgba(255,107,53,0.3) 0%, transparent 60%)',
                  filter: 'blur(40px)',
                }}
              />

              {/* Constellation lines */}
              <svg className="absolute inset-0 w-full h-full">
                {taurusLines.map((line, index) => (
                  <motion.line
                    key={index}
                    x1={`${line.x1}%`}
                    y1={`${line.y1}%`}
                    x2={`${line.x2}%`}
                    y2={`${line.y2}%`}
                    stroke="rgba(255,107,53,0.6)"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      pathLength: { duration: 1.5, delay: 0.5 },
                      opacity: { duration: 0.5, delay: 0.5 },
                    }}
                  />
                ))}
              </svg>

              {/* Stars */}
              {taurusStars.map((star, index) => (
                <motion.div
                  key={index}
                  className="absolute rounded-full bg-white"
                  style={{
                    left: `${star.x}%`,
                    top: `${star.y}%`,
                    width: `${star.size * 4}px`,
                    height: `${star.size * 4}px`,
                    transform: 'translate(-50%, -50%)',
                    boxShadow: `
                      0 0 ${star.size * 4}px rgba(255,107,53,0.8),
                      0 0 ${star.size * 8}px rgba(255,107,53,0.4),
                      0 0 ${star.size * 12}px rgba(255,107,53,0.2)
                    `,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1.5, 1],
                    opacity: [0, 1, 1],
                  }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: star.delay,
                    ease: "easeOut",
                  }}
                >
                  {/* Twinkle effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-white"
                    animate={{
                      opacity: [0.5, 1, 0.5],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: star.delay,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
              ))}

              {/* Taurus Label */}
              <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 1.5, duration: 0.5 }}
              >
                <h2 className="text-4xl md:text-6xl font-black text-center" 
                  style={{
                    color: '#FF6B35',
                    textShadow: `
                      0 0 20px rgba(255,107,53,0.8),
                      0 0 40px rgba(255,107,53,0.4),
                      0 4px 8px rgba(0,0,0,0.5)
                    `,
                  }}
                >
                  ♉ TAURUS
                </h2>
                <p className="text-center text-slate-300 text-sm md:text-base mt-2">
                  The Celestial Bull
                </p>
              </motion.div>

              {/* Particle effects */}
              <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-orange-400 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0],
                      y: [0, -50, -100],
                    }}
                    transition={{
                      duration: 2,
                      delay: Math.random() * 2,
                      repeat: 2,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-20 pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          
          {/* HEADER SECTION */}
          <div className="text-center space-y-4 mb-20 px-4">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight break-words"
            >
              <ScrambleText text="Tech Stack" delay={200} />
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-slate-400 max-w-3xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed break-words px-4"
            >
              <ScrambleText 
                text="A Collection of the languages, frameworks, and tools I use to build my projects." 
                delay={500} 
              />
            </motion.p>
          </div>
          
          {/* MAIN CONTENT SECTION - Two Column Layout */}
          <motion.section 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.3fr] gap-8 lg:gap-10 xl:gap-12 items-start lg:items-center min-h-[600px]"
          >
            
            {/* LEFT SIDE - 3D Keyboard */}
            <div className="order-1 lg:order-1 flex justify-center lg:justify-start pt-8 pb-16">
              <div 
                className="relative"
                style={{
                  perspective: '1500px',
                  perspectiveOrigin: '50% 50%',
                }}
              >
                {/* Floating glow ring around keyboard */}
                <motion.div
                  className="absolute inset-0 -z-20 pointer-events-none"
                  animate={{
                    opacity: [0.3, 0.5, 0.3],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatType: "reverse",
                  }}
                  style={{
                    background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.2) 0%, transparent 60%)',
                    filter: 'blur(60px)',
                  }}
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    y: [0, -15, 0],
                    rotateX: [25, 23, 25],
                    rotateY: [5, 6, 5],
                  }}
                  transition={{ 
                    opacity: { delay: 1, duration: 1 },
                    scale: { delay: 1, duration: 1, type: "spring", stiffness: 100 },
                    y: { 
                      delay: 2,
                      duration: 6, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      repeatType: "reverse"
                    },
                    rotateX: { 
                      delay: 2,
                      duration: 6, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      repeatType: "reverse"
                    },
                    rotateY: { 
                      delay: 2,
                      duration: 6, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      repeatType: "reverse"
                    },
                  }}
                  className="relative"
                >
                  {/* Keyboard Container with enhanced 3D */}
                  <div
                    className="
                      p-5 md:p-7 
                      bg-gradient-to-br from-[#0d1117] via-[#0a0e17] to-[#000000]
                      rounded-2xl
                      w-[340px] sm:w-[420px] md:w-[500px] lg:w-[540px]
                    "
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(5, 1fr)', 
                      gridTemplateRows: 'repeat(4, 1fr)',
                      gap: '10px',
                      transformStyle: 'flat',
                      boxShadow: `
                        0 50px 100px rgba(0,0,0,0.9),
                        0 20px 40px rgba(0,0,0,0.7),
                        0 0 0 2px rgba(255,255,255,0.03),
                        inset 0 1px 2px rgba(255,255,255,0.05),
                        inset 0 -2px 8px rgba(0,0,0,0.5)
                      `,
                      border: '1px solid rgba(255,255,255,0.05)',
                    }}
                  >
                    {techKeys.slice(0, 20).map((key, index) => (
                      <TechKey 
                        key={key}
                        iconKey={key}
                        index={index}
                        setActiveTech={setActiveTech}
                        isActive={activeKeyMobile === key}
                        onTap={() => handleKeyTap(key as string)}
                      />
                    ))}
                  </div>

                  {/* Animated shadow underneath */}
                  <motion.div 
                    className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[120%] h-32 -z-10 pointer-events-none"
                    animate={{
                      scaleX: [1, 1.1, 1],
                      opacity: [0.6, 0.4, 0.6],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                      repeatType: "reverse",
                    }}
                    style={{
                      background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 40%, transparent 70%)',
                      filter: 'blur(40px)',
                    }}
                  />
                  
                  {/* Animated ambient light reflection */}
                  <motion.div 
                    className="absolute inset-0 -z-10 pointer-events-none"
                    animate={{
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      repeatType: "reverse",
                    }}
                    style={{
                      background: 'radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.15) 0%, transparent 50%)',
                      transform: 'translateY(-30px)',
                      filter: 'blur(20px)',
                    }}
                  />
                  
                  {/* Floating particles effect */}
                  <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
                    {[
                      { left: 15, top: 20, delay: 0, x: 5 },
                      { left: 75, top: 15, delay: 0.5, x: -8 },
                      { left: 30, top: 65, delay: 1, x: 10 },
                      { left: 85, top: 70, delay: 1.5, x: -5 },
                      { left: 50, top: 40, delay: 0.3, x: 7 },
                      { left: 10, top: 80, delay: 0.8, x: -10 },
                      { left: 65, top: 30, delay: 1.2, x: 8 },
                      { left: 40, top: 85, delay: 0.6, x: -6 },
                    ].map((particle, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        style={{
                          left: `${particle.left}%`,
                          top: `${particle.top}%`,
                          opacity: 0.2,
                        }}
                        animate={{
                          y: [0, -30, 0],
                          x: [0, particle.x, 0],
                          opacity: [0.2, 0.6, 0.2],
                          scale: [1, 1.5, 1],
                        }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                          delay: particle.delay,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
            
            {/* RIGHT SIDE - Text Content */}
            <div className="space-y-6 order-2 lg:order-2 px-4 lg:px-0 w-full">
              <div key={activeTech?.key || 'default'} className="w-full pr-0 lg:pr-4">
                <h2 
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-6 leading-tight"
                  style={{
                    color: activeTech?.color || defaultTech.color,
                    textShadow: `
                      0 0 30px ${activeTech?.color || defaultTech.color}40,
                      0 0 60px ${activeTech?.color || defaultTech.color}20,
                      0 4px 8px rgba(0,0,0,0.5)
                    `,
                    filter: `drop-shadow(0 0 20px ${activeTech?.color || defaultTech.color}30)`,
                  }}
                >
                  <ScrambleText 
                    text={activeTech ? activeTech.name : defaultTech.name} 
                    delay={0}
                  />
                </h2>
                <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed">
                  <ScrambleText 
                    text={activeTech ? activeTech.description : defaultTech.description}
                    delay={100}
                  />
                </p>
              </div>

              {/* Easter Egg Hint - Desktop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.6 }}
                className="pt-4 hidden lg:block space-y-2"
              >
                <p className="text-slate-600 text-xs italic">
                  <span className="inline-block mr-2">🌟</span>
                  Psst... Try clicking the same key 4 times to unlock a celestial secret
                </p>
              </motion.div>

              {/* Easter Egg Hint - Mobile */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.6 }}
                className="pt-4 lg:hidden space-y-2"
              >
                <p className="text-slate-500 text-sm">
                  <span className="inline-block mr-2">👆</span>
                  Tap a key to see details about each technology
                </p>
                <p className="text-slate-600 text-xs italic">
                  <span className="inline-block mr-2">🌟</span>
                  Secret: Tap any key 4 times to summon the stars
                </p>
              </motion.div>
            </div>
            
          </motion.section>

        </div>
      </main>
      
      <Footer />
    </div>
  );
}