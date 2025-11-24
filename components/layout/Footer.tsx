"use client";
import React, { memo } from "react";
import { Icons } from "../ui/Icons";
import { ScrambleText } from "../ui/Animations";

const Footer = memo(function Footer() {
  return (
    <footer className="relative z-10 py-6 sm:py-8 px-4 sm:px-6 border-t border-white/5 bg-[#020205]">
      <div className="max-w-7xl mx-auto flex flex-col gap-4 sm:gap-6">
        {/* Social Links */}
        <div className="flex justify-center gap-6 text-slate-400">
          <a 
            href="https://github.com/Fdjri" 
            className="hover:text-cyan-400 transition-colors p-2 hover:scale-110 active:scale-95"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icons.Github size={24} />
          </a>
          <a 
            href="https://www.instagram.com/fdjritw/" 
            className="hover:text-pink-500 transition-colors p-2 hover:scale-110 active:scale-95"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icons.Instagram size={24} />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center border-t border-white/5 pt-4 sm:pt-6">
          {/* PC: ScrambleText | Mobile: Plain Text */}
          <div className="hidden sm:block">
            <ScrambleText
              text={`© ${new Date().getFullYear()} Fadjri. Crafted with Next.js & Framer Motion.`}
              className="text-slate-600 text-sm"
              delay={100}
            />
          </div>
          <p className="sm:hidden text-slate-600 text-xs">
            © {new Date().getFullYear()} Fadjri. Crafted with Next.js & Framer Motion.
          </p>
        </div>
      </div>
    </footer>
  );
});

export default Footer;