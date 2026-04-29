"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
    StarSparkle,
    ScribbleUnderline,
    SquiggleDivider,
    SVGWriteupCard,
} from "@/components/doodles";

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
    isLastOdd,
}: {
    title: string;
    category: string;
    date: string;
    tags: string[];
    summary: string;
    link: string;
    index: number;
    totalItems: number;
    isLastOdd?: boolean;
}) => {
    return (
        <motion.a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View writeup: ${title}`}
            layout
            className={cn(
                "block cursor-pointer",
                isLastOdd && "md:col-span-2"
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
            whileHover={{ y: -6, scale: 1.02 }}
        >
            {isLastOdd ? (
                <>
                    <div className="hidden md:block h-full">
                        <SVGWriteupCard title={title} category={category} tags={tags} summary={summary} seed={index + 10} wide={true} />
                    </div>
                    <div className="block md:hidden h-full">
                        <SVGWriteupCard title={title} category={category} tags={tags} summary={summary} seed={index + 10} wide={false} />
                    </div>
                </>
            ) : (
                <SVGWriteupCard title={title} category={category} tags={tags} summary={summary} seed={index + 10} wide={false} />
            )}
        </motion.a>
    );
};

export default function WriteupsPage() {
    const [activeFilter, setActiveFilter] = useState("All");

    const filteredWriteups = activeFilter === "All"
        ? writeups
        : writeups.filter(post => post.category === activeFilter);

    const tabs = ["All", "Research", "Write-up"];

    return (
        <div className="min-h-screen selection:bg-accent-caramel selection:text-white transition-colors duration-500 font-gamja overflow-x-hidden w-full relative">

            {/* Ambient Lighting */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[60vw] min-w-[300px] h-[60vw] min-h-[300px] rounded-full bg-brand-primary/5 blur-[140px]" />
            </div>

            <main className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-40 md:pt-48 pb-0">

                {/* Header */}
                <header className="mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="relative"
                    >
                        {/* Doodle: Sparkle stars near heading */}
                        <div className="absolute -top-6 right-4 md:right-0">
                            <StarSparkle size={50} color="var(--brand-accent)" delay={0.6} />
                        </div>
                        <h1 className="text-5xl md:text-7xl font-gamja text-text-primary font-medium tracking-tight mb-2">
                            Library
                        </h1>
                        {/* Doodle: Scribble underline */}
                        <ScribbleUnderline width={160} color="var(--brand-accent)" className="mb-6" delay={0.4} />
                        <p className="text-lg md:text-xl text-text-secondary font-light max-w-2xl leading-relaxed">
                            A curated collection of deep-dive research papers and detailed CTF methodologies.
                        </p>
                    </motion.div>
                </header>

                {/* Tabs */}
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

                {/* Doodle: Squiggle divider between tabs and content */}
                <div className="mb-10">
                    <SquiggleDivider color="var(--brand-accent)" delay={0.6} />
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                    <AnimatePresence mode="popLayout">
                        {filteredWriteups.map((post, idx) => {
                            const isLastOdd =
                                filteredWriteups.length % 2 !== 0 &&
                                idx === filteredWriteups.length - 1;

                            return (
                                <WriteupCard
                                    key={post.title}
                                    {...post}
                                    index={idx}
                                    totalItems={filteredWriteups.length}
                                    isLastOdd={isLastOdd}
                                />
                            );
                        })}
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
