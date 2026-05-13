"use client";

import React, { createContext, useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type GlitchContextType = {
    triggerGlitch: (callback?: () => void) => void;
};

const GlitchContext = createContext<GlitchContextType | undefined>(undefined);

export const useGlitch = () => {
    const context = useContext(GlitchContext);
    if (!context) throw new Error("useGlitch must be used within GlitchProvider");
    return context;
};

export const GlitchProvider = ({ children }: { children: React.ReactNode }) => {
    const [isGlitching, setIsGlitching] = useState(false);

    const triggerGlitch = (callback?: () => void) => {
        setIsGlitching(true);

        // Execute callback halfway through glitch (to switch theme while obscured)
        setTimeout(() => {
            if (callback) callback();
        }, 200);

        setTimeout(() => {
            setIsGlitching(false);
        }, 400);
    };

    return (
        <GlitchContext.Provider value={{ triggerGlitch }}>
            {children}
            <AnimatePresence>
                {isGlitching && <GlitchOverlay />}
            </AnimatePresence>
        </GlitchContext.Provider>
    );
};

const GlitchOverlay = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] pointer-events-none bg-black/50 backdrop-invert flex flex-col"
        >
            {/* Scanlines / Noise simulation */}
            {Array.from({ length: 15 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="flex-1 bg-white/10 dark:bg-black/10 mix-blend-difference"
                    initial={{ x: 0 }}
                    animate={{ x: [0, -10, 10, -5, 5, 0] }}
                    transition={{ duration: 0.15, repeat: Infinity, repeatType: "mirror", delay: i * 0.02 }}
                />
            ))}
            <div className="absolute inset-0 bg-white/5 mix-blend-overlay animate-pulse"></div>
        </motion.div>
    );
};
