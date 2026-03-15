"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight as BackgroundSpotlight } from "@/components/ui/spotlight";

export const Hero = () => {
    const heroRef = useRef<HTMLElement>(null);
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const { scrollYProgress: heroProgress } = useScroll({
        target: isMounted ? heroRef : undefined,
        offset: ["start start", "end start"],
    });

    const heroOpacity = useTransform(heroProgress, [0, 0.7], [1, 0]);
    const heroScale = useTransform(heroProgress, [0, 0.7], [1, 0.92]);
    const heroY = useTransform(heroProgress, [0, 1], [0, -120]);

    const titleText = "Vector".split("");

    return (
        <section ref={heroRef} className="h-[140vh] relative -mt-24">
            <motion.div
                style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
                className="h-screen sticky top-0 flex flex-col items-center justify-center overflow-hidden px-4 md:px-8 bg-transparent"
            >
                <div className="relative z-10 w-full max-w-7xl mx-auto pt-20">
                    {/* Main hero card — light: warm stone surface, dark: deep charcoal */}
                    <div className="w-full min-h-[520px] md:min-h-[500px] bg-stone-800 dark:bg-[#0a0908]/95 rounded-[2rem] relative overflow-hidden border border-stone-700/50 dark:border-[#d5c0aa]/10 shadow-[0_20px_60px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)] group">
                        <BackgroundSpotlight
                            className="-top-20 left-1/2 -ml-[400px] w-[800px] h-[800px] opacity-40 dark:opacity-20"
                            fill="#C4A77D"
                        />

                        <div className="flex flex-col md:flex-row h-full min-h-[520px] md:min-h-[500px]">
                            {/* Left content */}
                            <div className="flex-1 p-8 md:p-12 lg:p-16 relative z-10 flex flex-col justify-center">
                                {/* Character reveal animation for main title */}
                                <motion.div className="overflow-hidden mb-4 py-2">
                                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white/95 flex tracking-tighter">
                                        {titleText.map((char, index) => (
                                            <motion.span
                                                key={index}
                                                initial={{ y: "120%", opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{
                                                    duration: 0.8,
                                                    ease: [0.33, 1, 0.68, 1],
                                                    delay: index * 0.08 + 0.2
                                                }}
                                                className="inline-block"
                                            >
                                                {char}
                                            </motion.span>
                                        ))}
                                    </h1>
                                </motion.div>

                                {/* Subtitle */}
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1, delay: 1, ease: "easeOut" }}
                                    className="max-w-lg mb-10"
                                >
                                    <p className="text-base md:text-lg font-outfit text-stone-300/90 font-light leading-relaxed">
                                        A Student exploring <span className="text-accent-caramel font-medium">cyber-space</span>, creating elegant zero-trust solutions and waiting for AGI.
                                    </p>
                                </motion.div>

                                {/* CTA Button */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.8, delay: 1.3, ease: "easeOut" }}
                                >
                                    <button
                                        onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                                        className="group relative px-8 py-3.5 bg-transparent overflow-hidden rounded-full border border-accent-caramel/50 transition-all hover:border-transparent hover:shadow-[0_8px_32px_rgba(196,167,125,0.3)] animate-[shimmer_3s_ease-in-out_infinite]"
                                        style={{
                                            backgroundImage: 'linear-gradient(90deg, transparent 0%, transparent 40%, rgba(196,167,125,0.15) 50%, transparent 60%, transparent 100%)',
                                            backgroundSize: '200% 100%',
                                            animation: 'shimmer 3s ease-in-out infinite',
                                        }}
                                    >
                                        <span className="relative z-10 text-white font-outfit uppercase tracking-widest text-xs font-medium group-hover:text-stone-900 transition-colors duration-500 flex items-center gap-2">
                                            Explore Work
                                            <svg className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                        </span>
                                        <div className="absolute inset-0 bg-accent-caramel transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]" />
                                    </button>
                                </motion.div>
                            </div>

                            {/* Right content — Spline 3D Scene */}
                            <div className="flex-1 relative min-h-[320px] md:min-h-0">
                                <SplineScene
                                    scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                                    className="w-full h-full absolute inset-0"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};
