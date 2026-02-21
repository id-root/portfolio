"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import React, { useRef } from "react";

export const HoloCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    const maskImage = useMotionTemplate`radial-gradient(240px at ${mouseX}px ${mouseY}px, white, transparent)`;
    const style = { maskImage, WebkitMaskImage: maskImage };

    return (
        <div
            onMouseMove={onMouseMove}
            className={`relative group bg-white/40 dark:bg-white/[0.04] backdrop-blur-xl border border-white/50 dark:border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.3)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)] overflow-hidden rounded-xl transition-all duration-300 ${className}`}
        >
            {/* Hover Glow Effect */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              var(--color-accent-glow),
              transparent 80%
            )
          `,
                }}
            />

            {/* Border Glow */}
            <motion.div
                className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-accent to-accent opacity-0 transition duration-300 group-hover:opacity-20"
                style={style}
            />

            <div className="relative h-full">{children}</div>
        </div>
    );
};
