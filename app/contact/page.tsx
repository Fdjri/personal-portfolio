"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ScrambleText, StarBackground } from "@/components/ui/Animations";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { FaLinkedin, FaGithub, FaInstagram, FaYoutube, FaFacebook } from "react-icons/fa";
import { LuPin } from "react-icons/lu";
import emailjs from '@emailjs/browser';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, query, orderBy, limit, Timestamp } from 'firebase/firestore';

interface Comment {
  id: string;
  name: string;
  message: string;
  timestamp: Date;
  isAuthor?: boolean;
}

export default function ContactPage() {
  // Contact Form State
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailStatus, setEmailStatus] = useState<"idle" | "success" | "error">("idle");

  // Comments State
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentName, setCommentName] = useState("");
  const [commentMessage, setCommentMessage] = useState("");
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const [isPostingComment, setIsPostingComment] = useState(false);

  // Load comments from Firebase on mount
  useEffect(() => {
    loadComments();
  }, []);

  const loadComments = async () => {
    try {
      const commentsQuery = query(
        collection(db, 'comments'),
        orderBy('timestamp', 'desc'),
        limit(50)
      );
      const querySnapshot = await getDocs(commentsQuery);
      const loadedComments: Comment[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
        message: doc.data().message,
        timestamp: doc.data().timestamp.toDate(),
        isAuthor: doc.data().isAuthor || false,
      }));
      setComments(loadedComments);
    } catch (error) {
      console.error("Error loading comments:", error);
    } finally {
      setIsLoadingComments(false);
    }
  };

  // Handle Contact Form Submit (EmailJS)
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) {
      return;
    }

    setIsSendingEmail(true);
    setEmailStatus("idle");

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: contactName,
          from_email: contactEmail,
          message: contactMessage,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      setEmailStatus("success");
      setContactName("");
      setContactEmail("");
      setContactMessage("");

      // Reset success message after 5 seconds
      setTimeout(() => setEmailStatus("idle"), 5000);
    } catch (error) {
      console.error("Error sending email:", error);
      setEmailStatus("error");
      setTimeout(() => setEmailStatus("idle"), 5000);
    } finally {
      setIsSendingEmail(false);
    }
  };

  // Handle Comment Submit (Firebase)
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!commentName.trim() || !commentMessage.trim()) {
      return;
    }

    if (commentName.length > 100 || commentMessage.length > 500) {
      alert("Name must be ≤100 characters and message ≤500 characters");
      return;
    }

    setIsPostingComment(true);

    try {
      const docRef = await addDoc(collection(db, 'comments'), {
        name: commentName,
        message: commentMessage,
        timestamp: Timestamp.now(),
        isAuthor: false,
      });

      // Add comment to local state
      const newComment: Comment = {
        id: docRef.id,
        name: commentName,
        message: commentMessage,
        timestamp: new Date(),
        isAuthor: false,
      };

      setComments([newComment, ...comments]);
      setCommentName("");
      setCommentMessage("");
    } catch (error) {
      console.error("Error posting comment:", error);
      alert("Failed to post comment. Please try again.");
    } finally {
      setIsPostingComment(false);
    }
  };

  // Format timestamp for display
  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Social media links with icons (positioned to match orbit)
  const socialLinks = [
    { icon: FaLinkedin, href: "https://www.linkedin.com/in/sholihul-fadjri-triwibowo-220480289/?locale=en_US", color: "#0077B5", position: { x: -200, y: -80 } },
    { icon: FaFacebook, href: "https://www.facebook.com/fadjri.triwibowo.5", color: "#1877F2", position: { x: 5, y: -150 } },
    { icon: FaGithub, href: "https://github.com/Fdjri", color: "#fff", position: { x: -250, y: 80 } },
    { icon: FaInstagram, href: "https://www.instagram.com/fdjritw/", color: "#E4405F", position: { x: 0, y: 150 } },
    { icon: FaYoutube, href: "https://www.youtube.com/@fdjritw", color: "#FF0000", position: { x: 200, y: 80 } },
  ];

  return (
    <div className="min-h-screen bg-[#020205] text-white selection:bg-cyan-500/30 overflow-x-hidden relative">
      <StarBackground />
      <Header />

      <main className="relative z-20 pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center space-y-6 mb-20">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight"
            >
              <ScrambleText text="Let's Connect" delay={200} />
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-slate-400 max-w-3xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed px-4"
            >
              <ScrambleText 
                text="Whether you have a question, a project idea, or just want to say hello, feel free to reach out. I'm always open to discussing new opportunities and creative collaborations." 
                delay={500} 
              />
            </motion.p>
          </div>

          {/* Social Media Orbit Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex justify-center mb-32 relative"
          >
            <div className="relative w-full max-w-4xl h-[500px] flex items-center justify-center">
              {/* Orbit Circles and Lines */}
              <svg 
                className="absolute inset-0 w-full h-full" 
                viewBox="0 0 800 500"
                style={{ zIndex: 0 }}
              >
                {/* Outer circle orbit - Main */}
                <motion.circle
                  cx="400"
                  cy="250"
                  r="220"
                  stroke="url(#gradient1)"
                  strokeWidth="1.5"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: 1, 
                    opacity: 0.5,
                    rotate: 360 
                  }}
                  transition={{ 
                    pathLength: { delay: 0.8, duration: 2, ease: "easeOut" },
                    opacity: { delay: 0.8, duration: 2 },
                    rotate: { duration: 60, repeat: Infinity, ease: "linear" }
                  }}
                  style={{ transformOrigin: "400px 250px" }}
                />

                {/* Outer circle orbit - Shadow */}
                <motion.circle
                  cx="400"
                  cy="250"
                  r="223"
                  stroke="#22d3ee"
                  strokeWidth="0.5"
                  fill="none"
                  opacity="0.2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.8, duration: 2, ease: "easeOut" }}
                />

                {/* Middle circle orbit - Main */}
                <motion.circle
                  cx="400"
                  cy="250"
                  r="160"
                  stroke="url(#gradient2)"
                  strokeWidth="1.5"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: 1, 
                    opacity: 0.45,
                    rotate: -360 
                  }}
                  transition={{ 
                    pathLength: { delay: 1, duration: 2, ease: "easeOut" },
                    opacity: { delay: 1, duration: 2 },
                    rotate: { duration: 45, repeat: Infinity, ease: "linear" }
                  }}
                  style={{ transformOrigin: "400px 250px" }}
                />

                {/* Middle circle orbit - Shadow */}
                <motion.circle
                  cx="400"
                  cy="250"
                  r="163"
                  stroke="#22d3ee"
                  strokeWidth="0.5"
                  fill="none"
                  opacity="0.2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 1, duration: 2, ease: "easeOut" }}
                />

                {/* Inner circle orbit - Main */}
                <motion.circle
                  cx="400"
                  cy="250"
                  r="100"
                  stroke="url(#gradient3)"
                  strokeWidth="1.5"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: 1, 
                    opacity: 0.4,
                    rotate: 360 
                  }}
                  transition={{ 
                    pathLength: { delay: 1.2, duration: 2, ease: "easeOut" },
                    opacity: { delay: 1.2, duration: 2 },
                    rotate: { duration: 30, repeat: Infinity, ease: "linear" }
                  }}
                  style={{ transformOrigin: "400px 250px" }}
                />

                {/* Inner circle orbit - Shadow */}
                <motion.circle
                  cx="400"
                  cy="250"
                  r="103"
                  stroke="#22d3ee"
                  strokeWidth="0.5"
                  fill="none"
                  opacity="0.2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 1.2, duration: 2, ease: "easeOut" }}
                />

                {/* Curved lines from center to each icon */}
                {/* Line to LinkedIn (top-left) */}
                <motion.path
                  d="M 400 250 Q 320 180 200 170"
                  stroke="url(#lineGradient)"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.5 }}
                  transition={{ delay: 1.4, duration: 1.2, ease: "easeOut" }}
                />

                {/* Line to Facebook (top) */}
                <motion.path
                  d="M 400 250 Q 400 180 405 100"
                  stroke="url(#lineGradient)"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.5 }}
                  transition={{ delay: 1.5, duration: 1.2, ease: "easeOut" }}
                />

                {/* Line to GitHub (left) */}
                <motion.path
                  d="M 400 250 Q 280 250 150 330"
                  stroke="url(#lineGradient)"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.5 }}
                  transition={{ delay: 1.6, duration: 1.2, ease: "easeOut" }}
                />

                {/* Line to Instagram (bottom) */}
                <motion.path
                  d="M 400 250 Q 400 320 400 400"
                  stroke="url(#lineGradient)"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.5 }}
                  transition={{ delay: 1.7, duration: 1.2, ease: "easeOut" }}
                />

                {/* Line to YouTube (right) */}
                <motion.path
                  d="M 400 250 Q 520 260 600 330"
                  stroke="url(#lineGradient)"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.5 }}
                  transition={{ delay: 1.8, duration: 1.2, ease: "easeOut" }}
                />

                {/* Gradients */}
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
                    <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
                  </linearGradient>
                  <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.08" />
                    <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.08" />
                  </linearGradient>
                  <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.06" />
                    <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.06" />
                  </linearGradient>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Center Point with pulsing animation */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ zIndex: 1 }}>
                {/* Main center dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                  className="w-4 h-4 bg-cyan-400 rounded-full"
                  style={{ 
                    boxShadow: '0 0 20px rgba(6, 182, 212, 0.8), 0 0 40px rgba(6, 182, 212, 0.4)',
                  }}
                />
                
                {/* Pulsing rings */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 rounded-full border-2 border-cyan-400"
                    initial={{ scale: 1, opacity: 0 }}
                    animate={{
                      scale: [1, 3, 3],
                      opacity: [0.6, 0.3, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.6,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </div>

              {/* Social Media Icons */}
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: 1, 
                    opacity: 1,
                    y: [0, -10, 0],
                  }}
                  transition={{ 
                    scale: { delay: 2.1 + i * 0.1, duration: 0.5, type: "spring" },
                    opacity: { delay: 2.1 + i * 0.1, duration: 0.5 },
                    y: {
                      duration: 2.5 + (i * 0.3),
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.4,
                    }
                  }}
                  whileHover={{ scale: 1.15, y: -15 }}
                  className="absolute w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center cursor-pointer group"
                  style={{
                    left: `calc(50% + ${social.position.x}px)`,
                    top: `calc(50% + ${social.position.y}px)`,
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    border: `2px solid ${social.color}60`,
                    boxShadow: `
                      0 0 30px ${social.color}30,
                      0 0 60px ${social.color}15,
                      inset 0 0 20px rgba(0,0,0,0.5)
                    `,
                    zIndex: 2,
                  }}
                >
                  <social.icon 
                    className="w-8 h-8 md:w-10 md:h-10 transition-all duration-300 group-hover:scale-110" 
                    style={{ color: social.color }}
                  />
                  
                  {/* Glow effect on hover */}
                  <div 
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle, ${social.color}30, transparent 70%)`,
                      filter: 'blur(15px)',
                    }}
                  />
                  
                  {/* Pulsing ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      border: `2px solid ${social.color}40`,
                    }}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-20">
            
            {/* Left Column - Get In Touch Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="bg-[#0f172a]/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-800"
            >
              <h2 className="text-3xl font-bold mb-2">
                <ScrambleText text="Get In Touch" delay={1800} />
              </h2>
              <p className="text-slate-400 text-sm mb-6">
                This form will send me a private email.
              </p>

              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label htmlFor="contactName" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="contactName"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Your Name"
                    required
                    disabled={isSendingEmail}
                    className="w-full px-4 py-3 bg-[#1e293b] border border-slate-700 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors disabled:opacity-50"
                  />
                </div>

                <div>
                  <label htmlFor="contactEmail" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="contactEmail"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    required
                    disabled={isSendingEmail}
                    className="w-full px-4 py-3 bg-[#1e293b] border border-slate-700 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors disabled:opacity-50"
                  />
                </div>

                <div>
                  <label htmlFor="contactMessage" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="contactMessage"
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    rows={6}
                    placeholder="Your Message ..."
                    required
                    disabled={isSendingEmail}
                    className="w-full px-4 py-3 bg-[#1e293b] border border-slate-700 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors resize-none disabled:opacity-50"
                  />
                </div>

                {/* Status Messages */}
                {emailStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-900/30 border border-green-500/50 rounded-lg text-green-400 text-sm"
                  >
                    ✓ Message sent successfully! I'll get back to you soon.
                  </motion.div>
                )}

                {emailStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-900/30 border border-red-500/50 rounded-lg text-red-400 text-sm"
                  >
                    ✗ Failed to send message. Please try again or contact me directly.
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={isSendingEmail}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  {isSendingEmail ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>

                {/* Space Illustration - Decorative */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.2, duration: 0.8 }}
                  className="mt-8 relative h-48 overflow-hidden rounded-xl"
                >
                  {/* Background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/20 to-purple-950/30" />
                  
                  {/* Animated stars */}
                  {[
                    { left: 15, top: 20, duration: 2.5, delay: 0.3 },
                    { left: 85, top: 15, duration: 3.2, delay: 1.1 },
                    { left: 45, top: 8, duration: 2.8, delay: 0.7 },
                    { left: 72, top: 35, duration: 3.5, delay: 1.5 },
                    { left: 28, top: 65, duration: 2.2, delay: 0.5 },
                    { left: 92, top: 75, duration: 3.8, delay: 1.8 },
                    { left: 10, top: 82, duration: 2.9, delay: 0.9 },
                    { left: 58, top: 45, duration: 3.1, delay: 1.3 },
                    { left: 38, top: 88, duration: 2.6, delay: 0.4 },
                    { left: 78, top: 52, duration: 3.4, delay: 1.7 },
                    { left: 5, top: 48, duration: 2.4, delay: 0.6 },
                    { left: 65, top: 18, duration: 3.3, delay: 1.2 },
                    { left: 48, top: 72, duration: 2.7, delay: 0.8 },
                    { left: 82, top: 92, duration: 3.6, delay: 1.9 },
                    { left: 22, top: 38, duration: 2.3, delay: 0.2 },
                    { left: 95, top: 42, duration: 3.7, delay: 1.6 },
                    { left: 52, top: 58, duration: 2.9, delay: 1.0 },
                    { left: 12, top: 12, duration: 3.0, delay: 0.1 },
                    { left: 68, top: 78, duration: 2.5, delay: 1.4 },
                    { left: 35, top: 28, duration: 3.2, delay: 0.5 },
                  ].map((star, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full"
                      style={{
                        left: `${star.left}%`,
                        top: `${star.top}%`,
                      }}
                      animate={{
                        opacity: [0.2, 1, 0.2],
                        scale: [1, 1.5, 1],
                      }}
                      transition={{
                        duration: star.duration,
                        repeat: Infinity,
                        delay: star.delay,
                      }}
                    />
                  ))}

                  {/* Floating Rocket */}
                  <motion.div
                    className="absolute left-1/4 top-1/3"
                    animate={{
                      y: [0, -10, 0],
                      rotate: [-5, 5, -5],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="text-4xl">🚀</div>
                  </motion.div>

                  {/* Planet */}
                  <motion.div
                    className="absolute right-1/4 top-1/4"
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <div className="text-5xl">🪐</div>
                  </motion.div>

                  {/* Small planet */}
                  <motion.div
                    className="absolute left-1/3 bottom-1/4"
                    animate={{
                      y: [0, -8, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                  >
                    <div className="text-3xl">🌍</div>
                  </motion.div>

                  {/* Satellite */}
                  <motion.div
                    className="absolute right-1/3 bottom-1/3"
                    animate={{
                      x: [0, 10, 0],
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="text-2xl">🛸</div>
                  </motion.div>

                  {/* Moon */}
                  <motion.div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="text-6xl opacity-20">🌙</div>
                  </motion.div>

                  {/* Shooting star effect */}
                  <motion.div
                    className="absolute w-12 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                    style={{
                      top: "20%",
                      left: "-20%",
                    }}
                    animate={{
                      left: ["0%", "120%"],
                      top: ["20%", "80%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 5,
                      ease: "linear",
                    }}
                  />

                  {/* Text overlay */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
                    <p className="text-xs text-slate-400 font-medium tracking-wide">
                      Your message will reach me at light speed ⚡
                    </p>
                  </div>
                </motion.div>
              </form>
            </motion.div>

            {/* Right Column - Comments Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2, duration: 0.8 }}
              className="bg-[#0f172a]/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-800"
            >
              <h2 className="text-3xl font-bold mb-6">
                <ScrambleText text={`Comments (${comments.length})`} delay={2000} />
              </h2>

              {/* Comment Form */}
              <form onSubmit={handleCommentSubmit} className="space-y-4 mb-8">
                <div>
                  <label htmlFor="commentName" className="block text-sm font-medium mb-2">
                    Name <span className="text-xs text-slate-500">(max 100 characters)</span>
                  </label>
                  <input
                    type="text"
                    id="commentName"
                    value={commentName}
                    onChange={(e) => setCommentName(e.target.value)}
                    placeholder="Your Name"
                    maxLength={100}
                    required
                    disabled={isPostingComment}
                    className="w-full px-4 py-3 bg-[#1e293b] border border-slate-700 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors disabled:opacity-50"
                  />
                </div>

                <div>
                  <label htmlFor="commentMessage" className="block text-sm font-medium mb-2">
                    Message <span className="text-xs text-slate-500">({commentMessage.length}/500)</span>
                  </label>
                  <textarea
                    id="commentMessage"
                    value={commentMessage}
                    onChange={(e) => setCommentMessage(e.target.value)}
                    rows={3}
                    placeholder="Your Message ..."
                    maxLength={500}
                    required
                    disabled={isPostingComment}
                    className="w-full px-4 py-3 bg-[#1e293b] border border-slate-700 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors resize-none disabled:opacity-50"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isPostingComment}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  {isPostingComment ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      Posting...
                    </>
                  ) : (
                    "Post Comment"
                  )}
                </button>
              </form>

              {/* Pinned Comment */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.2, duration: 0.5 }}
                className="mb-6 relative"
              >
                {/* Pinned Header */}
                <div className="flex items-center gap-2 mb-3">
                  <LuPin className="w-4 h-4 text-blue-400 rotate-45" />
                  <span className="text-sm font-medium text-blue-400">Pinned Comments</span>
                </div>

                {/* Pinned Comment Card */}
                <div className="p-5 rounded-xl bg-gradient-to-br from-blue-950/40 to-blue-900/20 border-2 border-blue-500/30 backdrop-blur-sm">
                  {/* Header: Avatar + Name */}
                  <div className="flex items-center gap-3 mb-3">
                    {/* Profile Image */}
                    <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-blue-400 shadow-lg shadow-blue-500/20">
                      <Image
                        src="/images/me.jpg"
                        alt="Fadjri"
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>

                    {/* Name + Badge */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-white text-base">Fadjri</span>
                        <span className="px-2 py-0.5 bg-slate-200 text-slate-900 text-xs font-semibold rounded-full">
                          Author
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Comment Message */}
                  <div className="mt-2">
                    <p className="text-slate-200 text-sm leading-relaxed">
                      Thanks for visiting! Feel free to DM me on{" "}
                      <a 
                        href="https://www.instagram.com/fdjritw/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 underline decoration-blue-400/50 hover:decoration-blue-300 transition-colors font-medium"
                      >
                        Instagram
                      </a>
                      {" "}if you need anything ASAP.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Comments List */}
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {isLoadingComments ? (
                  <div className="flex items-center justify-center py-8">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-8 h-8 border-4 border-cyan-400 border-t-transparent rounded-full"
                    />
                  </div>
                ) : comments.length === 0 ? (
                  <div className="text-center py-8 text-slate-400">
                    No comments yet. Be the first to comment!
                  </div>
                ) : (
                  comments.map((comment) => (
                    <motion.div
                      key={comment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-5 rounded-xl ${
                        comment.isAuthor 
                          ? 'bg-[#2d3748]' 
                          : 'bg-[#1e293b]'
                      }`}
                    >
                      {/* Header: Avatar + Name */}
                      <div className="flex items-center gap-3 mb-3">
                        {/* Avatar with initial */}
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-md">
                          <span className="text-white font-bold text-base">
                            {comment.name.charAt(0).toUpperCase()}
                          </span>
                        </div>

                        {/* Name + Badge */}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-white text-base">
                              {comment.name}
                            </span>
                            {comment.isAuthor && (
                              <span className="px-2 py-0.5 bg-slate-200 text-slate-900 text-xs font-semibold rounded-full">
                                Author
                              </span>
                            )}
                          </div>
                          {/* Timestamp */}
                          <span className="text-xs text-slate-500">
                            {formatTimestamp(comment.timestamp)}
                          </span>
                        </div>
                      </div>

                      {/* Comment Message */}
                      <div className="mt-2">
                        <p className="text-slate-200 text-sm leading-relaxed break-words">
                          {comment.message}
                        </p>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

