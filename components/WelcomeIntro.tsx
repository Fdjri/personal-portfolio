"use client";

import React, { memo, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WelcomeIntroProps {
  isVisible: boolean;
  onComplete: () => void;
}

const WelcomeIntro = memo(function WelcomeIntro({ isVisible, onComplete }: WelcomeIntroProps) {
  const [shouldExit, setShouldExit] = useState(false);

  useEffect(() => {
    if (isVisible) {
      // Display welcome text for 2 seconds, then start fade away
      const displayTimer = setTimeout(() => {
        setShouldExit(true);
      }, 2000);

      // After fade away (0.5s), call onComplete
      const exitTimer = setTimeout(() => {
        onComplete();
      }, 2500);

      return () => {
        clearTimeout(displayTimer);
        clearTimeout(exitTimer);
      };
    }
  }, [isVisible, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && !shouldExit && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="text-5xl md:text-6xl font-bold text-cyan-400 text-center"
          >
            Welcome To My World
          </motion.h1>
        </motion.div>
      )}
      {isVisible && shouldExit && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
        />
      )}
    </AnimatePresence>
  );
});

export default WelcomeIntro;
