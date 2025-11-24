"use client";
import React, { useState, memo, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "../ui/Icons";
import { ScrambleText } from "../ui/Animations";
import { allProjects } from "@/lib/projectsData";
import Link from "next/link";

const TabItem = memo(function TabItem({ 
  tab, 
  isActive, 
  onClick 
}: { 
  tab: { id: string; label: string }; 
  isActive: boolean; 
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
        ${isActive ? "text-white" : "text-slate-400 hover:text-white"}
      `}
    >
      {isActive && (
        <motion.div
          layoutId="activeTab"
          className="absolute inset-0 bg-blue-600 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.5)]"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
      <span className="relative z-10">{tab.label}</span>
    </button>
  );
});

const ProjectCard = memo(function ProjectCard({ 
  project, 
  index 
}: { 
  project: any; 
  index: number;
}) {
  return (
    <div
      className={`flex flex-col md:flex-row gap-12 items-center ${
        index % 2 === 1 ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* IMAGE SIDE */}
      <div className="w-full md:w-3/5 group relative">
        <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <Link href={`/projects/${project.id}`}>
          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0a0e17] shadow-2xl aspect-video cursor-pointer">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
          </div>
        </Link>
      </div>

      {/* CONTENT SIDE */}
      <div className="w-full md:w-2/5 space-y-6">
        <h3 className="text-3xl font-bold text-white flex items-center gap-3">
          <ScrambleText text={project.title} delay={100} />
          <div className="h-[2px] flex-grow bg-gradient-to-r from-blue-500/50 to-transparent rounded-full" />
        </h3>

        <p className="text-slate-400 leading-relaxed">
          {project.description}
        </p>

        {/* TAGS */}
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tag: string, i: number) => (
            <span
              key={i}
              className="
                relative overflow-hidden
                px-3 py-1 text-xs font-mono text-blue-100 
                border border-blue-400/30 rounded-full
                shadow-[0_0_15px_rgba(59,130,246,0.2)]
                group/tag cursor-default
              "
            >
              <div className="absolute inset-0 bg-[radial-gradient(70%_70%_at_50%_50%,rgba(59,130,246,0.4)_0%,transparent_100%)] group-hover/tag:bg-[radial-gradient(70%_70%_at_50%_50%,rgba(59,130,246,0.6)_0%,transparent_100%)] transition-all duration-500" />
              <div className="absolute inset-0 bg-[radial-gradient(40%_40%_at_50%_50%,rgba(96,165,250,0.8)_0%,transparent_100%)] animate-pulse opacity-80 group-hover/tag:opacity-100" />
              <span className="relative z-10 drop-shadow-md">
                <ScrambleText text={tag} delay={200 + (i * 50)} />
              </span>
            </span>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="flex flex-wrap gap-3 pt-2">
          <Link href={`/projects/${project.id}`}>
            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-all flex items-center gap-2 shadow-lg shadow-blue-900/20 active:scale-95 group">
              <Icons.Eye size={18} className="group-hover:scale-110 transition-transform" />
              <ScrambleText text="Detail" />
            </button>
          </Link>

          {project.links.prototype && (
            <a href={project.links.prototype} target="_blank" rel="noreferrer">
              <button className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-medium transition-all flex items-center gap-2 shadow-lg shadow-purple-900/20 active:scale-95 group">
                <Icons.Layers size={18} className="group-hover:scale-110 transition-transform" />
                <ScrambleText text="Prototype" />
              </button>
            </a>
          )}

          {project.links.code && (
            <a href={project.links.code} target="_blank" rel="noreferrer">
              <button className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg font-medium transition-all flex items-center gap-2 active:scale-95 group">
                <Icons.Code size={18} className="group-hover:scale-110 transition-transform" />
                <ScrambleText text="Source Code" />
              </button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
});

const Projects = memo(function Projects() {
  const [activeTab, setActiveTab] = useState<"web" | "mobile" | "uiux">("web");

  const filteredProjects = useMemo(
    () => allProjects.filter(p => p.category === activeTab),
    [activeTab]
  );

  const tabs = useMemo(() => [
    { id: "web", label: "PC/Web Projects" },
    { id: "mobile", label: "Mobile Projects" },
    { id: "uiux", label: "UI/UX Prototypes" },
  ], []);

  return (
    <section className="relative z-20 py-24 px-6 overflow-hidden min-h-screen">
      <div className="max-w-7xl mx-auto relative">

        {/* HEADER SECTION */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
            <ScrambleText text="Portfolio Showcase" delay={200} />
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base">
            Explore my journey through the projects I've built. Each section represents a milestone in my continuous learning path.
          </p>
        </div>

        {/* TABS NAVIGATION */}
        <div className="flex justify-center mb-16">
          <div className="flex items-center p-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
            {tabs.map((tab) => (
              <TabItem
                key={tab.id}
                tab={tab}
                isActive={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id as any)}
              />
            ))}
          </div>
        </div>

        {/* PROJECTS GRID */}
        <div className="space-y-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-24"
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
});

export default Projects;