"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

interface CyberButtonProps extends HTMLMotionProps<"button"> {
    children: ReactNode;
    variant?: "primary" | "secondary" | "danger" | "ghost";
    glitch?: boolean;
}

export const CyberButton = ({
    children,
    className = "",
    variant = "primary",
    glitch = false,
    ...props
}: CyberButtonProps) => {

    const variants = {
        primary: "bg-red-500 text-white hover:bg-red-600 hover:shadow-lg shadow-red-500/20 border-transparent",
        secondary: "bg-stone-900/50 border-stone-700 text-stone-300 hover:bg-stone-800 hover:border-stone-500",
        danger: "bg-red-600 text-white hover:bg-red-700 hover:shadow-lg shadow-red-600/20 border-transparent",
        ghost: "bg-transparent hover:bg-stone-100 dark:hover:bg-white/5 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white border-transparent"
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
                relative px-6 py-2 rounded font-bold transition-all duration-300 border flex items-center justify-center gap-2
                ${variants[variant]}
                ${className}
            `}
            {...props}
        >
            {glitch && (
                <span className="absolute inset-0 w-full h-full bg-inherit opacity-50 blur-sm animate-pulse rounded-lg" />
            )}
            <span className="relative z-10 flex items-center gap-2">{children}</span>
        </motion.button>
    );
};
