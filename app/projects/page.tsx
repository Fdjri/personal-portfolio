"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProjectsSection from "@/components/sections/Projects"; 
import { StarBackground } from "@/components/ui/Animations";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-[#020205] text-white selection:bg-cyan-500/30 overflow-x-hidden relative">
      
      <StarBackground />
      
      {/* Decoration Blobs */}
      <div className="fixed top-[20%] left-[-10%] w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />

      <Header />

      <main className="relative z-20 pt-20">
        <ProjectsSection />
      </main>
      
      <Footer />
    </div>
  );
}