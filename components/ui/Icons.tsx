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
  LuStar 
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
} from "react-icons/si";

// ==========================================
// 1. UI ICONS
// ==========================================
export const Icons = {
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
};

// ==========================================
// 2. TECH STACK ICONS
// ==========================================
export const techIcons = {
  git: { Component: SiGit, color: "#F05032" },
  dart: { Component: SiDart, color: "#0175C2" },
  java: { Component: FaJava, color: "#5382A1" },
  ts: { Component: SiTypescript, color: "#3178C6" },
  js: { Component: SiJavascript, color: "#F7DF1E" },
  vsc: { Component: VscVscode, color: "#007ACC" },
  postman: { Component: SiPostman, color: "#FF6C37" },
  css3: { Component: SiCss3, color: "#264DE4" },
  html5: { Component: SiHtml5, color: "#E34F26" },
  php: { Component: SiPhp, color: "#777BB4" },
  laravel: { Component: SiLaravel, color: "#FF2D20" },
  react: { Component: SiReact, color: "#61DAFB" },
  figma: { Component: SiFigma, color: "#F24E1E" },
  mysql: { Component: SiMysql, color: "#4479A1" },
  nextjs: { Component: SiNextdotjs, color: "#FFFFFF" },
  alpinejs: { Component: Icons.Alpine, color: "#8BC0D0" }, 
  flutter: { Component: SiFlutter, color: "#02569B" },
  tailwindcss: { Component: SiTailwindcss, color: "#38BDF8" },
  bootstrap: { Component: SiBootstrap, color: "#7952B3" },
  cpp: { Component: SiCplusplus, color: "#00599C" },
};