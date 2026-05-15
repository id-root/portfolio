"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { cn } from "@/lib/utils";
import {
    StarSparkle,
    ScribbleUnderline,
    SquiggleDivider,
    LibraryBookIllustration,
} from "@/components/doodles";
import { WriteupCardNew } from "@/components/doodles/WriteupCardNew";

const writeups = [
    {
        title: "Anti-Debugging Framework",
        category: "Research",
        date: "02.01.2026",
        tags: ["Reverse Engineering", "Malware Analysis"],
        summary:
            "A comprehensive user-space anti-debugging framework implementing 8 distinct detection techniques spanning timing analysis, memory integrity verification, CPU exception handling, and kernel observer comparison.",
        link: "https://library-id-root.vercel.app/publications/anti-debug-framework",
    },
    {
        title: "BreachBlocker-Unlocker",
        category: "Write-up",
        date: "12.25.2025",
        tags: ["Web Exploitation", "Authentication Bypass"],
        summary:
            "Extract multiple flags from different apps by chaining enumeration, logic flaws, and authentication bypass techniques to recover stolen funds.",
        link: "https://library-id-root.vercel.app/publications/breachblocker-unlocker",
    },
    {
        title: "Carrotbane-of-My-Existence",
        category: "Write-up",
        date: "12.20.2025",
        tags: ["AI", "SMTP"],
        summary:
            "Understanding AI-powered applications, and chaining creative vulnerability discovery techniques.",
        link: "https://library-id-root.vercel.app/publications/carrotbane-of-my-existence",
    },
    {
        title: "Scheme-Catcher",
        category: "Write-up",
        date: "12.15.2025",
        tags: ["Binary Exploitation", "Reverse Engineering"],
        summary:
            "Extracting hidden flags from a stripped binary without execution. Walkthrough of dynamic analysis with gdb",
        link: "https://library-id-root.vercel.app/publications/scheme-catcher",
    },
    {
        title: "Hoppers-Origin",
        category: "Write-up",
        date: "12.10.2025",
        tags: ["Privilege Escalation", "Active Directory"],
        summary:
            "Initial reconnaissance phase. tracking the 'Hopper' entity across multiple platforms to find the entry point.",
        link: "https://library-id-root.vercel.app/publications/hoppers-origin",
    },
];

const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.97 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1] as any,
            delay: i * 0.06,
        },
    }),
};

export default function WriteupsPage() {
    const [activeFilter, setActiveFilter] = useState("All");
    const [expandedTitle, setExpandedTitle] = useState<string | null>(null);

    const filteredWriteups =
        activeFilter === "All"
            ? writeups
            : writeups.filter((post) => post.category === activeFilter);

    const handleToggle = useCallback((title: string) => {
        setExpandedTitle((prev) => (prev === title ? null : title));
    }, []);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") setExpandedTitle(null);
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, []);

    const tabs = ["All", "Research", "Write-up"];

    return (
        <div className="min-h-screen selection:bg-accent-caramel selection:text-white transition-colors duration-500 font-gamja overflow-x-hidden w-full relative">
            {/* Ambient Lighting */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[60vw] min-w-[300px] h-[60vw] min-h-[300px] rounded-full bg-brand-primary/5 blur-[140px]" />
            </div>

            <main className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-28 md:pt-32 pb-0">
                {/* Hero Card Layout */}
                <div className="relative mb-16 rounded-[2.5rem] bg-[#f5e6d6] overflow-hidden p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center gap-10 lg:gap-16 shadow-sm border border-brand-primary/5">
                    {/* Decorative Bottom Wavy Line for the whole card */}
                    <div className="absolute bottom-4 left-0 w-full overflow-hidden pointer-events-none opacity-50">
                        <svg width="100%" height="20" viewBox="0 0 1000 20" preserveAspectRatio="none">
                            <path d="M0,10 Q50,0 100,10 T200,10 T300,10 T400,10 T500,10 T600,10 T700,10 T800,10 T900,10 T1000,10" fill="none" stroke="#e4c8ab" strokeWidth="4" strokeLinecap="round" />
                        </svg>
                    </div>

                    {/* Left Column: Text & Tabs */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="flex-1 relative z-10 w-full flex flex-col items-start text-left"
                    >
                        <h1 className="text-5xl md:text-7xl font-gamja text-text-primary font-medium tracking-tight mb-2 relative">
                            Library
                        </h1>
                        <ScribbleUnderline
                            width={160}
                            color="var(--brand-accent)"
                            className="mb-6"
                            delay={0.4}
                        />
                        <p className="text-lg md:text-xl text-text-secondary font-light max-w-sm leading-relaxed mb-10">
                            A curated collection of deep-dive research papers and
                            detailed CTF methodologies.
                        </p>
                        
                        {/* Tabs */}
                        <div className="flex gap-2 overflow-x-auto no-scrollbar w-full">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => {
                                        setActiveFilter(tab);
                                        setExpandedTitle(null);
                                    }}
                                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap border ${
                                        activeFilter === tab
                                            ? "border-transparent bg-[#312726] text-white shadow-md"
                                            : "border-transparent bg-transparent text-text-secondary hover:text-text-primary"
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Column: Illustration */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="flex-1 relative z-10 w-full flex justify-center md:justify-end"
                    >
                        <LibraryBookIllustration className="w-full max-w-[400px]" />
                    </motion.div>
                </div>

                {/* Grid */}
                <LayoutGroup>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                    <AnimatePresence mode="popLayout">
                        {filteredWriteups.map((post, idx) => {
                            const isLastOdd =
                                filteredWriteups.length % 2 !== 0 &&
                                idx === filteredWriteups.length - 1;
                            const isExpanded = expandedTitle === post.title;

                            return (
                                <motion.div
                                    key={post.title}
                                    custom={idx}
                                    variants={cardVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit={{ opacity: 0, scale: 0.97 }}
                                    layout
                                    transition={{
                                        layout: {
                                            type: "spring",
                                            stiffness: 200,
                                            damping: 28,
                                            mass: 1.1,
                                        },
                                    }}
                                    className={cn(
                                        "block items-start h-fit",
                                        isLastOdd && "md:col-span-2"
                                    )}
                                >
                                    <WriteupCardNew
                                        {...post}
                                        seed={idx}
                                        isExpanded={isExpanded}
                                        onToggle={() => handleToggle(post.title)}
                                    />
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
                </LayoutGroup>

                {filteredWriteups.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="py-20 text-center text-text-muted font-light"
                    >
                        No entries found for this category.
                    </motion.div>
                )}
            </main>
        </div>
    );
}
