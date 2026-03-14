'use client'

import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  enableTilt?: boolean;
}

export function AnimatedCard({ children, className = '', enableTilt = true }: AnimatedCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [6, -6]);
  const rotateY = useTransform(mouseX, [-300, 300], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!enableTilt) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      className="relative"
      style={enableTilt ? { perspective: 1200 } : undefined}
    >
      <motion.div
        className="relative"
        style={enableTilt ? { rotateX, rotateY } : undefined}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={enableTilt ? { z: 8 } : undefined}
      >
        <div className={`relative group ${className}`}>
          {/* Traveling light beams container */}
          <div className="absolute -inset-[1px] rounded-2xl overflow-hidden">
            {/* Top light beam */}
            <motion.div
              className="absolute top-0 left-0 h-[2px] w-[40%] bg-gradient-to-r from-transparent via-accent-caramel/60 to-transparent"
              animate={{
                left: ["-40%", "100%"],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                left: { duration: 3, ease: "easeInOut", repeat: Infinity, repeatDelay: 1.5 },
                opacity: { duration: 1.5, repeat: Infinity, repeatType: "mirror" },
              }}
            />
            {/* Right light beam */}
            <motion.div
              className="absolute top-0 right-0 h-[40%] w-[2px] bg-gradient-to-b from-transparent via-accent-caramel/60 to-transparent"
              animate={{
                top: ["-40%", "100%"],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                top: { duration: 3, ease: "easeInOut", repeat: Infinity, repeatDelay: 1.5, delay: 0.75 },
                opacity: { duration: 1.5, repeat: Infinity, repeatType: "mirror", delay: 0.75 },
              }}
            />
            {/* Bottom light beam */}
            <motion.div
              className="absolute bottom-0 right-0 h-[2px] w-[40%] bg-gradient-to-r from-transparent via-accent-caramel/60 to-transparent"
              animate={{
                right: ["-40%", "100%"],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                right: { duration: 3, ease: "easeInOut", repeat: Infinity, repeatDelay: 1.5, delay: 1.5 },
                opacity: { duration: 1.5, repeat: Infinity, repeatType: "mirror", delay: 1.5 },
              }}
            />
            {/* Left light beam */}
            <motion.div
              className="absolute bottom-0 left-0 h-[40%] w-[2px] bg-gradient-to-b from-transparent via-accent-caramel/60 to-transparent"
              animate={{
                bottom: ["-40%", "100%"],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                bottom: { duration: 3, ease: "easeInOut", repeat: Infinity, repeatDelay: 1.5, delay: 2.25 },
                opacity: { duration: 1.5, repeat: Infinity, repeatType: "mirror", delay: 2.25 },
              }}
            />

            {/* Corner glow spots */}
            <motion.div
              className="absolute top-0 left-0 h-[4px] w-[4px] rounded-full bg-accent-caramel/40 blur-[1px]"
              animate={{ opacity: [0.15, 0.4, 0.15] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatType: "mirror" }}
            />
            <motion.div
              className="absolute top-0 right-0 h-[5px] w-[5px] rounded-full bg-accent-caramel/50 blur-[2px]"
              animate={{ opacity: [0.15, 0.4, 0.15] }}
              transition={{ duration: 2.8, repeat: Infinity, repeatType: "mirror", delay: 0.5 }}
            />
            <motion.div
              className="absolute bottom-0 right-0 h-[5px] w-[5px] rounded-full bg-accent-caramel/50 blur-[2px]"
              animate={{ opacity: [0.15, 0.4, 0.15] }}
              transition={{ duration: 2.3, repeat: Infinity, repeatType: "mirror", delay: 1 }}
            />
            <motion.div
              className="absolute bottom-0 left-0 h-[4px] w-[4px] rounded-full bg-accent-caramel/40 blur-[1px]"
              animate={{ opacity: [0.15, 0.4, 0.15] }}
              transition={{ duration: 2.6, repeat: Infinity, repeatType: "mirror", delay: 1.5 }}
            />
          </div>

          {/* Card hover glow */}
          <motion.div
            className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-700"
            animate={{
              boxShadow: [
                "0 0 8px 1px rgba(196,167,125,0.03)",
                "0 0 12px 3px rgba(196,167,125,0.06)",
                "0 0 8px 1px rgba(196,167,125,0.03)",
              ],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }}
          />

          {/* Border glow on hover */}
          <div className="absolute -inset-[0.5px] rounded-2xl bg-gradient-to-r from-accent-caramel/5 via-accent-caramel/10 to-accent-caramel/5 opacity-0 group-hover:opacity-70 transition-opacity duration-500" />

          {/* Glass card background */}
          <div className="relative bg-white/50 dark:bg-[#1a1816]/60 backdrop-blur-xl rounded-2xl border border-beige-200/40 dark:border-[#d5c0aa]/10 shadow-[0_8px_32px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] overflow-hidden">
            {/* Subtle inner crosshatch pattern */}
            <div
              className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
              style={{
                backgroundImage: `linear-gradient(135deg, currentColor 0.5px, transparent 0.5px), linear-gradient(45deg, currentColor 0.5px, transparent 0.5px)`,
                backgroundSize: '30px 30px',
              }}
            />
            <div className="relative z-10">{children}</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
