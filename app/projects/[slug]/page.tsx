"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { allProjects } from "@/lib/projectsData";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { StarBackground, ScrambleText } from "@/components/ui/Animations";
import { Icons } from "@/components/ui/Icons";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function ProjectDetail() {
  const params = useParams();
  const project = allProjects.find((p) => p.id === params.slug);
  
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  // Close modal on Esc key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeZoom();
      }
    };

    if (isZoomOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isZoomOpen]);

  // Navigate with arrow keys
  useEffect(() => {
    const handleArrows = (e: KeyboardEvent) => {
      if (!isZoomOpen || !project || selectedImageIndex === null) return;
      
      if (e.key === 'ArrowLeft') {
        navigatePrev();
      } else if (e.key === 'ArrowRight') {
        navigateNext();
      }
    };

    if (isZoomOpen) {
      window.addEventListener('keydown', handleArrows);
    }

    return () => {
      window.removeEventListener('keydown', handleArrows);
    };
  }, [isZoomOpen, selectedImageIndex]);

  const openZoom = (index: number) => {
    setSelectedImageIndex(index);
    setIsZoomOpen(true);
  };

  const closeZoom = () => {
    setIsZoomOpen(false);
    setTimeout(() => setSelectedImageIndex(null), 300);
  };

  const navigatePrev = () => {
    if (!project || selectedImageIndex === null) return;
    setSelectedImageIndex((prev) => 
      prev === 0 ? project.screenshots.length - 1 : (prev ?? 0) - 1
    );
  };

  const navigateNext = () => {
    if (!project || selectedImageIndex === null) return;
    setSelectedImageIndex((prev) => 
      prev === project.screenshots.length - 1 ? 0 : (prev ?? 0) + 1
    );
  };

  if (!project) {
    return <div className="min-h-screen flex items-center justify-center text-white">Project not found</div>;
  }

  return (
    <div className="min-h-screen bg-[#020205] text-white selection:bg-cyan-500/30 overflow-x-hidden relative">
      <StarBackground />
      <Header />

      <main className="relative z-20 pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto space-y-16">
          
          {/* 1. BREADCRUMB & HEADER */}
          <div className="text-center space-y-4">
            <div className="flex justify-center gap-2 text-sm text-slate-500 mb-4 font-mono">
               <Link href="/projects" className="hover:text-blue-400 transition-colors">
                 <ScrambleText text="Projects" />
               </Link> 
               <span>/</span> 
               <span className="capitalize text-blue-400">
                 <ScrambleText text={`${project.category} Projects`} />
               </span>
               <span>/</span>
               <span className="text-white">
                 <ScrambleText text={project.title} />
               </span>
            </div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl font-bold"
            >
              <ScrambleText text={project.title} delay={100} /> 
              <span className="text-slate-500 mx-2">-</span> 
              <span className="text-slate-300 block md:inline mt-2 md:mt-0 text-xl md:text-3xl">
                <ScrambleText text={project.subtitle} delay={300} />
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 max-w-2xl mx-auto italic"
            >
              "<ScrambleText text={project.description} delay={500} />"
            </motion.p>
          </div>

          {/* 2. HERO IMAGE */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0a0e17] group"
          >
             <div className="absolute inset-0 bg-gradient-to-t from-[#020205] via-transparent to-transparent opacity-60 z-10" />
             <img 
               src={project.image} 
               alt={project.title} 
               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
             />
          </motion.div>

          {/* 3. TOP SECTION: OVERVIEW & TECH STACK */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
             
             {/* LEFT: OVERVIEW ONLY (lg:col-span-2) */}
             <div className="lg:col-span-2">
                <section className="space-y-4">
                   <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                      <div className="w-1 h-8 bg-blue-600 rounded-full" />
                      <ScrambleText text="Project Overview" />
                   </h2>
                   <p className="text-slate-300 leading-relaxed text-justify">
                      {project.overview}
                   </p>
                </section>
             </div>

             {/* RIGHT: TECH STACK CARD + BUTTONS */}
             <div className="lg:col-span-1 space-y-6">
                
                {/* Tech Stack Card */}
                <div className="p-6 bg-[#0a0e17] border border-white/10 rounded-2xl space-y-6 shadow-2xl">
                   <div>
                      <h3 className="text-lg font-bold text-white mb-4">
                        <ScrambleText text="Technology Stack" />
                      </h3>
                      <div className="flex flex-wrap gap-2">
                         {project.techStack.map((tech, i) => (
                           <span 
                             key={i}
                             className="
                               relative overflow-hidden
                               px-3 py-1 text-xs font-mono text-blue-100 
                               border border-blue-400/30 rounded-full
                               shadow-[0_0_10px_rgba(59,130,246,0.2)]
                               group/tag cursor-default
                             "
                           >
                             <div className="absolute inset-0 bg-[radial-gradient(70%_70%_at_50%_50%,rgba(59,130,246,0.4)_0%,transparent_100%)] group-hover/tag:bg-[radial-gradient(70%_70%_at_50%_50%,rgba(59,130,246,0.6)_0%,transparent_100%)] transition-all duration-500" />
                             <div className="absolute inset-0 bg-[radial-gradient(40%_40%_at_50%_50%,rgba(96,165,250,0.8)_0%,transparent_100%)] animate-pulse opacity-80 group-hover/tag:opacity-100" />
                             
                             <span className="relative z-10 drop-shadow-md">
                               <ScrambleText text={tech} delay={200 + (i * 50)} />
                             </span>
                           </span>
                         ))}
                      </div>
                   </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  {project.links.demo && (
                    <a href={project.links.demo} target="_blank" rel="noreferrer" className="col-span-1 group">
                      <button className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-all flex justify-center items-center gap-2 shadow-lg active:scale-95 text-sm">
                        <Icons.ExternalLink size={16} className="group-hover:scale-110 transition-transform" />
                        <ScrambleText text="Live Demo" />
                      </button>
                    </a>
                  )}
                  {project.links.prototype && (
                    <a href={project.links.prototype} target="_blank" rel="noreferrer" className="col-span-1 group">
                      <button className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-medium transition-all flex justify-center items-center gap-2 shadow-lg active:scale-95 text-sm">
                        <Icons.Layers size={16} className="group-hover:scale-110 transition-transform" />
                        <ScrambleText text="Prototype" />
                      </button>
                    </a>
                  )}
                  {project.links.code && (
                    <a href={project.links.code} target="_blank" rel="noreferrer" className="col-span-1 group">
                      <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg font-medium transition-all flex justify-center items-center gap-2 active:scale-95 text-sm">
                        <Icons.Code size={16} className="group-hover:scale-110 transition-transform" />
                        <ScrambleText text="Source Code" />
                      </button>
                    </a>
                  )}
               </div>

             </div>
          </div>

          {/* 4. BOTTOM SECTION: KEY FEATURES (Spaced out for readability) */}
          <section className="space-y-8">
             <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <div className="w-1 h-8 bg-blue-600 rounded-full" />
                <ScrambleText text="Key Features" />
             </h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12"> 
                {project.keyFeatures.map((feature, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-4 group min-h-[4rem]" 
                  >
                     <div className="relative shrink-0 mt-1">
                        <div className="absolute -inset-1 bg-yellow-500/40 blur-md rounded-full animate-pulse" />
                        <div className="absolute inset-0 bg-yellow-400/50 blur-[2px] rounded-full" />
                        <Icons.Star 
                          className="text-[#FACC15] relative z-10 drop-shadow-[0_0_8px_rgba(250,204,21,1)]" 
                          size={24} 
                          color="#FACC15"
                        />
                     </div>

                     {/* TEKS FITUR */}
                     <p className="text-slate-300 leading-relaxed group-hover:text-white transition-colors text-base">
                       <ScrambleText text={feature} delay={500 + (idx * 100)} />
                     </p>
                  </motion.div>
                ))}
             </div>
          </section>

          {/* 5. VISUAL SHOWCASE */}
          <section className="space-y-8 pt-8 border-t border-white/5">
             <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-2">
                  <ScrambleText text="Visual Showcase" />
                </h2>
                <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full" />
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.screenshots.map((shot, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => openZoom(idx)}
                    className="relative aspect-video rounded-xl overflow-hidden border border-white/10 group cursor-pointer shadow-lg hover:shadow-blue-900/20 transition-all"
                  >
                     <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10" />
                     <img 
                       src={shot} 
                       alt={`Screenshot ${idx + 1}`} 
                       className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                     />
                     <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                        <div className="p-3 bg-black/50 backdrop-blur-sm rounded-full text-white border border-white/20">
                           <Icons.Eye size={24} />
                        </div>
                     </div>
                  </motion.div>
                ))}
             </div>
          </section>

        </div>
      </main>
      
      <Footer />

      {/* ZOOM MODAL */}
      <AnimatePresence>
        {isZoomOpen && selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center"
            onClick={closeZoom}
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.1 }}
              onClick={closeZoom}
              className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white border border-white/20 transition-all z-50 group"
            >
              <Icons.X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
            </motion.button>

            {/* Image Counter */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.15 }}
              className="absolute top-6 left-6 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white border border-white/20 text-sm font-mono z-50"
            >
              {selectedImageIndex + 1} / {project.screenshots.length}
            </motion.div>

            {/* Navigation Buttons (only if more than 1 image) */}
            {project.screenshots.length > 1 && (
              <>
                {/* Previous Button */}
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: 0.2 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigatePrev();
                  }}
                  className="absolute left-6 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white border border-white/20 transition-all z-50 group"
                >
                  <Icons.ChevronLeft size={28} className="group-hover:-translate-x-1 transition-transform duration-300" />
                </motion.button>

                {/* Next Button */}
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: 0.2 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateNext();
                  }}
                  className="absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white border border-white/20 transition-all z-50 group"
                >
                  <Icons.ChevronRight size={28} className="group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>
              </>
            )}

            {/* Image Container */}
            <motion.div
              key={selectedImageIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-[90vw] max-h-[85vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={project.screenshots[selectedImageIndex]}
                alt={`Screenshot ${selectedImageIndex + 1}`}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              />
            </motion.div>

            {/* Hint Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full text-white/70 border border-white/20 text-sm font-mono z-50 flex items-center gap-4"
            >
              {project.screenshots.length > 1 && (
                <>
                  <span className="flex items-center gap-2">
                    <Icons.ChevronLeft size={16} />
                    <Icons.ChevronRight size={16} />
                    <span>Navigate</span>
                  </span>
                  <span className="w-px h-4 bg-white/20" />
                </>
              )}
              <span className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-white/10 rounded text-xs">ESC</span>
                <span>Close</span>
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}