"use client";

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import RocketIntro from '@/components/RocketIntro';
import MainLanding from '@/components/MainLanding';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    setMounted(true);
    
    // Cek apakah user sudah pernah melihat intro di session ini
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
    
    if (hasSeenIntro === 'true') {
      // Langsung tampilkan main landing tanpa intro
      setShowIntro(false);
    }
  }, []);

  const handleRocketComplete = () => {
    // Simpan ke sessionStorage bahwa user sudah melihat intro
    sessionStorage.setItem('hasSeenIntro', 'true');
    setShowIntro(false);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#020205] text-white selection:bg-cyan-500/30 overflow-x-hidden relative">
      <AnimatePresence mode="wait">
        {showIntro ? (
          <RocketIntro key="rocket" onRocketComplete={handleRocketComplete} />
        ) : (
          <MainLanding key="landing" />
        )}
      </AnimatePresence>
    </div>
  );
}