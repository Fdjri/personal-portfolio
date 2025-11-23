"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';

// ============================================================================
// 1. EXTREME SCRAMBLE TEXT (Smart Logic: Entrance + Interactive)
// ============================================================================

const InteractiveChar = ({ char, delay }: { char: string, delay: number }) => {
  const [displayText, setDisplayText] = useState(char);
  const [isScrambling, setIsScrambling] = useState(false);
  // State buat nandain apakah fase entrance udah selesai apa belum
  const [hasEntranced, setHasEntranced] = useState(false); 
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10px" });
  const chars = '!<>-_\\/[]{}—=+*^?#________'; 

  // Fungsi Core Scramble
  const runScramble = useCallback(() => {
    if (char === ' ' || isScrambling) return;
    
    setIsScrambling(true);
    let iteration = 0;
    const maxIterations = 10; // Durasi ngacak
    
    const interval = setInterval(() => {
      setDisplayText(chars[Math.floor(Math.random() * chars.length)]);
      iteration++;
      
      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(char); 
        setIsScrambling(false);
      }
    }, 30); 
  }, [char, isScrambling]);

  // 1. ENTRANCE EFFECT (Jalan sekali pas masuk viewport)
  useEffect(() => {
    if (isInView && !hasEntranced) {
        const timer = setTimeout(() => {
            runScramble();
            setHasEntranced(true); // Tandai udah entrance
        }, delay);
        return () => clearTimeout(timer);
    }
  }, [isInView, delay, hasEntranced, runScramble]);

  // 2. INTERACTIVE HOVER (Cuma jalan kalo udah selesai entrance)
  const handleMouseEnter = () => {
    if (hasEntranced) {
        runScramble();
    }
  };

  return (
    <span 
      ref={ref}
      onMouseEnter={handleMouseEnter}
      className="inline-block transition-all duration-75 cursor-default hover:text-cyan-400 hover:scale-110 hover:font-bold" 
      style={{ whiteSpace: 'pre' }} 
    >
      {displayText}
    </span>
  );
}

// Wrapper Component (Tetep sama)
export const ScrambleText = ({ text, className = "", delay = 0 }: { text: string, className?: string, delay?: number }) => {
  return (
    <span className={className}>
      {text.split('').map((char, i) => (
        <InteractiveChar key={i} char={char} delay={delay + (i * 30)} /> 
      ))}
    </span>
  );
};


// ============================================================================
// 2. TYPEWRITER CYCLER (Tetap sama)
// ============================================================================
export const TypewriterCycler = ({ words, period = 2000 }: { words: string[], period?: number }) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    let ticker = setTimeout(() => {
      let i = loopNum % words.length;
      let fullText = words[i];
      let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);
      setText(updatedText);
      if (isDeleting) setTypingSpeed(prev => prev / 2);
      if (!isDeleting && updatedText === fullText) {
        setIsDeleting(true);
        setTypingSpeed(period);
      } else if (isDeleting && updatedText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(150);
      }
    }, typingSpeed);
    return () => clearTimeout(ticker);
  }, [text, isDeleting, loopNum, words, period, typingSpeed]);

  return <span className="border-r-2 border-cyan-400 animate-pulse pr-1">{text}</span>;
};


// ============================================================================
// 3. BACKGROUND EFFECTS (Tetap sama)
// ============================================================================
export const StarBackground = () => {
  const [stars, setStars] = useState<{ top: string; left: string; size: number; opacity: number }[]>([]);
  useEffect(() => {
    setStars(Array.from({ length: 50 }).map(() => ({
      top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1, opacity: Math.random()
    })));
  }, []);
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]" style={{ backgroundSize: '50px 50px' }} />
      {stars.map((star, i) => (
        <motion.div key={i} className="absolute bg-white rounded-full"
          style={{ top: star.top, left: star.left, width: star.size, height: star.size, opacity: star.opacity }}
          animate={{ opacity: [star.opacity, 1, star.opacity] }} transition={{ duration: Math.random() * 3 + 2, repeat: Infinity }}
        />
      ))}
    </div>
  );
};

export const SmokeParticles = ({ intensity = "normal" }: { intensity?: "normal" | "heavy" }) => {
  const count = intensity === "heavy" ? 60 : 20;
  const particles = Array.from({ length: count }).map((_, i) => ({
    id: i, x: Math.random() * 60 - 30, scale: Math.random() * 1 + 0.5,
    color: intensity === "heavy" ? (i % 2 === 0 ? "bg-orange-500" : "bg-red-500") : (i % 2 === 0 ? "bg-slate-500" : "bg-gray-400"),
  }));
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 flex justify-center items-start">
      {particles.map((p) => (
        <motion.div key={p.id} initial={{ opacity: 0, scale: 0, y: 0, x: 0 }}
          animate={{ opacity: [0, 0.8, 0], scale: intensity === "heavy" ? [0.5, p.scale + 3, p.scale + 5] : [0.2, p.scale + 1, p.scale + 2], y: intensity === "heavy" ? [0, 200 + Math.random() * 200] : [0, 50 + Math.random() * 50], x: [0, p.x * (intensity === "heavy" ? 3 : 1)] }}
          transition={{ duration: intensity === "heavy" ? 0.5 + Math.random() * 0.5 : 1.5, repeat: Infinity, delay: Math.random() * 0.2, ease: "easeOut" }}
          className={`absolute w-6 h-6 rounded-full blur-xl ${p.color} mix-blend-screen opacity-80`}
        />
      ))}
      <motion.div animate={{ height: intensity === "heavy" ? [100, 300, 150] : [20, 40, 20], opacity: [0.8, 1, 0.8] }} transition={{ duration: 0.1, repeat: Infinity }} className={`absolute top-0 w-6 bg-gradient-to-t from-transparent ${intensity === "heavy" ? "via-yellow-300 to-white" : "via-blue-300 to-cyan-100"} blur-md rounded-full`} />
    </div>
  );
};