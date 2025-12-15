"use client";

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring physics for position
    const springConfig = { damping: 30, stiffness: 200, mass: 0.8 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    // Rotation physics
    const angle = useMotionValue(0);
    const smoothAngle = useSpring(angle, { damping: 20, stiffness: 100 });

    useEffect(() => {
        let lastX = 0;
        let lastY = 0;
        let timeoutId: number;

        const updateAngle = () => {
            const cx = cursorX.get();
            const cy = cursorY.get();
            const dx = cx - lastX;
            const dy = cy - lastY;

            // Only update angle if moving significantly to avoid jitter
            if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
                const newAngle = Math.atan2(dy, dx) * (180 / Math.PI);
                angle.set(newAngle);
            }

            lastX = cx;
            lastY = cy;
            timeoutId = requestAnimationFrame(updateAngle);
        };

        timeoutId = requestAnimationFrame(updateAngle);
        return () => cancelAnimationFrame(timeoutId);
    }, [cursorX, cursorY, angle]);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('cursor-pointer')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [mouseX, mouseY]);

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999]"
            style={{
                x: cursorX,
                y: cursorY,
                translateX: "-50%",
                translateY: "-50%",
                rotate: smoothAngle, // Rotate the entire container
            }}
        >
            {/* Comet HEAD (Bright Cyan/White) */}
            <div className={`relative transition-transform duration-300 ${isHovering ? "scale-50" : "scale-100"}`}>
                <div className="w-4 h-4 rounded-full bg-cyan-100 shadow-[0_0_20px_rgba(34,211,238,1),0_0_40px_rgba(255,255,255,0.8)] relative z-20" />

                {/* Comet TAIL (Orange/Blue Gradient) 
            Tail should point OPPOSITE to movement (angle). 
            Since we rotate the container by 'angle', 'right' is forward (0 deg).
            So tail goes to the 'left' (180 deg).
        */}
                <div
                    className="absolute right-[50%] top-1/2 -translate-y-1/2 w-[180px] h-[30px] origin-right z-10"
                    style={{
                        transform: 'translateX(-10px)', // adjust overlap
                        background: 'linear-gradient(to left, rgba(34,211,238,0.8) 0%, rgba(251, 146, 60, 0.6) 30%, rgba(251, 146, 60, 0) 100%)',
                        filter: 'blur(4px)',
                        clipPath: 'polygon(100% 0%, 100% 100%, 0% 50%)', // Triangle shape for tail
                    }}
                />

                {/* Inner Core Tail (Brighter) */}
                <div
                    className="absolute right-[50%] top-1/2 -translate-y-1/2 w-[120px] h-[10px] origin-right z-15"
                    style={{
                        transform: 'translateX(-8px)',
                        background: 'linear-gradient(to left, rgba(255,255,255,0.9) 0%, rgba(34,211,238,0.5) 50%, rgba(34,211,238,0) 100%)',
                        filter: 'blur(2px)',
                        clipPath: 'polygon(100% 0%, 100% 100%, 0% 50%)',
                    }}
                />

                {/* Gaseous/Smoke Effect (Outer wide glow) */}
                <div
                    className="absolute right-[50%] top-1/2 -translate-y-1/2 w-[160px] h-[50px] origin-right z-0"
                    style={{
                        transform: 'translateX(-5px)',
                        background: 'radial-gradient(ellipse at right, rgba(34,211,238,0.3) 0%, rgba(59, 130, 246, 0.1) 40%, transparent 80%)',
                        filter: 'blur(8px)',
                    }}
                />
            </div>
        </motion.div>
    );
}
