"use client";

import React, { memo, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WelcomeIntroProps {
  isVisible: boolean;
  onComplete: () => void;
}

const WelcomeIntro = memo(function WelcomeIntro({ isVisible, onComplete }: WelcomeIntroProps) {
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    if (isVisible) {
      const textTimer = setTimeout(() => {
        setShowText(false);
      }, 2000);

      const completeTimer = setTimeout(() => {
        onComplete();
      }, 2500);

      return () => {
        clearTimeout(textTimer);
        clearTimeout(completeTimer);
      };
    }
  }, [isVisible, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm will-change-[opacity]"
        >
          <AnimatePresence>
            {showText && (
              <motion.h1
                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 text-center will-change-[opacity,transform]"
              >
                Welcome To My World
              </motion.h1>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default WelcomeIntro;
