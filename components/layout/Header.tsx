"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icons } from "../ui/Icons";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Tech Stack", href: "/tech" },
    { name: "Contacts", href: "/contact" },
  ];

  const glassStyle = "backdrop-blur-md bg-[#030014]/30 border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:border-white/30 transition-all duration-300";

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 pt-6 px-6 pointer-events-none" 
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto"> 
        
        {/* 1. LEFT: LOGO PILL */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Link 
            href="/" 
            className={`${glassStyle} px-6 py-3 rounded-full flex items-center gap-2 group active:scale-95 relative ${
              pathname === "/" ? "border-cyan-500/30" : ""
            }`}
          >
            {pathname === "/" && (
              <motion.span
                layoutId="activePageLogo"
                className="absolute inset-0 z-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className={`font-bold text-base transition-colors relative z-10 ${
              pathname === "/" 
                ? "text-cyan-400" 
                : "text-slate-400 group-hover:text-cyan-400"
            }`}>
              &lt; / Fadjri &gt;
            </span>
          </Link>
        </motion.div>

        {/* 2. CENTER: NAV LINKS PILL */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className={`${glassStyle} hidden md:flex items-center gap-1 px-2 py-2 rounded-full`}
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            
            return (
              <Link
                key={link.name}
                href={link.href}
                onMouseEnter={() => setActiveTab(link.name)}
                onMouseLeave={() => setActiveTab("")}
                className={`relative px-6 py-2 text-sm font-medium transition-colors rounded-full ${
                  isActive 
                    ? "text-cyan-400" 
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {/* Active page background */}
                {isActive && (
                  <motion.span
                    layoutId="activePage"
                    className="absolute inset-0 z-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full border border-cyan-500/30"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                
                {/* Hover background */}
                {activeTab === link.name && !isActive && (
                  <motion.span
                    layoutId="bubble"
                    className="absolute inset-0 z-0 bg-white/10 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                
                <span className="relative z-10">{link.name}</span>
              </Link>
            );
          })}
        </motion.nav>

        {/* 3. RIGHT: SOCIAL BUTTONS */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="flex items-center gap-4"
        >
           <a
            href="https://github.com/Fdjri"
            target="_blank"
            rel="noopener noreferrer"
            className={`${glassStyle} p-3 rounded-full text-slate-400 hover:text-white hover:bg-white/10 hover:scale-110 active:scale-95`}
          >
            <Icons.Github size={20} />
          </a>
          <a
            href="https://www.instagram.com/fdjritw/" 
            target="_blank"
            rel="noopener noreferrer"
            className={`${glassStyle} p-3 rounded-full text-slate-400 hover:text-white hover:bg-white/10 hover:scale-110 active:scale-95`}
          >
            <Icons.Instagram size={20} />
          </a>
        </motion.div>

      </div>
    </motion.header>
  );
}