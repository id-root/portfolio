"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface LoopCircleProps {
    /** Size of the circle — SVG viewBox stays consistent */
    size?: number;
    color?: string;
    className?: string;
    delay?: number;
}

/**
 * An organic, imperfect hand-drawn circle (double-loop).
 * Looks like someone circled something with a pen in a hurry.
 * Self-draws into view when scrolled into viewport.
 */
export const LoopCircle = ({
    size = 70,
    color = "var(--brand-accent)",
    className = "",
    delay = 0.2,
}: LoopCircleProps) => {
    const ref = useRef<SVGSVGElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-30px" });

    return (
        <svg
            ref={ref}
            width={size}
            height={size}
            viewBox="0 0 70 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`pointer-events-none ${className}`}
            aria-hidden="true"
        >
            {/* Primary loop — imperfect circle */}
            <motion.path
                d="M 35 8 C 55 6, 66 20, 64 38 C 62 56, 46 66, 30 64 C 14 62, 4 48, 6 32 C 8 16, 22 7, 38 10"
                stroke={color}
                strokeWidth="2.2"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 0.6 } : { pathLength: 0, opacity: 0 }}
                transition={{
                    pathLength: { duration: 1, ease: "easeInOut", delay },
                    opacity: { duration: 0.3, delay },
                }}
            />
            {/* Second pass — slightly offset for organic "re-traced" look */}
            <motion.path
                d="M 38 10 C 56 9, 63 24, 61 40 C 59 54, 44 63, 28 61 C 14 59, 7 46, 9 33 C 11 20, 24 11, 36 12"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 0.3 } : { pathLength: 0, opacity: 0 }}
                transition={{
                    pathLength: { duration: 0.8, ease: "easeInOut", delay: delay + 0.8 },
                    opacity: { duration: 0.2, delay: delay + 0.8 },
                }}
            />
        </svg>
    );
};
