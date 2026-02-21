"use client";
import { useState } from "react";

import { BookOpen, ExternalLink, Calendar, ChevronDown } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/* ── Stagger variants (bi-directional) ── */
const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const fadeSlideUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function WriteupsPage() {
    const [activeFilter, setActiveFilter] = useState("All");
    const heroRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress: heroProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });
    const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);
    const heroScale = useTransform(heroProgress, [0, 0.8], [1, 0.95]);
    const heroY = useTransform(heroProgress, [0, 1], [0, -80]);

    const writeups = [
        {
            title: "Anti-Debugging",
            category: "Research",
            date: "Feb 01, 2026",
            tags: ["Reverse Enginnering", "Malware Analysis"],
            summary: "A comprehensive user-space anti-debugging framework implementing 8 distinct detection techniques spanning timing analysis, memory integrity verification, CPU exception handling, and kernel observer comparison.",
            link: "https://library-id-root.vercel.app/publications/anti-debug-framework"
        },
        {
            title: "BreachBlocker-Unlocker",
            category: "Write-up",
            date: "Dec 25, 2025",
            tags: ["Web Exploitation", "Authentication Bypass"],
            summary: "Extract multiple flags from different apps by chaining enumeration, logic flaws, and authentication bypass techniques to recover stolen funds.",
            link: "https://library-id-root.vercel.app/publications/breachblocker-unlocker"
        },
        {
            title: "Carrotbane-of-My-Existence",
            category: "Write-up",
            date: "Dec 20, 2025",
            tags: ["AI", "SMTP"],
            summary: "Understanding AI-powered applications, and chaining creative vulnerability discovery techniques.",
            link: "https://library-id-root.vercel.app/publications/carrotbane-of-my-existence"
        },
        {
            title: "Scheme-Catcher",
            category: "Write-up",
            date: "Dec 15, 2025",
            tags: ["Binary Exploitation", "Reverse Engeneering"],
            summary: "Extracting hidden flags from a stripped binary without execution. Walkthrough of dynamic analysis with gdb",
            link: "https://library-id-root.vercel.app/publications/scheme-catcher"
        },
        {
            title: "Hoppers-Origin",
            category: "Write-up",
            date: "Dec 10, 2025",
            tags: ["Privilege escalation", "Active Directory"],
            summary: "Initial reconnaissance phase. tracking the 'Hopper' entity across multiple platforms to find the entry point.",
            link: "https://library-id-root.vercel.app/publications/hoppers-origin"
        }
    ];

    const filteredWriteups = activeFilter === "All"
        ? writeups
        : writeups.filter(post => post.category === activeFilter);

    const tabs = ["All", "Research", "Write-up"];

    return (
        <div className="min-h-screen selection:bg-neon-purple selection:text-white overflow-hidden relative transition-colors duration-300">

            {/* Background Gradients */}
            <div className="fixed bottom-0 right-0 w-[800px] h-[800px] bg-red-500/5 rounded-full blur-[150px] pointer-events-none"></div>

            <main className="relative z-10 w-full">
                {/* ─── HERO — Sticky with Scroll Fade ─── */}
                <div ref={heroRef} className="h-[120vh] relative">
                    <motion.div
                        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
                        className="h-screen sticky top-0 flex flex-col items-center justify-center p-6 bg-background"
                    >
                        {/* Decorative ring */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 0.06, scale: 1 }}
                            transition={{ duration: 2, ease: "easeOut" }}
                            className="absolute w-[min(60vw,400px)] h-[min(60vw,400px)] rounded-full border border-red-400/30 dark:border-red-500/20"
                        />

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-sm uppercase tracking-[0.4em] text-stone-400 dark:text-stone-500 mb-6 font-sans"
                        >
                            Library
                        </motion.p>

                        <motion.h1
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-serif text-center font-bold tracking-tight mb-4"
                        >
                            Research & <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">Writeups</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="text-stone-600 dark:text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed text-center font-sans"
                        >
                            Detailed Research Papers & Write-Ups (CTFs).
                        </motion.p>

                        {/* Scroll indicator */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5, duration: 1 }}
                            className="absolute bottom-12 flex flex-col items-center gap-2"
                        >
                            <span className="text-xs uppercase tracking-widest text-stone-400 dark:text-stone-600 font-sans">Scroll</span>
                            <motion.div
                                animate={{ y: [0, 8, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <ChevronDown className="w-5 h-5 text-stone-400 dark:text-stone-600" />
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* ─── CONTENT ─── */}
                <div className="bg-background relative z-10 pb-20">
                    <div className="max-w-5xl mx-auto px-4 md:px-8">
                        {/* Filter Buttons — fade in */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.5 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="flex justify-center gap-4 mb-12 pt-12"
                        >
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveFilter(tab)}
                                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${activeFilter === tab
                                        ? "bg-red-600 text-white border-red-600 shadow-lg shadow-red-500/25"
                                        : "bg-white/5 text-stone-600 dark:text-slate-400 border-stone-200 dark:border-white/10 hover:bg-stone-100 dark:hover:bg-white/10"
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </motion.div>

                        {/* Cards — staggered scroll reveal */}
                        <motion.div
                            key={activeFilter}
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, amount: 0.1 }}
                            className="grid gap-6"
                        >
                            {filteredWriteups.map((post, i) => (
                                <WriteupCard key={post.title + activeFilter} post={post} index={i} />
                            ))}

                            {filteredWriteups.length === 0 && (
                                <motion.div
                                    variants={fadeSlideUp}
                                    className="text-center py-20 text-stone-500 dark:text-slate-500"
                                >
                                    No posts found for this category.
                                </motion.div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    );
}

/* ── Individual writeup card with scroll-driven parallax ── */
function WriteupCard({ post, index }: {
    post: { title: string; category: string; date: string; tags: string[]; summary: string; link: string };
    index: number;
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"],
    });
    const cardY = useTransform(scrollYProgress, [0, 0.5, 1], [40, 0, -20]);

    return (
        <motion.div
            ref={cardRef}
            variants={fadeSlideUp}
            style={{ y: cardY }}
        >
            <a
                href={post.link}
                target="_blank"
                className="group block glass-card p-8 rounded-2xl relative overflow-hidden transition-all duration-300 hover:scale-[1.01]"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-500/5 to-red-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${post.category === "Research"
                                ? "bg-purple-500/10 border-purple-500/30 text-purple-500"
                                : "bg-accent/10 border-accent/30 text-accent"
                                }`}>
                                {post.category}
                            </span>
                            <div className="flex items-center gap-1 text-stone-500 dark:text-slate-500 text-xs font-mono">
                                <Calendar className="w-3 h-3" />
                                {post.date}
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-3 group-hover:text-accent transition-colors">
                            {post.title}
                        </h2>

                        <p className="text-stone-600 dark:text-slate-400 leading-relaxed mb-6">
                            {post.summary}
                        </p>

                        <div className="flex gap-2 flex-wrap">
                            {post.tags.map(tag => (
                                <span key={tag} className="text-xs font-medium text-stone-500 dark:text-slate-400">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="mt-2 text-stone-400 dark:text-slate-500 group-hover:text-stone-900 dark:group-hover:text-white transition-colors">
                        <ExternalLink className="w-6 h-6" />
                    </div>
                </div>
            </a>
        </motion.div>
    );
}
