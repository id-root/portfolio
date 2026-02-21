"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                // min-h-screen ensures the div takes up space even if content is loading
                className="w-full min-h-screen"

                // Initial: Slightly lower, transparent, blurry
                initial={{ y: 20, opacity: 0, filter: "blur(5px)" }}

                // Animate: Natural position, sharp
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}

                // Exit: Go slightly up, transparent, blurry
                exit={{ y: -20, opacity: 0, filter: "blur(5px)" }}

                transition={{
                    type: "tween",
                    ease: [0.25, 0.25, 0, 1],
                    duration: 1.0,
                }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}