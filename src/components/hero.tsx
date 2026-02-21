"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";

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

    // Name to reveal character by character
    const titleText = "Vector".split("");

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section ref={heroRef} className="h-[140vh] relative -mt-24">
            <motion.div
                style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
                className="h-screen sticky top-0 flex flex-col items-center justify-center overflow-hidden px-4 md:px-8 bg-transparent"
            >
                <div className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto pt-20">

                    {/* Character reveal animation for main title */}
                    <motion.div className="overflow-hidden mb-6 py-4">
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-text-primary flex tracking-tighter">
                            {titleText.map((char, index) => (
                                <motion.span
                                    key={index}
                                    initial={{ y: "120%", opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{
                                        duration: 0.8,
                                        ease: [0.33, 1, 0.68, 1], // Custom elegant ease-out
                                        delay: index * 0.08 + 0.2
                                    }}
                                    className="inline-block drop-shadow-sm"
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </h1>
                    </motion.div>

                    {/* Subtitle with slight parallax */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 1, ease: "easeOut" }}
                        className="max-w-2xl mx-auto mb-16 px-4"
                    >
                        <p className="text-lg md:text-2xl font-outfit text-text-secondary font-light leading-relaxed">
                            A Student exploring <span className="text-accent-caramel font-medium">cyber-space</span>, creating elegant zero-trust solutions and waiting for AGI.
                        </p>
                    </motion.div>

                    {/* CTA Button with distinct parallax speed */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 1.3, ease: "easeOut" }}
                    >
                        <button
                            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                            className="group relative px-10 py-4 bg-transparent overflow-hidden rounded-full border border-accent-caramel/40 transition-all hover:border-transparent hover:shadow-[0_8px_32px_rgba(196,167,125,0.25)]"
                        >
                            <span className="relative z-10 text-text-primary font-outfit uppercase tracking-widest text-sm font-medium group-hover:text-white transition-colors duration-500">
                                Explore Work
                            </span>
                            <div className="absolute inset-0 bg-accent-caramel transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]" />
                        </button>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};
