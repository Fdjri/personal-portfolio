"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icons } from '@/components/ui/Icons';
import { SmokeParticles } from '@/components/ui/Animations';

interface RocketIntroProps {
  onComplete: () => void;
}

export default function RocketIntro({ onComplete }: RocketIntroProps) {
  const [countdownText, setCountdownText] = useState("PREPARING FOR LAUNCH...");
  const [ignitionState, setIgnitionState] = useState<"none" | "normal" | "heavy">("none"); 
  const [approaching, setApproaching] = useState(false); 
  const [pushFlight, setPushFlight] = useState(false);
  const [showFinalTitle, setShowFinalTitle] = useState(false);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    // Timeline Intro - Space Launch Sequence
    setIgnitionState("normal");
    timers.push(setTimeout(() => setCountdownText("SYSTEMS CHECK COMPLETE"), 1200));
    timers.push(setTimeout(() => setCountdownText("LAUNCH SEQUENCE INITIATED"), 2400));
    timers.push(setTimeout(() => setCountdownText("3"), 3600));
    timers.push(setTimeout(() => setCountdownText("2"), 4200));
    timers.push(setTimeout(() => setCountdownText("1"), 4800));
    timers.push(setTimeout(() => {
      setCountdownText("IGNITION!");
      setIgnitionState("heavy");
    }, 5400));
    
    // Liftoff - Roket naik ke tengah
    timers.push(setTimeout(() => {
      setCountdownText("WE HAVE LIFTOFF!");
      setShowFinalTitle(true);
      setApproaching(true); 
    }, 6200));
    
    // PHASE LAUNCH: Roket menembus layar
    timers.push(setTimeout(() => {
       setPushFlight(true); 
    }, 8000)); 

    // Selesai Intro
    timers.push(setTimeout(() => {
      onComplete();
    }, 9500));

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#020205] overflow-hidden"
      exit={{ opacity: 0, transition: { duration: 1 } }}
    >
      {/* Wrapper Flight */}
      <motion.div
        className="relative flex flex-col items-center justify-center w-full h-full"
        initial={{ y: 0, scale: 1, filter: "blur(0px)" }}
        animate={pushFlight ? { scale: 50, y: -1500, opacity: 0, filter: "blur(20px)" } : { y: 0, scale: 1, opacity: 1, filter: "blur(0px)" }} 
        transition={{ duration: 1, ease: "easeIn" }}
      >
        
        {/* 1. COUNTDOWN AREA */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
           <AnimatePresence mode="wait">
            {!showFinalTitle && (
              <motion.h1 
                key={countdownText}
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.5, position: "absolute" }} 
                className={`text-2xl md:text-5xl font-bold text-center whitespace-nowrap tracking-wider ${
                  countdownText === "IGNITION!" ? "text-red-500 animate-pulse" 
                  : countdownText === "WE HAVE LIFTOFF!" ? "text-green-400 animate-pulse"
                  : countdownText === "3" || countdownText === "2" || countdownText === "1" ? "text-white text-6xl md:text-8xl"
                  : "text-cyan-400"
                }`}
              >
                {countdownText}
              </motion.h1>
            )}
          </AnimatePresence>
        </div>

        {/* 2. ROCKET + TEXT CONTAINER */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 z-30 flex flex-col items-center"
          initial={{ bottom: "5%" }} 
          animate={approaching ? { bottom: "50%", transform: "translate(-50%, 50%)" } : { bottom: "5%" }} 
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* A. Roket */}
          <div className="relative mb-6"> 
            <motion.div
              animate={
                pushFlight ? { x: 0, y: 0 } 
                : ignitionState === "normal" ? { x: [-1, 1, -1] }
                : ignitionState === "heavy" ? { x: [-2, 2, -2], y: [0, 2, 0] }
                : {}
              }
              transition={{ duration: 0.1, repeat: Infinity }}
            >
              <Icons.Rocket size={120} className="text-white drop-shadow-[0_0_35px_rgba(0,150,255,0.8)] rotate-[-45deg] relative z-20" />
            </motion.div>
            
            {/* Asep Roket */}
            {ignitionState !== "none" && (
              <div className="absolute top-20 left-1/2 -translate-x-1/2 z-10">
                 <SmokeParticles intensity={ignitionState} />
              </div>
            )}
          </div>

          {/* B. Teks Judul */}
          <div className="h-[60px] flex items-center justify-center overflow-visible"> 
            <AnimatePresence>
              {showFinalTitle && (
                <motion.div
                  initial={{ opacity: 0, y: -20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center whitespace-nowrap"
                >
                  <h1 className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 drop-shadow-lg px-6 py-2 bg-black/30 backdrop-blur-sm rounded-full border border-white/10 tracking-wide">
                    JOURNEY TO THE STARS 🚀
                  </h1>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </motion.div>
      </motion.div>
    </motion.div>
  );
}

