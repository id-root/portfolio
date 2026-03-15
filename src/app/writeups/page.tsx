"use client";

import { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SparklesCore } from "@/components/ui/sparkles";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Footer } from "@/components/footer";

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
    const cols = 2;
    const isTopHalf = index < Math.ceil(totalItems / cols);
    const isLastOdd = totalItems % cols !== 0 && index === totalItems - 1;

    return (
        <motion.a
            href={link}
            target="_blank"
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
            className={cn(
                "flex flex-col py-10 px-8 relative group/feature border-stone-200 dark:border-stone-700/60 transition-colors",
                index % cols === 0 && !isLastOdd && "md:border-r",
                index < totalItems - (totalItems % cols === 0 ? cols : totalItems % cols) && "border-b",
                isLastOdd && "md:col-span-2",
            )}
        >
            {/* Hover gradient overlay */}
            {isTopHalf ? (
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-300 absolute inset-0 h-full w-full bg-gradient-to-t from-stone-100 dark:from-stone-800/50 to-transparent pointer-events-none" />
            ) : (
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-300 absolute inset-0 h-full w-full bg-gradient-to-b from-stone-100 dark:from-stone-800/50 to-transparent pointer-events-none" />
            )}

            {/* Category badge */}
            <div className="mb-4 relative z-10">
                <span className="px-2.5 py-0.5 bg-stone-100 dark:bg-stone-800/50 text-stone-600 dark:text-stone-300 text-[10px] font-semibold uppercase tracking-wider rounded">
                    {category}
                </span>
            </div>

            {/* Title with accent bar */}
            <div className="text-xl font-bold mb-3 relative z-10">
                <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-stone-300 dark:bg-stone-700 group-hover/feature:bg-accent-caramel transition-all duration-200 origin-center" />
                <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-stone-900 dark:text-white font-serif pl-4">
                    {title}
                </span>
            </div>

            {/* Summary */}
            <p className="text-sm text-stone-500 dark:text-stone-400 font-light relative z-10 leading-relaxed mb-4 pl-4">
                {summary}
            </p>

            {/* Tags & date */}
            <div className="flex flex-wrap items-center gap-2 relative z-10 pl-4 mt-auto">
                {tags.map(tag => (
                    <span key={tag} className="text-stone-400 dark:text-stone-500 text-xs font-mono">
                        #{tag.toLowerCase().replace(" ", "_")}
                    </span>
                ))}
                <span className="ml-auto text-xs font-mono text-stone-400 dark:text-stone-500">
                    {date}
                </span>
            </div>

            {/* Arrow icon */}
            <ArrowUpRight className="absolute top-8 right-8 w-5 h-5 opacity-0 group-hover/feature:opacity-100 transition-all duration-300 text-accent-caramel z-10" />
        </motion.a>
    );
};

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

            <main className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-40 md:pt-48 pb-0">
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

                {/* ─── CONTENT GRID ─── */}
                <div className="grid grid-cols-1 md:grid-cols-2 relative z-10">
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
                        className="py-20 text-center text-stone-400 dark:text-stone-500 font-light"
                    >
                        No entries found for this category.
                    </motion.div>
                )}
            </main>
            <Footer />
        </div>
    );
}
