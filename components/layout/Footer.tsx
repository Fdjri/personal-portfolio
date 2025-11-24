"use client";
import React, { memo } from "react";
import { Icons } from "../ui/Icons";

const Footer = memo(function Footer() {
  return (
    <footer className="relative z-10 py-8 border-t border-white/5 bg-[#020205] text-center">
      <div className="flex justify-center gap-6 mb-4 text-slate-400">
        <a 
          href="https://github.com/Fdjri" 
          className="hover:text-cyan-400 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icons.Github />
        </a>
        <a 
          href="https://www.instagram.com/fdjritw/" 
          className="hover:text-pink-500 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icons.Instagram />
        </a>
      </div>
      <p className="text-slate-600 text-sm">
        © {new Date().getFullYear()} Fadjri. Crafted with Next.js & Framer Motion.
      </p>
    </footer>
  );
});

export default Footer;