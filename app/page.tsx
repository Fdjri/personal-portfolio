"use client";

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import RocketIntro from '@/components/RocketIntro';
import WelcomeIntro from '@/components/WelcomeIntro';
import MainLanding from '@/components/MainLanding';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);

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
    setShowWelcome(true);
  };

  const handleWelcomeComplete = () => {
    // Simpan ke sessionStorage bahwa user sudah melihat intro
    sessionStorage.setItem('hasSeenIntro', 'true');
    setShowIntro(false);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#020205] text-white selection:bg-cyan-500/30 overflow-x-hidden relative">
      <AnimatePresence mode="wait">
        {showIntro ? (
          <>
            <RocketIntro key="rocket" onRocketComplete={handleRocketComplete} />
            <WelcomeIntro key="welcome" isVisible={showWelcome} onComplete={handleWelcomeComplete} />
          </>
        ) : (
          <MainLanding key="landing" />
        )}
      </AnimatePresence>
    </div>
  );
}