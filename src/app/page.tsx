'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import SkyWindow from '@/components/SkyWindow';
import { writeupsMeta } from '@/lib/writeups-data';

/* ─── Animated stats counter ─── */
function AnimatedStat({ value, label, icon, delay }: { value: string; label: string; icon: string; delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay, type: 'spring', stiffness: 80 }}
            whileHover={{ scale: 1.05, y: -4 }}
            className="text-center p-6 rounded-2xl border border-[var(--color-primary)]/20 dark:border-[var(--color-primary)]/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-xl shadow-lg hover:shadow-xl transition-shadow"
        >
            <span className="material-symbols-outlined text-2xl text-[var(--color-emerald-800)] dark:text-[var(--color-primary)] mb-2 block">
                {icon}
            </span>
            <div className="text-3xl font-bold text-[var(--color-emerald-800)] dark:text-white mb-1" style={{ fontFamily: 'var(--font-serif)' }}>
                {value}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-widest">
                {label}
            </div>
        </motion.div>
    );
}

/* ─── Floating particles background ─── */
function FloatingParticles() {
    const [particles, setParticles] = useState<any[]>([]);

    useEffect(() => {
        setParticles(Array.from({ length: 20 }).map(() => ({
            top: Math.random() * 100,
            left: Math.random() * 100,
            xAnim: Math.random() * 20 - 10,
            duration: 4 + Math.random() * 4,
            delay: Math.random() * 3,
        })));
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((p, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-[var(--color-primary)]/30 dark:bg-[var(--color-primary)]/20"
                    style={{
                        top: `${p.top}%`,
                        left: `${p.left}%`,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        x: [0, p.xAnim, 0],
                        opacity: [0.2, 0.6, 0.2],
                    }}
                    transition={{
                        duration: p.duration,
                        delay: p.delay,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    );
}

/* ─── Featured publication card ─── */
function FeaturedCard({ writeup, index }: { writeup: typeof writeupsMeta[0]; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: index * 0.15, type: 'spring', stiffness: 80 }}
        >
            <Link
                href={`/publications/${writeup.slug}`}
                className="group block rounded-2xl overflow-hidden border border-[var(--color-primary)]/20 dark:border-[var(--color-primary)]/10 bg-white/50 dark:bg-white/[0.02] backdrop-blur-sm hover:border-[var(--color-primary)]/50 hover:shadow-2xl hover:shadow-[var(--color-primary)]/10 transition-all duration-500"
            >
                {/* Gradient header bar */}
                <div className="h-2 bg-gradient-to-r from-[var(--color-emerald-800)] via-[var(--color-gold)] to-[var(--color-primary)]" />
                <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[var(--color-primary)]/15 text-[var(--color-emerald-800)] dark:text-[var(--color-primary)] uppercase tracking-wider">
                            {writeup.category}
                        </span>
                        {writeup.difficulty && (
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                {writeup.difficulty}
                            </span>
                        )}
                    </div>
                    <h3
                        className="text-lg font-bold mb-2 text-[var(--color-emerald-900)] dark:text-white group-hover:text-[var(--color-emerald-800)] dark:group-hover:text-[var(--color-primary)] transition-colors"
                        style={{ fontFamily: 'var(--font-serif)' }}
                    >
                        {writeup.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                        {writeup.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>{writeup.date}</span>
                        <span className="flex items-center gap-1 group-hover:text-[var(--color-emerald-800)] dark:group-hover:text-[var(--color-primary)] transition-colors">
                            Read more
                            <motion.span
                                className="inline-block"
                                animate={{ x: [0, 3, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                →
                            </motion.span>
                        </span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

export default function Home() {
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    });

    const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.7], [1, 0.95]);
    const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -80]);

    const latestWriteups = writeupsMeta.slice(0, 3);

    return (
        <div>
            {/* ═══════ HERO SECTION ═══════ */}
            <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
                <FloatingParticles />

                {/* Ambient blurs */}
                <motion.div
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--color-primary)]/5 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[var(--color-emerald-800)]/5 dark:bg-[var(--color-primary)]/3 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                />

                <motion.div style={{ opacity: heroOpacity, scale: heroScale, y: parallaxY }} className="relative z-10 w-full max-w-5xl mx-auto">
                    {/* Two-column: Text + Window */}
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">

                        {/* LEFT: Text content */}
                        <div className="flex-1 text-center lg:text-left">
                            {/* Subtitle */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                                className="text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase mb-8 text-[var(--color-gold)]"
                            >
                                A Curated Digital Archive
                            </motion.p>

                            {/* Title — letter-by-letter stagger */}
                            <motion.h1 className="mb-8">
                                <motion.span
                                    className="block text-5xl sm:text-6xl md:text-7xl lg:text-7xl font-bold text-[var(--color-emerald-950)] dark:text-white leading-[1.05] tracking-tight"
                                    style={{ fontFamily: 'var(--font-serif)' }}
                                    initial={{ opacity: 0, x: -40 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4, duration: 0.8, type: 'spring', stiffness: 60 }}
                                >
                                    The Knowledge
                                </motion.span>
                                <motion.span
                                    className="block text-5xl sm:text-6xl md:text-7xl lg:text-7xl font-bold italic text-[var(--color-emerald-950)] dark:text-[var(--color-primary)] leading-[1.05]"
                                    style={{ fontFamily: 'var(--font-serif)' }}
                                    initial={{ opacity: 0, x: -40 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.6, duration: 0.8, type: 'spring', stiffness: 60 }}
                                >
                                    Vault
                                </motion.span>
                            </motion.h1>

                            {/* Description */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 0.7 }}
                                className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed font-light"
                            >
                                A refined collection of research papers and deep-dive write-ups
                                designed for the intellectual explorer. Exploration without friction.
                            </motion.p>

                            {/* CTA */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1, duration: 0.6 }}
                            >
                                <Link
                                    href="/publications"
                                    className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[var(--color-emerald-800)] dark:bg-[var(--color-primary)] text-white dark:text-[var(--color-emerald-900)] font-semibold text-sm tracking-wider uppercase shadow-xl shadow-[var(--color-emerald-800)]/20 dark:shadow-[var(--color-primary)]/20 hover:shadow-2xl hover:scale-105 transition-all duration-300"
                                >
                                    Begin Exploration
                                    <motion.svg
                                        className="w-4 h-4"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        animate={{ x: [0, 4, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                                    >
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </motion.svg>
                                </Link>
                            </motion.div>
                        </div>

                        {/* RIGHT: Gothic Sky Window */}
                        <motion.div
                            className="flex-shrink-0"
                            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ delay: 0.5, duration: 1.2, type: 'spring', stiffness: 50, damping: 15 }}
                        >
                            <SkyWindow />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-10 left-1/2 -translate-x-1/2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    transition={{ delay: 2 }}
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                            <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </motion.div>
                </motion.div>
            </section>

            {/* ═══════ STATS SECTION ═══════ */}
            <section className="max-w-5xl mx-auto px-6 py-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <AnimatedStat value={`${writeupsMeta.length}`} label="Publications" icon="auto_stories" delay={0} />
                    <AnimatedStat value="15+" label="Flags Captured" icon="flag" delay={0.1} />
                    <AnimatedStat value="5+" label="Categories" icon="category" delay={0.2} />
                    <AnimatedStat value="CTF" label="Competitions" icon="emoji_events" delay={0.3} />
                </div>
            </section>

            {/* ═══════ CAPABILITIES SECTION ═══════ */}
            <section className="max-w-5xl mx-auto px-6 pb-20">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-14"
                >
                    <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-4 text-[var(--color-gold)]">
                        What You'll Find
                    </p>
                    <h2
                        className="text-3xl md:text-4xl font-bold text-[var(--color-emerald-950)] dark:text-white"
                        style={{ fontFamily: 'var(--font-serif)' }}
                    >
                        Research. Exploit. <span className="italic text-[var(--color-primary)]">Document.</span>
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: 'security',
                            title: 'Security Research',
                            desc: 'Deep-dive analyses of CTF challenges, vulnerability exploitation, and penetration testing methodologies.',
                        },
                        {
                            icon: 'terminal',
                            title: 'Technical Write-ups',
                            desc: 'Step-by-step walkthroughs of complex challenges including binary exploitation and network attacks.',
                        },
                        {
                            icon: 'school',
                            title: 'Knowledge Sharing',
                            desc: 'Documenting the journey of learning through hands-on exploration and problem-solving.',
                        },
                    ].map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.15, type: 'spring' }}
                            whileHover={{ scale: 1.03, y: -4 }}
                            className="p-8 rounded-2xl border border-[var(--color-primary)]/20 dark:border-[var(--color-primary)]/10 bg-white/50 dark:bg-white/[0.02] backdrop-blur-sm hover:border-[var(--color-primary)]/50 transition-all duration-300 group relative overflow-hidden"
                        >
                            {/* Accent left bar */}
                            <div className="absolute top-0 left-0 w-1 h-full bg-[var(--color-primary)] transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />

                            <span className="material-symbols-outlined text-3xl text-[var(--color-emerald-800)] dark:text-[var(--color-primary)] mb-4 block group-hover:scale-110 transition-transform">
                                {item.icon}
                            </span>
                            <h3
                                className="text-lg font-bold mb-2 text-[var(--color-emerald-900)] dark:text-white"
                                style={{ fontFamily: 'var(--font-serif)' }}
                            >
                                {item.title}
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ═══════ LATEST PUBLICATIONS SECTION ═══════ */}
            <section className="max-w-5xl mx-auto px-6 pb-24">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex items-end justify-between mb-10"
                >
                    <div>
                        <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-3 text-[var(--color-gold)]">
                            Latest
                        </p>
                        <h2
                            className="text-3xl md:text-4xl font-bold text-[var(--color-emerald-950)] dark:text-white"
                            style={{ fontFamily: 'var(--font-serif)' }}
                        >
                            Recent Publications
                        </h2>
                    </div>
                    <Link
                        href="/publications"
                        className="hidden sm:flex items-center gap-2 text-sm font-semibold text-[var(--color-emerald-800)] dark:text-[var(--color-primary)] hover:gap-3 transition-all duration-300"
                    >
                        View All
                        <span className="material-symbols-outlined text-lg">arrow_forward</span>
                    </Link>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6">
                    {latestWriteups.map((w, i) => (
                        <FeaturedCard key={w.slug} writeup={w} index={i} />
                    ))}
                </div>

                {/* Mobile "View all" */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="sm:hidden mt-8 text-center"
                >
                    <Link
                        href="/publications"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-emerald-800)] dark:text-[var(--color-primary)]"
                    >
                        View All Publications
                        <span className="material-symbols-outlined text-lg">arrow_forward</span>
                    </Link>
                </motion.div>
            </section>
        </div>
    );
}
