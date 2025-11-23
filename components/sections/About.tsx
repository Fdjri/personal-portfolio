"use client";
import React from "react";
import { motion } from "framer-motion";
import { Icons } from "../ui/Icons";
import { ScrambleText } from "../ui/Animations"; 

export default function About() {
  return (
    <section id="about" className="relative z-20 py-24 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto relative">
        
        {/* Background Glow Spot */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[400px] h-[400px] bg-red-900/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center mb-16">
          
          {/* 1. LEFT: PROFILE IMAGE */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:col-span-4 flex justify-center md:justify-start relative"
          >
            <div className="absolute inset-0 bg-red-600/20 rounded-full blur-3xl transform scale-110 animate-pulse group-hover:bg-red-600/50 transition-colors duration-500" />
            
            <div className="relative w-64 h-64 md:w-full md:h-auto aspect-square rounded-full overflow-hidden border-2 border-red-500/30 shadow-[0_0_50px_rgba(220,20,60,0.3)] group cursor-pointer transition-all duration-500 hover:scale-105 hover:border-red-500/60">
               <img 
                 src="/images/me.jpg"  
                 alt="Profile"
                 className="w-full h-full object-cover relative z-10 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
               />
               {/* Red Radar Scan */}
               <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-0 left-0 w-full h-[5px] bg-red-500/80 shadow-[0_0_20px_rgba(255,0,0,1)] animate-scan" />
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,0,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-30" />
               </div>
               <div className="absolute inset-0 rounded-full shadow-[inset_0_0_30px_rgba(0,0,0,0.8)] z-20 pointer-events-none" />
            </div>
          </motion.div>

          {/* 2. RIGHT: TEXT CONTENT */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-8 space-y-6 text-center md:text-left"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white flex items-center justify-center md:justify-start gap-3">
              <ScrambleText text="Hello Folks!" delay={200} /> 
              <span className="animate-wave origin-[70%_70%] inline-block">👋</span>
            </h2>
            
            <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
              <p>
                I am <span className="text-white font-semibold"><ScrambleText text="Sholihul Fadjri Triwibowo" delay={500} /></span>, a Junior Apps Developer & an IT Student based in Indonesia.
              </p>
              <p>
                My curiosity for the Web served as the <span className="text-cyan-400">launchpad</span>, propelling me to explore the constellations of <span className="text-white">Mobile Apps</span> and the visual nebula of <span className="text-white">UI/UX Design</span>.
              </p>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition-all flex items-center gap-2 shadow-[0_4px_20px_rgba(37,99,235,0.3)] active:scale-95">
                <Icons.Download size={18} />
                <ScrambleText text="Download CV" delay={800} />
              </button>
              <button className="px-6 py-3 bg-transparent border border-white/20 hover:bg-white/5 text-white rounded-lg font-semibold transition-all flex items-center gap-2 active:scale-95">
                <Icons.Eye size={18} />
                <ScrambleText text="View Projects" delay={1000} />
              </button>
            </div>
          </motion.div>
        </div>

        {/* 3. STATS CARDS (With Blue Scan Effect) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Card 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="p-8 bg-[#050914] border border-[#1e293b] rounded-2xl relative overflow-hidden group hover:border-blue-500/50 transition-colors"
          >
             {/* Blue Scan Overlay */}
             <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-blue-400/50 shadow-[0_0_15px_rgba(59,130,246,0.8)] animate-scan" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
             </div>

             <div className="absolute top-4 right-4 text-blue-500/10 group-hover:text-blue-500/20 transition-colors transform scale-150">
                <Icons.Rocket size={60} />
             </div>
             <h3 className="text-5xl font-bold text-white mb-2 relative z-10">
                <ScrambleText text="15" delay={600} />
             </h3>
             <p className="text-blue-200/60 font-medium text-sm tracking-wider uppercase relative z-10">
                <ScrambleText text="Projects Completed" delay={800} />
             </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.5 }}
             className="p-8 bg-[#050914] border border-[#1e293b] rounded-2xl relative overflow-hidden group hover:border-blue-500/50 transition-colors"
          >
             {/* Blue Scan Overlay */}
             <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-blue-400/50 shadow-[0_0_15px_rgba(59,130,246,0.8)] animate-scan" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
             </div>

             <div className="absolute top-4 right-4 text-blue-500/10 group-hover:text-blue-500/20 transition-colors transform scale-150">
                <Icons.Award size={60} />
             </div>
             <h3 className="text-5xl font-bold text-white mb-2 relative z-10">
                <ScrambleText text="5" delay={700} />
             </h3>
             <p className="text-blue-200/60 font-medium text-sm tracking-wider uppercase relative z-10">
                <ScrambleText text="Certificates" delay={900} />
             </p>
          </motion.div>
        </div>

        {/* 4. CERTIFICATIONS & LEARNING (Updated Design) */}
        <div className="space-y-6">
           <motion.h3 
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="text-2xl font-bold text-white mb-6"
           >
             <ScrambleText text="Certifications & Learning" delay={400} />
           </motion.h3>
           
           <p className="text-slate-400 text-sm mb-4 -mt-4">
             My commitment to continuous growth and learning.
           </p>

           {/* CONTAINER UTAMA (Box Gelap Besar) */}
           <div className="border border-[#1e293b] rounded-2xl bg-[#050914] overflow-hidden">
              {[
                "Mobile app development for beginners with Flutter framework",
                "Learn ethical hacking and cybersecurity specialist basics",
                "Student level cybersecurity certification",
                "Azure AI fundamentals",
                "Microsoft office desktop applications"
              ].map((cert, idx, arr) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * idx }}
                  // Class 'group' penting buat trigger hover per baris
                  className={`
                    p-6 flex items-start gap-4 relative group cursor-default transition-colors hover:bg-[#0f172a]
                    ${idx !== arr.length - 1 ? 'border-b border-[#1e293b]' : ''} 
                  `}
                >
                   {/* Scan Line Per Item (Horizontal) */}
                   <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-blue-500 group-hover:w-full transition-all duration-700 ease-out" />
                   <div className="absolute left-0 top-0 h-full w-[2px] bg-blue-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />

                   {/* Icon Box (Blue Outline Bookmark) */}
                   <div className="mt-1 text-blue-500 shrink-0 group-hover:text-blue-400 group-hover:scale-110 transition-all duration-300">
                      <Icons.Bookmark size={20} />
                   </div>
                   
                   {/* Text */}
                   <span className="text-slate-300 font-mono text-sm md:text-base group-hover:text-white transition-colors">
                     <ScrambleText text={cert} delay={500 + (idx * 100)} />
                   </span>
                </motion.div>
              ))}
           </div>
        </div>

      </div>
      
      <style jsx>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }

        @keyframes wave {
          0% { transform: rotate(0.0deg) }
          10% { transform: rotate(14.0deg) }
          20% { transform: rotate(-8.0deg) }
          30% { transform: rotate(14.0deg) }
          40% { transform: rotate(-4.0deg) }
          50% { transform: rotate(10.0deg) }
          60% { transform: rotate(0.0deg) }
          100% { transform: rotate(0.0deg) }
        }
        .animate-wave {
          animation-name: wave;
          animation-duration: 2.5s;
          animation-iteration-count: infinite;
          transform-origin: 70% 70%;
          display: inline-block;
        }
      `}</style>
    </section>
  );
}