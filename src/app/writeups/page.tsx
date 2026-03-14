"use client";

import { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SparklesCore } from "@/components/ui/sparkles";
import { useTheme } from "next-themes";

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

export default function WriteupsPage() {
    const [activeFilter, setActiveFilter] = useState("All");
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);
    const isDark = mounted && resolvedTheme === "dark";

    const filteredWriteups = activeFilter === "All"
        ? writeups
        : writeups.filter(post => post.category === activeFilter);

    const tabs = ["All", "Research", "Write-up"];

    return (
        <div className="min-h-screen selection:bg-accent-caramel selection:text-white transition-colors duration-500 font-sans">
            {/* Ambient Lighting */}
            <div className="fixed top-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-accent-caramel/5 blur-[140px] pointer-events-none" />

            {/* Dark-mode-only Sparkles */}
            {isDark && (
                <div className="fixed inset-0 w-full h-full z-0 pointer-events-none opacity-40">
                    <SparklesCore
                        id="writeups-sparkles"
                        background="transparent"
                        minSize={0.4}
                        maxSize={1.2}
                        particleDensity={20}
                        className="w-full h-full"
                        particleColor="#C4A77D"
                        speed={0.3}
                    />
                </div>
            )}

            <main className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-40 md:pt-48 pb-32">
                {/* ─── HEADER ─── */}
                <header className="mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <h1 className="text-5xl md:text-7xl font-serif text-stone-900 dark:text-white font-medium tracking-tight mb-8">
                            Library
                        </h1>
                        <p className="text-lg md:text-xl text-stone-500 dark:text-stone-400 font-light max-w-2xl leading-relaxed">
                            A curated collection of deep-dive research papers and detailed CTF methodologies.
                        </p>
                    </motion.div>
                </header>

                {/* ─── FILTER TABS ─── */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 1 }}
                    className="flex gap-2 mb-16 border-b border-stone-200 dark:border-stone-800/80 pb-4 overflow-x-auto no-scrollbar"
                >
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveFilter(tab)}
                            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                                activeFilter === tab
                                    ? "bg-stone-900 text-white dark:bg-white dark:text-stone-900"
                                    : "text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white"
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </motion.div>

                {/* ─── CONTENT LIST ─── */}
                <div className="flex flex-col">
                    <AnimatePresence mode="popLayout">
                        {filteredWriteups.map((post, idx) => (
                            <motion.a
                                key={post.title}
                                href={post.link}
                                target="_blank"
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: idx * 0.05 }}
                                className="group block border-b border-stone-200 dark:border-stone-800/80 py-10 transition-colors hover:border-accent-caramel/30 dark:hover:border-accent-caramel/30"
                            >
                                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-4">
                                    <h2 className="text-2xl md:text-3xl font-serif text-stone-900 dark:text-white font-medium group-hover:text-accent-caramel transition-colors">
                                        {post.title}
                                    </h2>
                                    <div className="flex items-center gap-4 text-sm font-mono text-stone-400 dark:text-stone-500 shrink-0">
                                        <span>{post.date}</span>
                                        <ArrowUpRight className="w-5 h-5 opacity-100 translate-x-0 md:opacity-0 md:-translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-accent-caramel" />
                                    </div>
                                </div>
                                
                                <p className="text-stone-500 dark:text-stone-400 font-light leading-relaxed max-w-3xl mb-6">
                                    {post.summary}
                                </p>

                                <div className="flex flex-wrap items-center gap-3">
                                    <span className="px-3 py-1 bg-stone-100 dark:bg-stone-800/50 text-stone-600 dark:text-stone-300 text-xs font-semibold uppercase tracking-wider rounded">
                                        {post.category}
                                    </span>
                                    {post.tags.map(tag => (
                                        <span key={tag} className="text-stone-400 dark:text-stone-500 text-xs font-mono">
                                            #{tag.toLowerCase().replace(" ", "_")}
                                        </span>
                                    ))}
                                </div>
                            </motion.a>
                        ))}
                    </AnimatePresence>

                    {filteredWriteups.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="py-20 text-center text-stone-400 dark:text-stone-500 font-light"
                        >
                            No entries found for this category.
                        </motion.div>
                    )}
                </div>
            </main>
        </div>
    );
}
