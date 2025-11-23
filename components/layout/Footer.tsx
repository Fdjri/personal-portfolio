"use client";
import React from "react";
import { Icons } from "../ui/Icons";

export default function Footer() {
  return (
    <footer className="relative z-10 py-8 border-t border-white/5 bg-[#020205] text-center">
      <div className="flex justify-center gap-6 mb-4 text-slate-400">
        <a href="#" className="hover:text-cyan-400 transition-colors"><Icons.Github /></a>
        <a href="#" className="hover:text-pink-500 transition-colors"><Icons.Instagram /></a>
      </div>
      <p className="text-slate-600 text-sm">
        © {new Date().getFullYear()} Fadjri. Crafted with Next.js & Framer Motion.
      </p>
    </footer>
  );
}