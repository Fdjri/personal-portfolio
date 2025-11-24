"use client";

import React, { memo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WelcomeIntroProps {
  isVisible: boolean;
  onComplete: () => void;
}

const WelcomeIntro = memo(function WelcomeIntro({ isVisible, onComplete }: WelcomeIntroProps) {
  useEffect(() => {
    if (isVisible) {
      // Total duration: fade in (0.3s) + display (2s) + fade out (0.5s)
      const timer = setTimeout(() => {
        onComplete();
      }, 2800);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
              duration: 0.3,
              ease: "easeOut"
            }}
            className="text-5xl md:text-6xl font-bold text-cyan-400 text-center"
          >
            Welcome To My World
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default WelcomeIntro;
