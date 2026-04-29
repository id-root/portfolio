"use client";

import { motion } from "framer-motion";

interface StarSparkleProps {
    /** Overall size of the sparkle cluster */
    size?: number;
    color?: string;
    className?: string;
    /** Delay before the sparkle animation starts */
    delay?: number;
}

/**
 * A cluster of 3 hand-drawn, 4-point organic stars.
 * Each star floats and twinkles independently with staggered timing.
 */
export const StarSparkle = ({
    size = 60,
    color = "var(--brand-accent)",
    className = "",
    delay = 0,
}: StarSparkleProps) => {
    // 3 stars with different sizes, positions, and animation offsets
    const stars = [
        { cx: 30, cy: 14, scale: 1, animDelay: delay + 0 },
        { cx: 48, cy: 32, scale: 0.6, animDelay: delay + 0.8 },
        { cx: 14, cy: 38, scale: 0.45, animDelay: delay + 1.4 },
    ];

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 60 55"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`pointer-events-none ${className}`}
            aria-hidden="true"
        >
            {stars.map((star, i) => (
                <motion.g
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: star.scale }}
                    transition={{
                        duration: 0.5,
                        delay: star.animDelay,
                        ease: "backOut",
                    }}
                >
                    <motion.path
                        d={fourPointStar(star.cx, star.cy, 6 * star.scale, 12 * star.scale)}
                        stroke={color}
                        strokeWidth={1.8}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill={color}
                        fillOpacity={0.15}
                        animate={{
                            opacity: [0.4, 1, 0.4],
                            scale: [0.9, 1.15, 0.9],
                        }}
                        transition={{
                            duration: 2.5 + i * 0.4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: star.animDelay,
                        }}
                    />
                </motion.g>
            ))}
        </svg>
    );
};

/**
 * Generate an organic 4-point star path.
 * Slightly irregular control points give a hand-drawn feel.
 */
function fourPointStar(cx: number, cy: number, innerR: number, outerR: number): string {
    // Top, Right, Bottom, Left points with slight offsets for organic feel
    const points = [
        `M ${cx} ${cy - outerR}`,                          // top
        `Q ${cx + innerR * 0.5} ${cy - innerR * 0.3}, ${cx + outerR} ${cy + 1}`, // right
        `Q ${cx + innerR * 0.4} ${cy + innerR * 0.5}, ${cx + 1} ${cy + outerR}`, // bottom
        `Q ${cx - innerR * 0.3} ${cy + innerR * 0.4}, ${cx - outerR} ${cy - 1}`, // left
        `Q ${cx - innerR * 0.5} ${cy - innerR * 0.5}, ${cx} ${cy - outerR}`,     // back to top
    ];
    return points.join(" ");
}
