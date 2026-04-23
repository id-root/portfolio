"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface ScribbleUnderlineProps {
    width?: number;
    color?: string;
    className?: string;
    delay?: number;
}

/**
 * An organic, hand-drawn wavy underline SVG.
 * Animates with a "self-drawing" stroke effect when scrolled into view.
 */
export const ScribbleUnderline = ({
    width = 260,
    color = "var(--brand-accent)",
    className = "",
    delay = 0.3,
}: ScribbleUnderlineProps) => {
    const ref = useRef<SVGSVGElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-40px" });

    // The total path length — measured from the SVG path
    const pathLength = 320;

    return (
        <svg
            ref={ref}
            width={width}
            height="16"
            viewBox="0 0 260 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`block ${className}`}
            aria-hidden="true"
        >
            <motion.path
                d="M2 10 C 20 2, 40 14, 60 8 C 80 2, 100 14, 120 7 C 140 1, 160 15, 180 8 C 200 1, 220 13, 240 7 C 250 4, 255 9, 258 7"
                stroke={color}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                transition={{
                    pathLength: { duration: 1.2, ease: "easeInOut", delay },
                    opacity: { duration: 0.3, delay },
                }}
            />
            {/* A second, lighter pass for organic thickness variation */}
            <motion.path
                d="M5 12 C 25 5, 45 13, 65 9 C 85 5, 105 12, 125 8 C 145 4, 165 13, 185 9 C 205 4, 225 12, 245 8"
                stroke={color}
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                opacity={0.35}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 0.35 } : { pathLength: 0, opacity: 0 }}
                transition={{
                    pathLength: { duration: 1.4, ease: "easeInOut", delay: delay + 0.2 },
                    opacity: { duration: 0.3, delay: delay + 0.2 },
                }}
            />
        </svg>
    );
};
