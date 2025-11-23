"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Icons } from '@/components/ui/Icons';
import { ScrambleText, TypewriterCycler, StarBackground } from '@/components/ui/Animations';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import OrbitSystem from '@/components/OrbitSystem';

export default function MainLanding() {
  return (
    <>
      <Header />
      
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
  );
}

