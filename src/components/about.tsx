"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PortalCanvas } from "@/components/portal-model";

export const About = () => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Image/illustration moves at a different speed than text (0.7x relative to standard)
    const imageY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
    const textY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

    return (
        <section id="about" ref={sectionRef} className="py-32 px-4 md:px-8 relative overflow-hidden bg-beige-100/30 dark:bg-white/5">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                {/* Left: Typography / Content */}
                <motion.div
                    style={{ y: textY }}
                    className="order-2 lg:order-1 space-y-10"
                >
                    <div className="space-y-4">
                        <h2 className="text-sm font-outfit uppercase tracking-[0.2em] text-accent-caramel font-medium">
                            Philosophy
                        </h2>
                        <h3 className="text-5xl md:text-6xl font-serif text-text-primary leading-[1.1] tracking-tight text-balance">
                            Security through <span className="italic text-accent-sienna">understanding</span>, not obscurity.
                        </h3>
                    </div>

                    <div className="space-y-6 text-lg text-text-secondary font-outfit font-light leading-relaxed">
                        <p>
                            I am a security practitioner focused on offensive operations and elegant tool development. I don&apos;t believe in relying on automated scanners without understanding the underlying logic.
                        </p>
                        <p>
                            My philosophy is rooted in hands-on capability. While degrees and certifications are useful waypoints, they are not proxies for competence. I build custom tools in lower-level languages to master interactions and optimize for both speed and stealth.
                        </p>
                    </div>

                    <div className="pt-8 border-t border-beige-300/50">
                        <h4 className="text-xs uppercase tracking-[0.15em] text-text-muted mb-6 font-medium">Current Focus</h4>
                        <div className="flex flex-wrap gap-4">
                            {['OSCP Preparation', 'Rust Malware Dev', 'AD Exploitation'].map((focus, i) => (
                                <span
                                    key={i}
                                    className="px-5 py-2.5 rounded-full border border-beige-300/60 dark:border-white/10 bg-beige-50/80 dark:bg-white/5 text-sm font-outfit text-text-secondary shadow-sm"
                                >
                                    {focus}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Right: 3D Model with Parallax */}
                <div className="order-1 lg:order-2 h-[500px] lg:h-[600px] w-full relative group flex items-center justify-center bg-transparent mt-10 lg:mt-0">
                    <motion.div
                        style={{ y: imageY }}
                        className="w-full h-full flex items-center justify-center"
                    >
                        <div className="w-full h-full flex items-center justify-center relative z-10">
                            <PortalCanvas />
                        </div>
                    </motion.div>
                </div>

            </div>
        </section>
    );
};
