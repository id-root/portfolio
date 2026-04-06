"use client";

import { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { LiquidGlassCard } from "@/components/ui/liquid-glass-card";

const writeups = [
    {
        title: "Anti-Debugging Framework",
        category: "Research",
        date: "02.01.2026",
        tags: ["Reverse Engineering", "Malware Analysis"],
        summary: "A comprehensive user-space anti-debugging framework implementing 8 distinct detection techniques spanning timing analysis, memory integrity verification, CPU exception handling, and kernel observer comparison.",
        link: "https://library-id-root.vercel.app/publications/anti-debug-framework"
    },
    {
        title: "BreachBlocker-Unlocker",
        category: "Write-up",
        date: "12.25.2025",
        tags: ["Web Exploitation", "Authentication Bypass"],
        summary: "Extract multiple flags from different apps by chaining enumeration, logic flaws, and authentication bypass techniques to recover stolen funds.",
        link: "https://library-id-root.vercel.app/publications/breachblocker-unlocker"
    },
    {
        title: "Carrotbane-of-My-Existence",
        category: "Write-up",
        date: "12.20.2025",
        tags: ["AI", "SMTP"],
        summary: "Understanding AI-powered applications, and chaining creative vulnerability discovery techniques.",
        link: "https://library-id-root.vercel.app/publications/carrotbane-of-my-existence"
    },
    {
        title: "Scheme-Catcher",
        category: "Write-up",
        date: "12.15.2025",
        tags: ["Binary Exploitation", "Reverse Engineering"],
        summary: "Extracting hidden flags from a stripped binary without execution. Walkthrough of dynamic analysis with gdb",
        link: "https://library-id-root.vercel.app/publications/scheme-catcher"
    },
    {
        title: "Hoppers-Origin",
        category: "Write-up",
        date: "12.10.2025",
        tags: ["Privilege Escalation", "Active Directory"],
        summary: "Initial reconnaissance phase. tracking the 'Hopper' entity across multiple platforms to find the entry point.",
        link: "https://library-id-root.vercel.app/publications/hoppers-origin"
    }
];

const WriteupCard = ({
    title,
    category,
    date,
    tags,
    summary,
    link,
    index,
    totalItems,
}: {
    title: string;
    category: string;
    date: string;
    tags: string[];
    summary: string;
    link: string;
    index: number;
    totalItems: number;
}) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
            whileHover={{ y: -6, scale: 1.02 }}
        >
            <LiquidGlassCard
                as="a"
                href={link}
                target="_blank"
                className="flex flex-col py-8 px-6 md:p-8 h-full cursor-pointer group"
            >
                {/* Category badge */}
                <div className="mb-4 relative z-10">
                    <span className="px-2.5 py-1 bg-surface font-mono border border-border/50 text-text-primary group-hover:text-[var(--brand-accent)] group-hover:border-[var(--brand-accent)]/30 transition-colors duration-500 text-[10px] font-semibold uppercase tracking-wider rounded">
                        {category}
                    </span>
                </div>

                {/* Title with accent bar */}
                <div className="text-xl font-bold mb-3 relative z-10 flex items-center">
                    <span className="inline-block text-text-primary font-gamja transition-colors duration-500">
                        {title}
                    </span>
                </div>

                {/* Summary */}
                <p className="text-sm text-text-secondary transition-colors duration-500 font-light relative z-10 leading-relaxed mb-6 mt-2">
                    {summary}
                </p>

                {/* Tags & date */}
                <div className="flex flex-wrap items-center gap-2 relative z-10 mt-auto">
                    {tags.map(tag => (
                        <span key={tag} className="text-brand-primary transition-colors duration-500 text-xs font-mono">
                            #{tag.toLowerCase().replace(" ", "_")}
                        </span>
                    ))}
                    <span className="ml-auto text-xs font-mono text-text-muted group-hover:text-brand-light/60 transition-colors duration-500">
                        {date}
                    </span>
                </div>

                {/* Arrow icon */}
                <ArrowUpRight className="absolute top-8 right-8 w-5 h-5 opacity-0 -translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 text-[var(--brand-accent)] group-hover:rotate-12 z-10" />
            </LiquidGlassCard>
        </motion.div>
    );
};

export default function WriteupsPage() {
    const [activeFilter, setActiveFilter] = useState("All");
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    const filteredWriteups = activeFilter === "All"
        ? writeups
        : writeups.filter(post => post.category === activeFilter);

    const tabs = ["All", "Research", "Write-up"];

    return (
        <div className="min-h-screen selection:bg-accent-caramel selection:text-white transition-colors duration-500 font-gamja overflow-x-hidden w-full relative">
            
            {/* Ambient Lighting Wrapper - HARD CLIPPED TO PREVENT ZOOM */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[60vw] min-w-[300px] h-[60vw] min-h-[300px] rounded-full bg-brand-primary/5 blur-[140px]" />
            </div>

            <main className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-40 md:pt-48 pb-0">
                {/* ─── HEADER ─── */}
                <header className="mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <h1 className="text-5xl md:text-7xl font-gamja text-text-primary font-medium tracking-tight mb-8">
                            Library
                        </h1>
                        <p className="text-lg md:text-xl text-text-secondary font-light max-w-2xl leading-relaxed">
                            A curated collection of deep-dive research papers and detailed CTF methodologies.
                        </p>
                    </motion.div>
                </header>

                {/* ─── FILTER TABS ─── */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 1 }}
                    className="flex gap-2 mb-16 border-b border-border pb-4 overflow-x-auto no-scrollbar"
                >
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveFilter(tab)}
                            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                                activeFilter === tab
                                    ? "bg-brand-primary text-white shadow-[0_0_20px_rgba(49,39,38,0.3)]"
                                    : "text-text-secondary hover:text-text-primary"
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </motion.div>

                {/* ─── CONTENT GRID ─── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                    <AnimatePresence mode="popLayout">
                        {filteredWriteups.map((post, idx) => (
                            <WriteupCard
                                key={post.title}
                                {...post}
                                index={idx}
                                totalItems={filteredWriteups.length}
                            />
                        ))}
                    </AnimatePresence>
                </div>

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
