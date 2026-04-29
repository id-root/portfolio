"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface CurlyArrowProps {
    /** Direction the arrow points */
    direction?: "down" | "down-left" | "down-right";
    size?: number;
    color?: string;
    className?: string;
    delay?: number;
}

/**
 * A hand-drawn, curvy arrow with a loopy stem.
 * Self-draws into view on scroll.
 */
export const CurlyArrow = ({
    direction = "down",
    size = 80,
    color = "var(--brand-accent)",
    className = "",
    delay = 0.5,
}: CurlyArrowProps) => {
    const ref = useRef<SVGSVGElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-30px" });

    // Different path data based on direction
    const paths: Record<string, { stem: string; head: string }> = {
        down: {
            stem: "M 20 5 C 25 15, 35 10, 30 25 C 25 40, 40 35, 35 50 C 30 60, 38 58, 35 70",
            head: "M 28 62 L 35 72 L 42 63",
        },
        "down-left": {
            stem: "M 55 5 C 50 15, 40 10, 45 25 C 50 35, 30 30, 25 45 C 20 55, 18 50, 15 65",
            head: "M 8 57 L 14 67 L 23 60",
        },
        "down-right": {
            stem: "M 10 5 C 15 18, 25 10, 22 28 C 18 40, 35 35, 40 50 C 45 60, 50 55, 52 68",
            head: "M 44 60 L 53 70 L 58 58",
        },
    };

    const { stem, head } = paths[direction];

    return (
        <svg
            ref={ref}
            width={size}
            height={size}
            viewBox="0 0 65 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`pointer-events-none ${className}`}
            aria-hidden="true"
        >
            {/* Arrow stem */}
            <motion.path
                d={stem}
                stroke={color}
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 0.7 } : { pathLength: 0, opacity: 0 }}
                transition={{
                    pathLength: { duration: 1, ease: "easeInOut", delay },
                    opacity: { duration: 0.3, delay },
                }}
            />
            {/* Arrowhead */}
            <motion.path
                d={head}
                stroke={color}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 0.7 } : { pathLength: 0, opacity: 0 }}
                transition={{
                    pathLength: { duration: 0.4, ease: "easeOut", delay: delay + 0.9 },
                    opacity: { duration: 0.2, delay: delay + 0.9 },
                }}
            />
        </svg>
    );
};
