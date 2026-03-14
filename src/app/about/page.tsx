"use client";

import { motion } from "framer-motion";
import { SparklesCore } from "@/components/ui/sparkles";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { AwardsVariant } from "@/components/ui/awards-variant";

/* ── Stagger container + child variants ── */
const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};

const fadeRight = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

/* ══════════════════════════════════════════════════
   ABOUT PAGE
   ══════════════════════════════════════════════════ */
export default function AboutPage() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);
    const isDark = mounted && resolvedTheme === "dark";

    return (
        <div className="min-h-screen selection:bg-accent-caramel selection:text-white transition-colors duration-500 font-sans">
            {/* Ambient Background Blur */}
            <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-accent-caramel/5 dark:bg-accent-caramel/5 blur-[120px] pointer-events-none" />
            
            {/* Dark-mode-only Sparkles */}
            {isDark && (
                <div className="fixed inset-0 w-full h-full z-0 pointer-events-none opacity-40">
                    <SparklesCore
                        id="about-sparkles"
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

            <main className="relative z-10 w-full">
                {/* ─── PREMIUM HERO / NARRATIVE ─── */}
                <section className="pt-40 md:pt-48 pb-20 px-6 max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-[1fr_1fr] gap-16 lg:gap-24 items-start">
                        {/* Left Side: Massive Clean Typography */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-stone-900 dark:text-white font-medium tracking-tight leading-[1.05] mb-8">
                                Learning <br/> systems, <br/> building <br/> intelligent defenses.
                            </h1>
                            <div className="h-px w-24 bg-accent-caramel/50 mb-8" />
                            <p className="text-lg md:text-xl text-stone-500 dark:text-stone-400 font-light leading-relaxed max-w-md">
                                Investigating systems, vulnerabilities, and intelligent defenses.
                            </p>
                        </motion.div>

                        {/* Right Side: Narrative Points (Apple minimalist style) */}
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                            className="space-y-12 lg:mt-12"
                        >
                            {[
                                {
                                    num: "1",
                                    title: "Offensive Security",
                                    text: "Exploring vulnerabilities, exploit development & Malware Development."
                                },
                                {
                                    num: "2",
                                    title: "Secure Systems",
                                    text: "Learning how resilient architectures are designed and defended."
                                },
                                {
                                    num: "3",
                                    title: "Continuous Exploration",
                                    text: "Reverse engineering, AI research, and deep technical curiosity."
                                }
                            ].map((item, i) => (
                                <motion.div key={i} variants={fadeUp} className="flex gap-6 group">
                                    <div className="text-sm font-mono text-accent-caramel pt-1">
                                        {item.num}
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-serif text-stone-900 dark:text-white mb-2 group-hover:text-accent-caramel transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-stone-500 dark:text-stone-400 font-light leading-relaxed">
                                            {item.text}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* ─── ARSENAL (REFINED BENTO GRID) ─── */}
                <ArsenalSection />

                {/* ─── LOOPING ACCOMPLISHMENTS ─── */}
                <section className="pt-12 pb-0 px-4">
                    <div className="max-w-7xl mx-auto text-center mb-8">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-stone-900 dark:text-white mb-4"
                        >
                            Milestones & Certifications
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-stone-500 dark:text-stone-400 font-light"
                        >
                            The path of continuous learning
                        </motion.p>
                    </div>
                    
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                    >
                        <AwardsVariant />
                    </motion.div>
                </section>
            </main>
        </div>
    );
}

/* ══════════════════════════════════════════════════
   ARSENAL (Bento Grid Style)
   ══════════════════════════════════════════════════ */
function ArsenalSection() {
    const categories = [
        {
            title: "Offensive Operations",
            desc: "Exploitation and enumeration toolkits",
            items: ["Metasploit", "Impacket", "Evil-WinRM", "Nmap", "Ghidra", "Burp Suite", "Wireshark"],
            cols: "md:col-span-2 lg:col-span-2",
        },
        {
            title: "Programming",
            desc: "Low-level and scripting languages",
            items: ["C (Elite)", "Rust (Systems)", "Python (Elite)", "Bash", "x86_64 Assembly"],
            cols: "md:col-span-1 lg:col-span-1",
            darkStyle: true
        },
        {
            title: "Infrastructure",
            desc: "Environments and containers",
            items: ["Arch Linux", "Neovim (Lua)", "Docker", "VirtualBox", "TryHackMe"],
            cols: "md:col-span-3 lg:col-span-3",
            horizontal: true
        },
    ];

    return (
        <section className="py-24 px-6 border-y border-stone-100 dark:border-stone-800/50 bg-stone-50/50 dark:bg-[#0c0b0a]/50">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif font-medium text-stone-900 dark:text-white">
                        Technical Arsenal
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {categories.map((cat, idx) => (
                        <motion.div
                            key={cat.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            className={`p-8 rounded-3xl border transition-all duration-300 ${
                                cat.darkStyle 
                                    ? "bg-accent-caramel text-white border-transparent shadow-lg shadow-accent-caramel/20" 
                                    : "bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800/80 hover:border-accent-caramel/30 dark:hover:border-accent-caramel/30"
                            } ${cat.cols}`}
                        >
                            <div className={`flex flex-col h-full ${cat.horizontal ? "md:flex-row md:items-center md:gap-12" : ""}`}>
                                <div className={`${cat.horizontal ? "md:w-1/3 mb-6 md:mb-0" : "mb-8 "}`}>
                                    <h3 className={`text-2xl font-serif font-medium mb-2 ${cat.darkStyle ? "text-white" : "text-stone-900 dark:text-white"}`}>
                                        {cat.title}
                                    </h3>
                                    <p className={`text-sm font-light ${cat.darkStyle ? "text-white/80" : "text-stone-500 dark:text-stone-400"}`}>
                                        {cat.desc}
                                    </p>
                                </div>
                                <div className={`flex flex-wrap gap-2 ${cat.horizontal ? "md:flex-1" : ""}`}>
                                    {cat.items.map(item => (
                                        <span 
                                            key={item} 
                                            className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide ${
                                                cat.darkStyle 
                                                    ? "bg-white/10 text-white border border-white/20" 
                                                    : "bg-stone-100 dark:bg-black/40 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800"
                                            }`}
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
