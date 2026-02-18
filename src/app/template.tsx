"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <motion.div className="flex-grow w-full relative">
            {/* Glass Slide Overlay */}
            <motion.div
                className="fixed inset-0 z-50 pointer-events-none bg-stone-200/20 dark:bg-black/20 backdrop-blur-xl border-r border-white/10"
                initial={{ x: "0%" }}
                animate={{ x: "100%" }}
                exit={{ x: "0%" }}
                transition={{
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1] // Custom glossy smooth ease
                }}
            />
            {/* Secondary Layer for Depth */}
            <motion.div
                className="fixed inset-0 z-40 pointer-events-none bg-stone-900/5 backdrop-blur-sm"
                initial={{ x: "0%" }}
                animate={{ x: "100%" }}
                exit={{ x: "0%" }}
                transition={{
                    duration: 0.9,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.05
                }}
            />

            <motion.main
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full"
            >
                {children}
            </motion.main>
        </motion.div>
    );
}
