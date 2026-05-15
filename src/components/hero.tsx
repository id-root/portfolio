"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { MagneticWrapper } from "@/components/ui/magnetic-wrapper";
import { StarSparkle } from "@/components/doodles";

const SplineScene = dynamic(
    () => import("@/components/ui/splite").then((mod) => mod.SplineScene),
    {
        ssr: false,
        loading: () => (
            <div className="w-full h-full flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-[var(--brand-accent)]/30 border-t-[var(--brand-accent)] rounded-full animate-spin" />
            </div>
        ),
    }
);

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

    const handleSplineLoad = () => {
        // Signal to the layout-level preloader that Spline is ready
        if (typeof window !== 'undefined' && (window as any).__setSplineReady) {
            (window as any).__setSplineReady();
        }
    };

    return (
        <section ref={heroRef} className="h-[140vh] relative -mt-24">
            <motion.div
                style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
                className="h-screen sticky top-0 flex flex-col items-center justify-center overflow-hidden px-4 md:px-8 bg-transparent"
            >
                <div className="relative z-10 w-full max-w-7xl mx-auto pt-20">
                    {/* Main hero card — dark charcoal with spotlight */}
                    <div
                        className="w-full min-h-[520px] md:min-h-[500px] rounded-[2rem] relative overflow-hidden border border-[rgba(255,248,237,0.08)] group"
                        style={{
                            background: 'linear-gradient(135deg, #312726 0%, #3d302e 40%, #4a3b38 100%)',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,248,237,0.05)',
                        }}
                    >
                        {/* Spotlight glow — warm cream/gold radial in top-left */}
                        <div
                            className="absolute pointer-events-none z-[1]"
                            style={{
                                top: '-15%',
                                left: '-5%',
                                width: '65%',
                                height: '80%',
                                background: 'radial-gradient(ellipse at 30% 30%, rgba(196,168,130,0.25) 0%, rgba(255,248,237,0.08) 40%, transparent 70%)',
                                filter: 'blur(40px)',
                            }}
                        />
                        {/* Secondary subtle spotlight for depth */}
                        <div
                            className="absolute pointer-events-none z-[1]"
                            style={{
                                top: '-30%',
                                left: '10%',
                                width: '40%',
                                height: '60%',
                                background: 'radial-gradient(circle, rgba(255,248,237,0.12) 0%, transparent 60%)',
                                filter: 'blur(60px)',
                            }}
                        />

                        <div className="flex flex-col md:flex-row h-full min-h-[520px] md:min-h-[500px]">
                            {/* Left content */}
                            <div className="flex-1 p-8 md:p-12 lg:p-16 relative z-10 flex flex-col justify-center">
                                {/* Character reveal animation for main title */}
                                <motion.div className="overflow-hidden mb-4 py-2 relative">
                                    {/* Doodle: Sparkle stars floating near the title */}
                                    <div className="absolute -top-4 -right-2 md:-right-8 z-20">
                                        <StarSparkle size={50} color="rgba(255,248,237,0.6)" delay={1.5} />
                                    </div>
                                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-gamja text-white flex tracking-tighter drop-shadow-md">
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
                                    <p className="text-base md:text-lg font-outfit text-[rgba(255,248,237,0.85)] font-light leading-relaxed drop-shadow-sm">
                                        A Student exploring <span className="text-white font-medium drop-shadow-md">cyber-space</span>, creating elegant zero-trust solutions and waiting for AGI.
                                    </p>
                                </motion.div>

                                {/* CTA Button — Warm gold pill */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.8, delay: 1.3, ease: "easeOut" }}
                                    className="relative"
                                >

                                    <MagneticWrapper>
                                        <button
                                            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                                            className="group relative px-8 py-3.5 overflow-hidden rounded-full transition-all duration-500 hover:shadow-[0_8px_32px_rgba(196,168,130,0.3)]"
                                            style={{
                                                backgroundColor: 'var(--brand-accent)',
                                                color: 'var(--brand-dark)',
                                            }}
                                        >
                                            <span className="relative z-10 font-outfit uppercase tracking-widest text-xs font-semibold flex items-center gap-2">
                                                Explore Work
                                                <svg className="w-4 h-4 opacity-70 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                            </span>
                                            <div className="absolute inset-0 bg-white/20 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]" />
                                        </button>
                                    </MagneticWrapper>
                                </motion.div>
                            </div>

                            {/* Right content — Spline 3D Scene */}
                            <div className="flex-1 relative min-h-[320px] md:min-h-0">
                                <SplineScene
                                    scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                                    className="w-full h-full absolute inset-0"
                                    onLoad={handleSplineLoad}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};
