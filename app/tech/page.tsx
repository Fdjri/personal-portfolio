"use client";

import React from "react";
import { motion } from "framer-motion";
import { Icons, techIcons } from "@/components/ui/Icons";
import { ScrambleText, StarBackground } from "@/components/ui/Animations";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Ambil semua key tech stack untuk looping
const techKeys = Object.keys(techIcons) as Array<keyof typeof techIcons>;

// Component untuk satu tombol Tech Key
const TechKey = ({ iconKey }: { iconKey: keyof typeof techIcons }) => {
  const iconData = techIcons[iconKey];
  const IconComponent = iconData.Component;
  const techName = iconKey.toUpperCase();

  // Color dynamic variable
  const baseColor = iconData.color; 
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, rotateX: 90 }}
      animate={{ opacity: 1, scale: 1, rotateX: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 150 }}
      className="relative w-full aspect-square perspective-1000"
    >
      <div 
        className="
          absolute inset-0 rounded-xl cursor-pointer 
          transition-all duration-300 transform preserve-3d
          bg-[#1E1E1E] border border-white/10
          shadow-md
          group
        "
        style={{
          boxShadow: `0 0 10px ${baseColor}20, 0 4px 15px rgba(0,0,0,0.4)`
        }}
        // Hover/Focus effect
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = `translateY(-5px) rotateX(5deg) scale(1.05)`;
          e.currentTarget.style.boxShadow = `0 0 20px ${baseColor}80, 0 8px 20px rgba(0,0,0,0.6)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = `translateY(0px) rotateX(0deg) scale(1)`;
          e.currentTarget.style.boxShadow = `0 0 10px ${baseColor}20, 0 4px 15px rgba(0,0,0,0.4)`;
        }}
      >
        {/* Top Surface (Icon and Name) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-2 backface-hidden">
          <IconComponent size={36} color={baseColor} />
          <span className="text-xs text-white mt-1 font-mono opacity-80 group-hover:opacity-100 transition-opacity">
            {techName.length > 5 ? techName.substring(0, 5) : techName}
          </span>
        </div>

        {/* Shine/Glow Effect on Hover (Top Surface) */}
        <div 
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${baseColor}30 0%, transparent 80%)`,
            mixBlendMode: 'screen'
          }}
        />

        {/* Side/Depth Effect (Optional: For more realistic 3D look, but complex with CSS only) */}
        {/* Placeholder for the side depth */}
        <div 
          className="absolute inset-0 rounded-xl transform translateZ(-20px) border-b-4 border-[#0F0F0F] transition-colors" 
          style={{ borderColor: `${baseColor}20` }}
        />
      </div>
    </motion.div>
  );
};

export default function TechStackPage() {
  return (
    <div className="min-h-screen bg-[#020205] text-white selection:bg-cyan-500/30 overflow-x-hidden relative">
      <StarBackground />
      <Header />

      <main className="relative z-20 pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* HEADER SECTION */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              <ScrambleText text="Tech Stack" delay={200} />
            </h1>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base">
              <ScrambleText text="A collection of the languages, frameworks, and tools I use to build my projects." delay={500} />
            </p>
          </div>
          
          {/* 3D KEYBOARD/GRID SECTION */}
          <motion.section 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-col items-center pt-12"
          >
            {/* ILLUSTRASI TEKS / DESKRIPSI UTAMA */}
            <div className="max-w-4xl text-left mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                <ScrambleText text="My Command Console" delay={1200} />
              </h2>
              <p className="text-slate-300">
                <ScrambleText text="Every great project starts with the right tools. From powerful backend frameworks to intuitive design systems, this is the console I use to pilot every application I launch into the digital cosmos." delay={1400} />
              </p>
            </div>
            
            {/* KEYBOARD GRID CONTAINER */}
            <div 
              className="grid gap-4 p-8 bg-[#0a0e17] rounded-3xl border border-white/10 shadow-2xl"
              style={{
                gridTemplateColumns: `repeat(auto-fit, minmax(80px, 1fr))`,
                maxWidth: '600px'
              }}
            >
              {techKeys.map((key, index) => (
                <motion.div 
                  key={key}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5 + index * 0.05, type: "spring", stiffness: 200 }}
                >
                  <TechKey iconKey={key} />
                </motion.div>
              ))}
            </div>
            
          </motion.section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}