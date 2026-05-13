"use client";

import { motion } from "framer-motion";
import { AwardsVariant } from "@/components/ui/awards-variant";
import { LoopCircle, SquiggleDivider, StarSparkle, ScribbleUnderline } from "@/components/doodles";

/* ── Stagger container + child variants ── */
const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};

/* ══════════════════════════════════════════════════
   ABOUT PAGE
   ══════════════════════════════════════════════════ */
export default function AboutPage() {
    return (
        <div className="min-h-screen transition-colors duration-500 font-gamja">
            {/* Ambient Background Blur */}
            <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-brand-primary/5 blur-[120px] pointer-events-none" />

            <main className="relative z-10 w-full">
                {/* ─── PREMIUM HERO / NARRATIVE ─── */}
                <section className="pt-40 md:pt-48 pb-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-[1fr_1fr] gap-16 lg:gap-24 items-start">
                        {/* Left Side: Massive Clean Typography */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            className="relative"
                        >
                            {/* Doodle: Sparkle near heading */}
                            <div className="absolute -top-6 right-0 lg:-right-8">
                                <StarSparkle size={40} color="var(--brand-accent)" delay={0.8} />
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-gamja text-text-primary font-medium tracking-tight leading-[1.05] mb-4">
                                Learning <br/> systems, <br/> building <br/> intelligent defenses.
                            </h1>
                            {/* Doodle: Scribble underline replacing the static bar */}
                            <ScribbleUnderline width={180} color="var(--brand-accent)" className="mb-8" delay={0.4} />
                            <p className="text-lg md:text-xl text-text-secondary font-light leading-relaxed max-w-md">
                                From reverse engineering binaries to crafting custom offensive tooling — bridging the gap between theory and real-world exploitation.
                            </p>
                        </motion.div>

                        {/* Right Side: Narrative Points with accent bars */}
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                            className="space-y-10 lg:mt-12"
                        >
                            {[
                                {
                                    num: "01",
                                    title: "Offensive Security",
                                    text: "Exploring vulnerabilities, exploit development & Malware Development."
                                },
                                {
                                    num: "02",
                                    title: "Secure Systems",
                                    text: "Learning how resilient architectures are designed and defended."
                                },
                                {
                                    num: "03",
                                    title: "Continuous Exploration",
                                    text: "Reverse engineering, AI research, and deep technical curiosity."
                                }
                            ].map((item, i) => (
                                <motion.div key={i} variants={fadeUp} className="group relative pl-6 border-l-2 border-border hover:border-brand-primary transition-colors duration-300">
                                    <span className="absolute -left-[1px] top-0 w-0.5 h-full bg-brand-primary origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 rounded-full" />
                                    <div className="flex items-center gap-3 mb-2">
                                        {/* Doodle: Loop circle centered behind the number */}
                                        <div className="relative inline-flex items-center justify-center flex-shrink-0" style={{ width: 36, height: 36 }}>
                                            <div className="absolute inset-0">
                                                <LoopCircle size={36} color="var(--brand-accent)" delay={0.3 + i * 0.3} />
                                            </div>
                                            <span className="text-xs font-mono text-brand-primary tracking-wider relative z-10">{item.num}</span>
                                        </div>
                                        <h3 className="text-2xl font-gamja text-text-primary group-hover:text-brand-primary transition-colors">
                                            {item.title}
                                        </h3>
                                    </div>
                                    <p className="text-text-secondary font-light leading-relaxed">
                                        {item.text}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* Doodle: Squiggle divider between sections */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4">
                    <SquiggleDivider color="var(--brand-accent)" delay={0.2} />
                </div>

                {/* ─── LOOPING ACCOMPLISHMENTS ─── */}
                <section className="pt-12 pb-0 bg-gradient-to-b from-transparent via-surface/10 to-transparent">
                    <div className="max-w-7xl mx-auto text-center mb-8">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-4xl lg:text-5xl font-gamja font-medium text-text-primary mb-4"
                        >
                            Milestones & Certifications
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-text-secondary font-light"
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
