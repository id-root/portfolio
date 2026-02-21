"use client";

import { Shield, Terminal, Code2, Server, ChevronDown } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { HoloCard } from "@/components/ui/holo-card";
import { useRef } from "react";

/* ── Stagger container + child variants (bi-directional) ── */
const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const fadeSlideUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.85, y: 100 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};

/* ══════════════════════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════════════════════ */
export default function AboutPage() {
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress: heroProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });
    const heroOpacity = useTransform(heroProgress, [0, 0.7], [1, 0]);
    const heroScale = useTransform(heroProgress, [0, 0.7], [1, 0.92]);
    const heroY = useTransform(heroProgress, [0, 1], [0, -120]);

    return (
        <div className="min-h-screen selection:bg-red-500 selection:text-white overflow-hidden relative transition-colors duration-300">
            {/* Ambient Glow */}
            <div className="fixed top-20 left-1/2 -translate-x-1/2 w-[90vw] h-[90vw] md:w-[600px] md:h-[600px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none" />

            <main className="relative z-10 w-full">
                {/* ─── 1. HERO — Sticky Full-Screen with Scroll Fade ─── */}
                <div ref={heroRef} className="h-[140vh] relative">
                    <motion.div
                        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
                        className="h-screen sticky top-0 flex flex-col items-center justify-center p-6 bg-background"
                    >
                        {/* Decorative ring */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 0.08, scale: 1 }}
                            transition={{ duration: 2, ease: "easeOut" }}
                            className="absolute w-[min(70vw,500px)] h-[min(70vw,500px)] rounded-full border border-stone-400 dark:border-white/20"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.3 }}
                            animate={{ opacity: 0.04, scale: 1 }}
                            transition={{ duration: 2.5, ease: "easeOut", delay: 0.3 }}
                            className="absolute w-[min(90vw,700px)] h-[min(90vw,700px)] rounded-full border border-stone-300 dark:border-white/10"
                        />

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-sm uppercase tracking-[0.4em] text-stone-400 dark:text-stone-500 mb-8 font-sans"
                        >
                            About
                        </motion.p>

                        <motion.h1
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-center max-w-5xl mx-auto leading-[1.15] text-transparent bg-clip-text bg-gradient-to-b from-stone-900 via-stone-700 to-stone-400 dark:from-white dark:via-stone-300 dark:to-stone-500 font-bold"
                        >
                            Hii I am Vector.
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.8 }}
                            className="mt-6 text-lg md:text-xl text-stone-500 dark:text-stone-400 text-center max-w-2xl font-sans leading-relaxed"
                        >
                            Waiting for AGI… Exploring cybersecurity, automation, and open‑source
                            learning — not to arrive, but to continue.
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

                {/* ─── 2. NARRATIVE INTRO — Line-by-Line Reveal ─── */}
                <NarrativeSection />

                {/* ─── 3. ARSENAL — Staggered Columns ─── */}
                <ArsenalSection />

                {/* ─── 4. ACCOMPLISHMENTS — Parallax Cards ─── */}
                <AccomplishmentsSection />

                {/* ─── 5. CLOSING STATEMENT ─── */}
                <ClosingSection />
            </main>
        </div>
    );
}

/* ══════════════════════════════════════════════════
   NARRATIVE INTRO — bi-directional
   ══════════════════════════════════════════════════ */
function NarrativeSection() {
    const lines = [
        "I break things to understand how they work.",
        "I write exploits, then build the defenses against them.",
        "Systems-level thinking. Red-team mindset. Open-source ethos.",
        "Every line of code is a question — every vulnerability, an answer.",
    ];

    return (
        <section className="relative py-32 md:py-48 px-6">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.3 }}
                    className="space-y-8"
                >
                    {lines.map((line, i) => (
                        <motion.p
                            key={i}
                            variants={fadeSlideUp}
                            className={`text-xl md:text-2xl lg:text-3xl font-serif leading-relaxed ${i === 0
                                    ? "text-stone-900 dark:text-white font-bold"
                                    : "text-stone-600 dark:text-stone-400"
                                }`}
                        >
                            {line}
                        </motion.p>
                    ))}
                </motion.div>
            </div>

            {/* Decorative horizontal line */}
            <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                className="mt-24 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-stone-400 dark:via-stone-600 to-transparent origin-center"
            />
        </section>
    );
}

/* ══════════════════════════════════════════════════
   ARSENAL — bi-directional with whileInView
   ══════════════════════════════════════════════════ */
function ArsenalSection() {
    const columns = [
        {
            icon: <Terminal className="w-6 h-6" />,
            title: "Offensive Operations",
            items: [
                { name: "METASPLOIT", color: "bg-red-500" },
                { name: "IMPACKET", color: "bg-orange-500" },
                { name: "EVIL-WINRM", color: "bg-red-700" },
                { name: "NMAP", color: "bg-stone-700" },
                { name: "GHIDRA", color: "bg-stone-800" },
                { name: "BURP SUITE", color: "bg-stone-700" },
                { name: "WIRESHARK", color: "bg-stone-700" },
            ],
        },
        {
            icon: <Code2 className="w-6 h-6" />,
            title: "Programming Languages",
            items: [
                { name: "C", color: "bg-blue-600", tag: "ELITE" },
                { name: "RUST", color: "bg-orange-600", tag: "SYSTEMS" },
                { name: "PYTHON", color: "bg-blue-500", tag: "ELITE" },
                { name: "BASH", color: "bg-stone-700", tag: "SHELL" },
                { name: "ASSEMBLY", color: "bg-stone-800", tag: "X86_64" },
            ],
        },
        {
            icon: <Server className="w-6 h-6" />,
            title: "Infrastructure & Workflow",
            items: [
                { name: "ARCH LINUX", color: "bg-stone-700", tag: "MASTER" },
                { name: "NEOVIM(LUA)", color: "bg-stone-700", tag: "CONFIGURED" },
                { name: "DOCKER", color: "bg-stone-700", tag: "BEGINNER" },
                { name: "VIRTUALBOX", color: "bg-stone-700", tag: "LABS" },
                { name: "TRYHACKME", color: "bg-red-800" },
            ],
        },
    ];

    return (
        <section className="relative py-24 md:py-32 px-6">
            <div className="max-w-5xl mx-auto">
                {/* Section title */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-red-500/20 bg-red-500/5 mb-6">
                        <Shield className="w-5 h-5 text-red-500" />
                        <span className="text-sm uppercase tracking-widest text-red-500 font-sans font-medium">Arsenal</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 dark:text-white">
                        Tools of the Trade
                    </h2>
                </motion.div>

                {/* Columns — each column animates in/out independently */}
                <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                    {columns.map((col, colIdx) => (
                        <motion.div
                            key={col.title}
                            initial={{ opacity: 0, y: 80 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.2 }}
                            transition={{
                                duration: 0.7,
                                ease: [0.22, 1, 0.36, 1],
                                delay: colIdx * 0.15,
                            }}
                        >
                            <div className="glass-panel p-6 md:p-8 rounded-[2rem] h-full">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2.5 rounded-xl bg-red-500/10 text-red-500">
                                        {col.icon}
                                    </div>
                                    <h3 className="text-lg font-bold text-stone-900 dark:text-white">
                                        {col.title}
                                    </h3>
                                </div>

                                <div className="space-y-3">
                                    {col.items.map((item) => (
                                        <div
                                            key={item.name}
                                            className="flex items-center gap-2 flex-wrap"
                                        >
                                            <span className={`px-3 py-1.5 ${item.color} text-white text-xs font-bold rounded`}>
                                                {item.name}
                                            </span>
                                            {item.tag && (
                                                <span className="px-2 py-1 bg-stone-200/60 dark:bg-white/10 text-stone-600 dark:text-stone-400 text-xs font-medium rounded">
                                                    {item.tag}
                                                </span>
                                            )}
                                        </div>
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

/* ══════════════════════════════════════════════════
   ACCOMPLISHMENTS — bi-directional
   ══════════════════════════════════════════════════ */
function AccomplishmentsSection() {
    const accomplishments = [
        { image: "/badges/aoc2024.png", title: "Advent of Cyber 2024", desc: "Completed TryHackMe's annual event" },
        { image: "/badges/aoc2025.png", title: "Advent of Cyber 2025", desc: "Completed TryHackMe's annual event" },
        { image: "/badges/sidequest.png", title: "Advent of Cyber Side Quest 2025", desc: "Completed advanced challenge track" },
        { image: "/badges/pentest101.png", title: "Penetration 101", desc: "Foundations of penetration testing" },
        { image: "/badges/osint.png", title: "OSINT", desc: "Open-source intelligence gathering" },
        { image: "/badges/apihacking.png", title: "API Hacking", desc: "API security testing methodology" },
    ];

    return (
        <section className="relative py-24 md:py-32 px-6">
            <div className="max-w-5xl mx-auto">
                {/* Section title */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-stone-400/20 dark:border-white/10 bg-stone-100/50 dark:bg-white/5 mb-6">
                        <Shield className="w-5 h-5 text-stone-500 dark:text-stone-400" />
                        <span className="text-sm uppercase tracking-widest text-stone-500 dark:text-stone-400 font-sans font-medium">Accomplishments</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 dark:text-white">
                        Milestones & Certifications
                    </h2>
                </motion.div>

                {/* Cards */}
                <div className="flex flex-col gap-12 md:gap-16">
                    {accomplishments.map((item, idx) => (
                        <AccomplishmentCard
                            key={item.title}
                            {...item}
                            index={idx}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function AccomplishmentCard({ image, title, desc, index }: { image: string; title: string; desc: string; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"],
    });

    // Parallax: badge image shifts up slightly slower than the card
    const imgY = useTransform(scrollYProgress, [0, 1], [30, -30]);
    const isEven = index % 2 === 0;

    return (
        <motion.div
            ref={cardRef}
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="w-full"
        >
            <HoloCard className="rounded-[2.5rem] overflow-hidden">
                {/* Accent stripe */}
                <div className={`absolute top-0 bottom-0 ${isEven ? 'left-0' : 'right-0'} w-1.5 bg-gradient-to-b from-red-500 via-red-500/60 to-transparent`} />

                <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-12 p-8 md:p-12 lg:p-16 min-h-[220px]`}>
                    <motion.div
                        style={{ y: imgY }}
                        className="w-[100px] md:w-[130px] lg:w-[160px] h-[100px] md:h-[130px] lg:h-[160px] relative flex-shrink-0"
                    >
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-contain drop-shadow-lg"
                            unoptimized
                        />
                    </motion.div>

                    <div className={`flex-1 ${isEven ? 'text-center md:text-left' : 'text-center md:text-right'}`}>
                        <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold text-stone-900 dark:text-white mb-4 leading-tight">
                            {title}
                        </h4>
                        <p className="text-lg md:text-xl text-stone-500 dark:text-stone-400">{desc}</p>
                    </div>
                </div>
            </HoloCard>
        </motion.div>
    );
}

/* ══════════════════════════════════════════════════
   CLOSING STATEMENT — bi-directional
   ══════════════════════════════════════════════════ */
function ClosingSection() {
    return (
        <section className="relative py-32 md:py-48 px-6">
            <div className="max-w-3xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                    <p className="text-3xl md:text-4xl lg:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-stone-800 via-stone-600 to-stone-400 dark:from-white dark:via-stone-300 dark:to-stone-500 font-bold leading-[1.2]">
                        The journey doesn&apos;t end — <br className="hidden md:block" />
                        it evolves.
                    </p>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: false, amount: 0.5 }}
                        transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-10 mx-auto w-16 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent origin-center"
                    />
                </motion.div>
            </div>
        </section>
    );
}
