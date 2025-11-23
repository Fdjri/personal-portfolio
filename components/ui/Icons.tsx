import React from "react";
import { 
  LuGithub, 
  LuInstagram, 
  LuArrowRight, 
  LuRocket,
  LuDownload,
  LuEye,
  LuAward,
  LuQuote,
  LuBookmark,
  LuCode,       
  LuExternalLink, 
  LuLayers,
  LuStar,
  LuDatabase, 
  LuCloud,
  LuChevronLeft,
  LuChevronRight,
  LuX
} from "react-icons/lu";
import { FaJava } from "react-icons/fa"; 
import { VscVscode } from "react-icons/vsc"; 
import {
  SiGit,
  SiDart,
  SiJavascript,
  SiTypescript,
  SiPostman,
  SiCss3,
  SiHtml5,
  SiPhp,
  SiLaravel,
  SiReact,
  SiFigma,
  SiMysql,
  SiNextdotjs,
  SiFlutter,
  SiTailwindcss,
  SiBootstrap,
  SiCplusplus,
  SiFirebase, 
  SiJquery, 
  SiSass, 
  SiNodedotjs, 
} from "react-icons/si";

// ==========================================
// 1. UI ICONS
// ==========================================
// Tipe dasar untuk komponen ikon (lebih longgar)
type IconComponentType = React.ComponentType<any>;

export const Icons = {
  // Menggunakan tipe ComponentType untuk konsistensi
  Github: (props: any) => <LuGithub {...props} />,
  Instagram: (props: any) => <LuInstagram {...props} />,
  ArrowRight: (props: any) => <LuArrowRight {...props} />,
  Rocket: (props: any) => <LuRocket {...props} />,
  Download: (props: any) => <LuDownload {...props} />,
  Eye: (props: any) => <LuEye {...props} />,
  Award: (props: any) => <LuAward {...props} />,
  Quote: (props: any) => <LuQuote {...props} />,
  Bookmark: (props: any) => <LuBookmark {...props} />,
  Code: (props: any) => <LuCode {...props} />,
  ExternalLink: (props: any) => <LuExternalLink {...props} />,
  Layers: (props: any) => <LuLayers {...props} />,
  Star: (props: any) => <LuStar {...props} />,
  Database: (props: any) => <LuDatabase {...props} />,
  Cloud: (props: any) => <LuCloud {...props} />,
  ChevronLeft: (props: any) => <LuChevronLeft {...props} />,
  ChevronRight: (props: any) => <LuChevronRight {...props} />,
  X: (props: any) => <LuX {...props} />,
  
  Alpine: ({ size = 24, color = "currentColor", className = "" }) => (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill={color} 
      className={className} 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M21.92 10.92l-9.93 11.09L2.09 10.92a1.51 1.51 0 0 1 2.22-2.1l7.68 8.61 7.71-8.61a1.51 1.51 0 0 1 2.22 2.1zM6.62 9.38l5.37-6.04 5.39 6.04H6.62z" />
    </svg>
  )
} as { [key: string]: IconComponentType }; 

// ==========================================
// 2. TECH STACK ICONS (Diperbarui untuk Layout 5x4)
// ==========================================

// Tipe data untuk Tech Stack
type TechStackItem = {
  Component: React.ComponentType<any>; 
  color: string;
  name: string;
  description: string;
};

export const techIcons: { [key: string]: TechStackItem } = {
  // Baris 1: Markup & Styling
  html: { Component: SiHtml5, color: "#E34F26", name: "HTML5", description: "Markup language for structuring web content." },
  css: { Component: SiCss3, color: "#1572B6", name: "CSS3", description: "Style sheet language for designing web pages." },
  tailwindcss: { Component: SiTailwindcss, color: "#06B6D4", name: "TAILWIND CSS", description: "Utility-first CSS framework for rapid UI development." },
  bootstrap: { Component: SiBootstrap, color: "#7952B3", name: "BOOTSTRAP", description: "Popular CSS framework for responsive design." },
  alpinejs: { Component: Icons.Alpine, color: "#8BC0D0", name: "ALPINE.JS", description: "Lightweight JavaScript framework for interactivity." },
  
  // Baris 2: Programming Languages
  js: { Component: SiJavascript, color: "#F7DF1E", name: "JAVASCRIPT", description: "The language of the web for dynamic functionality." },
  ts: { Component: SiTypescript, color: "#3178C6", name: "TYPESCRIPT", description: "JavaScript with syntax for types and better tooling." },
  java: { Component: FaJava, color: "#007396", name: "JAVA", description: "Robust, object-oriented programming language." },
  cpp: { Component: SiCplusplus, color: "#00599C", name: "C++", description: "Powerful language for system and game programming." },
  dart: { Component: SiDart, color: "#0175C2", name: "DART", description: "Client-optimized language for multi-platform apps." },

  // Baris 3: Frameworks & Libraries
  react: { Component: SiReact, color: "#61DAFB", name: "REACT", description: "JavaScript library for building user interfaces." },
  nextjs: { Component: SiNextdotjs, color: "#FFFFFF", name: "NEXT.JS", description: "React framework for production-grade applications." },
  flutter: { Component: SiFlutter, color: "#02569B", name: "FLUTTER", description: "UI toolkit for building natively compiled apps." },
  laravel: { Component: SiLaravel, color: "#FF2D20", name: "LARAVEL", description: "Elegant PHP framework for web artisans." },
  php: { Component: SiPhp, color: "#777BB4", name: "PHP", description: "Server-side scripting language for web development." },
  
  // Baris 4: Tools & Database
  mysql: { Component: SiMysql, color: "#4479A1", name: "MYSQL", description: "Popular open-source relational database." },
  postman: { Component: SiPostman, color: "#FF6C37", name: "POSTMAN", description: "API platform for building and testing APIs." },
  figma: { Component: SiFigma, color: "#F24E1E", name: "FIGMA", description: "Collaborative interface design tool." },
  vscode: { Component: VscVscode, color: "#007ACC", name: "VS CODE", description: "Powerful code editor for modern development." },
  git: { Component: SiGit, color: "#F05032", name: "GIT", description: "Distributed version control system." },
};
export type { TechStackItem };