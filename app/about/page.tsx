"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AboutSection from "@/components/sections/About"; 
import { StarBackground } from "@/components/ui/Animations";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#020205] text-white selection:bg-cyan-500/30 overflow-x-hidden relative">
      
      {/* 1. Background Bintang (Tetep dipasang di level page biar full screen) */}
      <StarBackground />
      
      {/* 2. Header Navigasi */}
      <Header />

      {/* 3. Main Content Wrapper */}
      <main className="relative z-20 pt-20">
        
        {/* PANGGIL KOMPONEN ABOUT */}
        <AboutSection />
        
      </main>
      
      {/* 4. Footer */}
      <Footer />
    </div>
  );
}