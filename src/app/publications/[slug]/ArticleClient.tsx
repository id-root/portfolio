'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import DynamicIslandTOC from '@/components/DynamicIslandTOC';
import { writeupsMeta } from '@/lib/writeups-data';

interface WriteupMeta {
    slug: string;
    title: string;
    category: string;
    tags: string[];
    description: string;
    readTime: string;
    date: string;
    difficulty: string;
}

interface ArticleClientProps {
    meta: WriteupMeta;
    markdownSections: { title: string; content: string }[];
}

/* ─── Animated mesh background for hero ─── */
function HeroMesh() {
    const [nodes, setNodes] = useState<{ id: number; x: number; y: number; delay: number }[]>([]);
    const [lines, setLines] = useState<{ x1: number; y1: number; x2: number; y2: number; delay: number }[]>([]);

    useEffect(() => {
        const generatedNodes = Array.from({ length: 15 }, (_, i) => ({
            id: i,
            x: 10 + Math.random() * 80,
            y: 10 + Math.random() * 80,
            delay: Math.random() * 4,
        }));

        const generatedLines: { x1: number; y1: number; x2: number; y2: number; delay: number }[] = [];
        for (let i = 0; i < generatedNodes.length; i++) {
            for (let j = i + 1; j < generatedNodes.length; j++) {
                const dx = generatedNodes[i].x - generatedNodes[j].x;
                const dy = generatedNodes[i].y - generatedNodes[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 35) {
                    generatedLines.push({
                        x1: generatedNodes[i].x,
                        y1: generatedNodes[i].y,
                        x2: generatedNodes[j].x,
                        y2: generatedNodes[j].y,
                        delay: Math.random() * 2,
                    });
                }
            }
        }

        setNodes(generatedNodes);
        setLines(generatedLines);
    }, []);

    return (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Connection lines */}
            {lines.map((l, i) => (
                <motion.line
                    key={`line-${i}`}
                    x1={`${l.x1}%`} y1={`${l.y1}%`}
                    x2={`${l.x2}%`} y2={`${l.y2}%`}
                    stroke="rgba(213,192,170,0.12)"
                    strokeWidth="0.15"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2, delay: l.delay, ease: 'easeOut' }}
                />
            ))}
            {/* Nodes */}
            {nodes.map((n) => (
                <motion.circle
                    key={`node-${n.id}`}
                    cx={`${n.x}%`} cy={`${n.y}%`}
                    r="0.4"
                    fill="rgba(213,192,170,0.25)"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                        duration: 4,
                        delay: n.delay,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </svg>
    );
}

/* ─── Next/Previous Article Card ─── */
function ArticleNavCard({ article, direction }: { article: typeof writeupsMeta[0]; direction: 'prev' | 'next' }) {
    return (
        <Link
            href={`/publications/${article.slug}`}
            className="group flex-1 block p-5 rounded-xl border border-[var(--color-primary)]/20 dark:border-[var(--color-primary)]/10 bg-white/50 dark:bg-white/[0.02] backdrop-blur-sm hover:border-[var(--color-primary)]/50 hover:shadow-xl transition-all duration-300"
        >
            <div className={`flex items-center gap-2 mb-2 text-xs text-slate-400 font-semibold uppercase tracking-widest ${direction === 'next' ? 'justify-end' : ''}`}>
                {direction === 'prev' && <span className="material-symbols-outlined text-sm">arrow_back</span>}
                {direction === 'prev' ? 'Previous' : 'Next'}
                {direction === 'next' && <span className="material-symbols-outlined text-sm">arrow_forward</span>}
            </div>
            <h4
                className={`text-sm font-bold text-[var(--color-emerald-900)] dark:text-white group-hover:text-[var(--color-emerald-800)] dark:group-hover:text-[var(--color-primary)] transition-colors ${direction === 'next' ? 'text-right' : ''}`}
                style={{ fontFamily: 'var(--font-serif)' }}
            >
                {article.title}
            </h4>
            <p className={`text-[11px] text-slate-400 mt-1 ${direction === 'next' ? 'text-right' : ''}`}>
                {article.category}
            </p>
        </Link>
    );
}

export default function ArticleClient({ meta, markdownSections }: ArticleClientProps) {
    const [activeTab, setActiveTab] = useState(0);

    // Smooth reading progress
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Get prev/next articles
    const currentIndex = writeupsMeta.findIndex(w => w.slug === meta.slug);
    const prevArticle = currentIndex > 0 ? writeupsMeta[currentIndex - 1] : null;
    const nextArticle = currentIndex < writeupsMeta.length - 1 ? writeupsMeta[currentIndex + 1] : null;

    return (
        <div className="writeup-page-font">
        <DynamicIslandTOC refreshKey={activeTab}>
            {/* Reading Progress Bar - Fixed at top of viewport */}
            <div className="fixed top-0 left-0 w-full h-[4px] bg-transparent z-[99999]">
                <motion.div
                    className="h-full bg-gradient-to-r from-[var(--color-emerald-800)] via-[var(--color-gold)] to-[var(--color-primary)] dark:from-[var(--color-primary)] dark:via-[var(--color-gold)] dark:to-[var(--color-emerald-800)] origin-left"
                    style={{ scaleX, boxShadow: '0 0 8px rgba(191,161,95,0.5), 0 0 2px rgba(191,161,95,0.3)' }}
                />
            </div>

            <div>
                <main className="pt-24 pb-20">
                {/* Hero Banner — Animated mesh background */}
                <div className="max-w-[900px] mx-auto px-6 mb-12">
                    <motion.div
                        className="relative w-full rounded-2xl overflow-hidden shadow-2xl shadow-black/20 dark:shadow-black/50 group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-emerald-800)] to-[var(--color-emerald-900)]">
                            <div className="absolute inset-0 opacity-20 grain-overlay mix-blend-overlay pointer-events-none" />
                            {/* Animated mesh network */}
                            <HeroMesh />
                            <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[var(--color-primary)]/5 -translate-y-1/2 translate-x-1/4" />
                            <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-[var(--color-gold)]/5 translate-y-1/3 -translate-x-1/4" />
                        </div>

                        <div className="relative z-10 px-8 sm:px-12 py-12 sm:py-16 flex flex-col justify-end min-h-[280px] sm:min-h-[320px]">
                            {/* Top row: Category + Difficulty — animated entrance */}
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="flex items-center gap-3 mb-6 flex-wrap"
                            >
                                <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/15 text-white/90 uppercase tracking-wider backdrop-blur-sm">
                                    {meta.category}
                                </span>
                                {meta.difficulty && (
                                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-[var(--color-gold)]/20 text-[var(--color-gold)] uppercase tracking-wider">
                                        {meta.difficulty}
                                    </span>
                                )}
                            </motion.div>

                            {/* Title — typewriter-style slide-in */}
                            <motion.h1
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4, duration: 0.7, type: 'spring', stiffness: 60 }}
                                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6"
                                style={{ fontFamily: 'var(--font-serif)' }}
                            >
                                {meta.title}
                            </motion.h1>

                            {/* Tags — staggered entrance */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.7, duration: 0.5 }}
                                className="flex flex-wrap gap-2 mb-8"
                            >
                                {meta.tags.slice(0, 4).map((tag, i) => (
                                    <motion.span
                                        key={tag}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.8 + i * 0.1, type: 'spring' }}
                                        className="text-[11px] px-2.5 py-1 rounded-full bg-white/10 text-white/70 font-medium backdrop-blur-sm"
                                    >
                                        {tag}
                                    </motion.span>
                                ))}
                            </motion.div>

                            {/* Bottom row: Author + Date + Read time */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9, duration: 0.5 }}
                                className="flex items-center gap-4 pt-6 border-t border-white/10"
                            >
                                <div className="w-10 h-10 rounded-full bg-white/15 ring-2 ring-[var(--color-primary)]/30 flex items-center justify-center backdrop-blur-sm">
                                    <span className="text-white font-bold text-sm" style={{ fontFamily: 'var(--font-serif)' }}>R</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-white/90">Researcher</span>
                                    <span className="text-xs text-white/50 font-medium">{meta.date}</span>
                                </div>
                                <div className="ml-auto flex items-center gap-1.5 text-xs text-white/50 font-medium">
                                    <span className="material-symbols-outlined text-sm">schedule</span>
                                    {meta.readTime}
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* Multi-part tabs (if more than 1 section) */}
                {markdownSections.length > 1 && (
                    <div className="max-w-[900px] mx-auto px-6 mb-8">
                        <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-2">
                            {markdownSections.map((section, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        setActiveTab(idx);
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${activeTab === idx
                                        ? 'bg-[var(--color-emerald-800)] text-white shadow-lg'
                                        : 'bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10'
                                        }`}
                                >
                                    {section.title}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Centered Content — Single Column */}
                <div className="max-w-[900px] mx-auto px-6">
                    <article className="min-w-0 w-full prose-article-container">
                        <MarkdownRenderer content={markdownSections[activeTab].content} />

                        {/* Tags */}
                        <div className="mt-12 pt-8 border-t border-[var(--color-primary)]/20 flex flex-wrap gap-4">
                            {meta.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-[var(--color-primary)]/20 hover:text-[var(--color-emerald-900)] dark:hover:text-[var(--color-primary)] transition-colors cursor-pointer"
                                >
                                    #{tag.replace(/\s+/g, '')}
                                </span>
                            ))}
                        </div>

                        {/* ─── Next / Previous Article Navigation ─── */}
                        {(prevArticle || nextArticle) && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="mt-16 pt-8 border-t border-[var(--color-primary)]/20"
                            >
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">
                                    Continue Reading
                                </p>
                                <div className="flex gap-4">
                                    {prevArticle && <ArticleNavCard article={prevArticle} direction="prev" />}
                                    {/* Spacer when only one card */}
                                    {!prevArticle && <div className="flex-1" />}
                                    {nextArticle && <ArticleNavCard article={nextArticle} direction="next" />}
                                </div>
                            </motion.div>
                        )}
                    </article>
                </div>
            </main>
            </div>
        </DynamicIslandTOC>
        </div>
    );
}
