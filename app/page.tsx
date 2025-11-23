"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link'; 
import { Icons } from '@/components/ui/Icons';
import { ScrambleText, TypewriterCycler, StarBackground, SmokeParticles } from '@/components/ui/Animations';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import OrbitSystem from '@/components/OrbitSystem';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  
  // COUNTDOWN & INTRO STATE
  const [countdownText, setCountdownText] = useState("Initiate engine to explore in...");
  const [ignitionState, setIgnitionState] = useState<"none" | "normal" | "heavy">("none"); 
  const [approaching, setApproaching] = useState(false); 
  const [pushFlight, setPushFlight] = useState(false);
  const [showFinalTitle, setShowFinalTitle] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timers: NodeJS.Timeout[] = [];

    // Timeline Intro
    setIgnitionState("normal");
    timers.push(setTimeout(() => setCountdownText("3"), 1500));
    timers.push(setTimeout(() => setCountdownText("2"), 2500));
    timers.push(setTimeout(() => setCountdownText("1"), 3500));
    timers.push(setTimeout(() => {
      setCountdownText("Ready to Deploy!");
      setIgnitionState("heavy");
    }, 4500));
    
    // Roket naik ke tengah
    timers.push(setTimeout(() => {
      setShowFinalTitle(true);
      setApproaching(true); 
    }, 6500));
    
    // PHASE LAUNCH: Roket menembus layar
    timers.push(setTimeout(() => {
       setPushFlight(true); 
    }, 8500)); 

    // Selesai Intro
    timers.push(setTimeout(() => {
      setShowWelcome(false);
    }, 10000));

    return () => timers.forEach(clearTimeout);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#020205] text-white selection:bg-cyan-500/30 overflow-x-hidden relative">
      
      {!showWelcome && <Header />}

      <AnimatePresence>
        {showWelcome ? (
          // --- INTRO ROCKET LAUNCH ---
          <motion.div 
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#020205] overflow-hidden"
            exit={{ opacity: 0, transition: { duration: 1 } }}
          >
            {/* Wrapper Flight */}
            <motion.div
              className="relative flex flex-col items-center justify-center w-full h-full"
              initial={{ y: 0, scale: 1, filter: "blur(0px)" }}
              animate={pushFlight ? { scale: 50, y: 1000, opacity: 0, filter: "blur(20px)" } : { y: 0, scale: 1, opacity: 1, filter: "blur(0px)" }} 
              transition={{ duration: 1.2, ease: "easeInOut" }} 
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
                      className={`text-3xl md:text-5xl font-bold text-center whitespace-nowrap ${
                        countdownText === "Ready to Deploy!" ? "text-red-500 animate-pulse" : "text-cyan-400"
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
                transition={{ duration: 0.8, ease: "easeInOut" }}
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
                        <h1 className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 drop-shadow-lg px-6 py-2 bg-black/30 backdrop-blur-sm rounded-full border border-white/10">
                          Let's Explore The Universe 🚀
                        </h1>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </motion.div>
            </motion.div>
          </motion.div>
        ) : (
          // --- MAIN LANDING CONTENT (ORBIT) ---
          <>
            <StarBackground />
            <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
            
            <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-20 perspective-[1000px]">
              
              <OrbitSystem />

              <div className="text-center space-y-8 max-w-4xl relative z-20 pointer-events-none">
                
                <div className="min-h-[120px] flex flex-col items-center justify-center pointer-events-auto">
                  <h1 className="text-4xl md:text-8xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 mb-2 drop-shadow-2xl">
                    <ScrambleText text="Sholihul Fadjri" delay={500} />
                  </h1>
                  <h1 className="text-4xl md:text-8xl font-bold tracking-tight text-slate-600">
                    <ScrambleText text="Triwibowo" delay={1000} className="text-slate-600" />
                  </h1>
                </div>

                <div className="flex items-center justify-center gap-2 text-cyan-400 text-lg md:text-2xl h-8 pointer-events-auto">
                   <TypewriterCycler 
                      words={[
                        "Brawijaya University Student", 
                        "Information Technology Student", 
                        "Junior Apps Developer", 
                        "Tech Enthusiast"
                      ]} 
                   />
                </div>

                <p className="text-slate-400 text-sm md:text-base max-w-lg mx-auto leading-relaxed min-h-[60px] pointer-events-auto">
                  <ScrambleText 
                    text="Building responsive and intuitive applications from the ground up. Turning cosmic ideas into digital realities." 
                    delay={2000} 
                  />
                </p>

                <motion.div 
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.5, duration: 0.8 }}
                   className="flex flex-col md:flex-row items-center justify-center gap-4 pt-8 pointer-events-auto"
                >
                  <Link href="/about" className="group relative px-8 py-3 bg-white text-black font-bold rounded-lg overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center justify-center">
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-300 to-blue-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative flex items-center gap-2">
                      Explore My Universe
                    </span>
                  </Link>

                  <Link href="/contact" className="px-8 py-3 border border-slate-700 bg-black/50 text-white rounded-lg hover:bg-slate-900 hover:border-slate-500 transition-all flex items-center gap-2 group backdrop-blur-sm">
                    Get In Touch
                    <Icons.ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </div>
            </main>
            
            <Footer />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}