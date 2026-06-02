"use client";

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import WelcomeIntro from '@/components/WelcomeIntro';
import MainLanding from '@/components/MainLanding';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [introState, setIntroState] = useState<'welcome' | 'main'>('welcome');

  useEffect(() => {
    setMounted(true);

    // Cek apakah user sudah pernah melihat intro di session ini
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');

    if (hasSeenIntro === 'true') {
      // Langsung tampilkan main landing tanpa intro
      setIntroState('main');
    }
  }, []);

  const handleWelcomeComplete = () => {
    sessionStorage.setItem('hasSeenIntro', 'true');
    setIntroState('main');
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#020205] text-white selection:bg-cyan-500/30 overflow-x-hidden relative">
      <AnimatePresence mode="wait">

        {introState === 'welcome' && (
          <WelcomeIntro
            key="welcome"
            isVisible={true}
            onComplete={handleWelcomeComplete}
          />
        )}

        {introState === 'main' && (
          <MainLanding key="landing" />
        )}
      </AnimatePresence>
    </div>
  );
}