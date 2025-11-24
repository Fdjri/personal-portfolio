"use client";
import { motion } from "framer-motion";
import { memo, useMemo } from "react";
import { techIcons } from "./ui/Icons";

// Memoize orbit icon component untuk prevent re-render
const OrbitIcon = memo(function OrbitIcon({ 
  iconData, 
  index, 
  totalIcons 
}: any) {
  const IconComponent = iconData.Component;
  
  // Hitung animation timing
  const duration = 50;
  const orbitOffset = (duration / totalIcons) * index * -1;
  const entranceDelay = (index / totalIcons) * 0.5;
  const entranceDuration = 0.3;
  const orbitStartTime = entranceDelay + orbitOffset;
  const pulseDelay = (index * 0.2) % 4;

  return (
    <motion.g
      key={`orbit-${index}`}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: entranceDelay,
        duration: entranceDuration,
        ease: "easeOut"
      }}
    >
      {/* Orbit dimulai saat icon selesai fade in */}
      <animateMotion
        dur={`${duration}s`}
        repeatCount="indefinite"
        rotate="auto"
        begin={`${orbitStartTime}s`}
      >
        <mpath href="#orbitPath" />
      </animateMotion>

      <foreignObject x="-40" y="-40" width="80" height="80">
        <div className="flex items-center justify-center w-full h-full relative">
          {/* Pulse glow effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: pulseDelay + entranceDelay
            }}
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at center, ${iconData.color} 0%, transparent 60%)`,
            }}
          />

          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at center, ${iconData.color} 0%, transparent 20%)`,
              opacity: 0.6
            }}
          />

          <div className="relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            <IconComponent size={24} color={iconData.color} />
          </div>
        </div>
      </foreignObject>
    </motion.g>
  );
});

const OrbitSystem = memo(function OrbitSystem() {
  const orbitalIcons = useMemo(() => Object.keys(techIcons), []);
  const totalIcons = orbitalIcons.length;

  return (
    <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-visible">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1200 1000"
        className="absolute w-full h-full"
        style={{ overflow: 'visible' }}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="orbit-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
          </linearGradient>

          <path
            id="orbitPath"
            d="M 600 500 m -400 0 a 400 200 0 1 0 800 0 a 400 200 0 1 0 -800 0"
            transform="rotate(-15 600 500)"
          />
        </defs>

        {/* Orbit Line Utama */}
        <motion.path
          d="M 600 500 m -400 0 a 400 200 0 1 0 800 0 a 400 200 0 1 0 -800 0"
          transform="rotate(-15 600 500)"
          fill="none"
          stroke="url(#orbit-gradient)"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />

        {/* Orbit Line Bayangan */}
        <motion.path
          d="M 600 500 m -410 0 a 410 205 0 1 0 820 0 a 410 205 0 1 0 -820 0"
          transform="rotate(-15 600 500)"
          fill="none"
          stroke="#22d3ee"
          strokeWidth="0.5"
          opacity="0.3"
        />

        {/* Render orbit icons */}
        {orbitalIcons.map((key, index) => {
          const iconData = techIcons[key as keyof typeof techIcons];
          return (
            <OrbitIcon
              key={key}
              iconData={iconData}
              index={index}
              totalIcons={totalIcons}
            />
          );
        })}
      </svg>
    </div>
  );
});

export default OrbitSystem;