"use client";

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);
    const [stickyElement, setStickyElement] = useState<HTMLElement | null>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springConfig = { damping: 30, stiffness: 200, mass: 0.6 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);
    const angle = useMotionValue(0);
    const smoothAngle = useSpring(angle, { damping: 20, stiffness: 80 });
    const velocity = useMotionValue(0);
    const smoothVelocity = useSpring(velocity, { damping: 20, stiffness: 100 });
    const tailScaleX = useTransform(smoothVelocity, [0, 50], [1, 1.25]);
    const tailScaleY = useTransform(smoothVelocity, [0, 50], [1, 0.85]);

    useEffect(() => {
        let lastX = 0;
        let lastY = 0;
        let timeoutId: number;

        const updateLoop = () => {
            const cx = cursorX.get();
            const cy = cursorY.get();

            const dx = cx - lastX;
            const dy = cy - lastY;

            const currentSpeed = Math.sqrt(dx * dx + dy * dy) * 10;
            velocity.set(currentSpeed);

            if (!stickyElement && currentSpeed > 0.5) {
                const newAngle = Math.atan2(dy, dx) * (180 / Math.PI);
                angle.set(newAngle);
            }

            lastX = cx;
            lastY = cy;
            timeoutId = requestAnimationFrame(updateLoop);
        };

        timeoutId = requestAnimationFrame(updateLoop);
        return () => cancelAnimationFrame(timeoutId);
    }, [cursorX, cursorY, angle, velocity, stickyElement]);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            if (stickyElement) {
                const { left, top, width, height } = stickyElement.getBoundingClientRect();
                const centerX = left + width / 2;
                const centerY = top + height / 2;
                mouseX.set(centerX);
                mouseY.set(centerY);
            } else {
                mouseX.set(e.clientX);
                mouseY.set(e.clientY);
            }
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const clickable = target.closest('a, button, input, textarea, .cursor-pointer');

            if (clickable) {
                setStickyElement(clickable as HTMLElement);
                setIsHovering(true);
            } else {
                setStickyElement(null);
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [mouseX, mouseY, stickyElement]);

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999]"
            style={{
                x: cursorX,
                y: cursorY,
                translateX: "-50%",
                translateY: "-50%",
                rotate: smoothAngle,
            }}
        >
            <div className={`relative transition-all duration-300 ${isHovering ? "scale-50" : "scale-100"}`}>

                {/* Comet HEAD */}
                <div className={`w-3 h-3 rounded-full bg-cyan-50 shadow-[0_0_15px_rgba(34,211,238,0.8),0_0_30px_rgba(255,255,255,0.6)] relative z-20 transition-all duration-300 ${isHovering ? "bg-white scale-[2.5]" : ""}`} />

                {/* Comet TAIL Group */}
                <motion.div
                    className={`absolute right-[50%] top-1/2 -translate-y-1/2 origin-right z-10 ${isHovering ? "opacity-0" : "opacity-100"}`}
                    style={{
                        scaleX: tailScaleX,
                        scaleY: tailScaleY,
                    }}
                >
                    {/* Layer 1: Main Trail */}
                    <div
                        className="absolute right-0 top-1/2 -translate-y-1/2 w-[100px] h-[20px] origin-right"
                        style={{
                            transform: 'translateX(-4px)',
                            background: 'linear-gradient(to left, rgba(34,211,238,0.4) 0%, rgba(34,211,238,0.1) 50%, transparent 100%)',
                            filter: 'blur(6px)',
                            borderRadius: '100px',
                        }}
                    />

                    {/* Layer 2: Inner Core  */}
                    <div
                        className="absolute right-0 top-1/2 -translate-y-1/2 w-[60px] h-[4px] origin-right"
                        style={{
                            transform: 'translateX(-2px)',
                            background: 'linear-gradient(to left, rgba(255,255,255,0.6) 0%, rgba(34,211,238,0.3) 70%, transparent 100%)',
                            filter: 'blur(2px)',
                            borderRadius: '100px',
                        }}
                    />
                </motion.div>
            </div>
        </motion.div>
    );
}