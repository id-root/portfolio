"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SquiggleDividerProps {
    width?: number | string;
    color?: string;
    className?: string;
    delay?: number;
}

/**
 * A long, horizontal squiggly line used as a section divider.
 * Self-draws across the full width when scrolled into view.
 */
export const SquiggleDivider = ({
    width = "100%",
    color = "var(--brand-accent)",
    className = "",
    delay = 0,
}: SquiggleDividerProps) => {
    const ref = useRef<SVGSVGElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-20px" });

    return (
        <svg
            ref={ref}
            width={width}
            height="20"
            viewBox="0 0 600 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`block ${className}`}
            preserveAspectRatio="none"
            aria-hidden="true"
        >
            <motion.path
                d="M 0 10 C 15 4, 30 16, 45 10 C 60 4, 75 16, 90 10 C 105 4, 120 16, 135 10 C 150 4, 165 16, 180 10 C 195 4, 210 16, 225 10 C 240 4, 255 16, 270 10 C 285 4, 300 16, 315 10 C 330 4, 345 16, 360 10 C 375 4, 390 16, 405 10 C 420 4, 435 16, 450 10 C 465 4, 480 16, 495 10 C 510 4, 525 16, 540 10 C 555 4, 570 16, 585 10 C 592 7, 597 12, 600 10"
                stroke={color}
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 0.4 } : { pathLength: 0, opacity: 0 }}
                transition={{
                    pathLength: { duration: 2, ease: "easeInOut", delay },
                    opacity: { duration: 0.4, delay },
                }}
            />
        </svg>
    );
};
