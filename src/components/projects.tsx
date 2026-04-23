"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ScribbleUnderline, StarSparkle } from "@/components/doodles";
import { SVGProjectCard } from "@/components/doodles/SVGProjectCard";

const projects = [
    {
        title: "Anti-Debug-Framework",
        status: "Beta v1.0",
        icon: "lock" as const,
        problem: "Reverse engineering exposes proprietary logic and sensitive data.",
        approach: "CPU exception handling, timing analysis & memory guards.",
        link: "https://github.com/id-root/anti-debug-framework",
        highlightText: "proprietary logic",
    },
    {
        title: "Aegis",
        status: "Active v0.1",
        icon: "shield" as const,
        problem: "Forensic analysts lack covert channel detection, and payload embedding.",
        approach: "F5 DCT steganography + Adaptive edge-guided embedding, HMAC-signed forensic audit trails.",
        link: "https://github.com/id-root/Aegis",
        highlightText: "covert channel detection,",
    },
    {
        title: "MultiLang-Evasion",
        status: "Active v1.0",
        icon: "shield" as const,
        problem: "Traditional payloads are easily caught by EDR hooks.",
        approach: "Hell's Gate syscalls + ETW patching.",
        link: "https://github.com/id-root/MultiLang-Evasion-Framework",
        highlightText: "EDR hooks",
    },
    {
        title: "sqli-hunter",
        status: "Active v6.0",
        icon: "database" as const,
        problem: "Manual injection testing is slow and noisy.",
        approach: "Async Rust engine with heuristic payloads.",
        link: "https://github.com/id-root/sqli-hunter",
        highlightText: "slow and noisy",
    },
    {
        title: "Synapse",
        status: "Active v2.0",
        icon: "radio" as const,
        problem: "Local network file sharing needs secure alternatives.",
        approach: "Self-hosted file transfer over LAN with encryption.",
        link: "https://github.com/id-root/Synapse",
        highlightText: "secure alternatives",
    },
    {
        title: "spectre",
        status: "Beta v3.0",
        icon: "radio" as const,
        problem: "WAFs block standard reconciliation tools.",
        approach: "Hybrid headless browser + raw HTTP client.",
        link: "https://github.com/id-root/spectre",
        highlightText: "reconciliation tools",
    },
    {
        title: "Isotope",
        status: "POC v4.0",
        icon: "lock" as const,
        problem: "Communication metadata is vulnerable to analysis.",
        approach: "Tor Onion Services + Post-Quantum crypto.",
        link: "https://github.com/id-root/isotope",
        highlightText: "vulnerable to analysis",
    }
];

const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.96 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1] as any,
            delay: i * 0.1,
        },
    }),
};

export const Projects = () => {
    return (
        <section id="projects" className="py-32 relative px-6 w-full max-w-5xl mx-auto font-gamja">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mb-20 relative"
            >
                <div className="absolute -top-8 right-0 md:right-10">
                    <StarSparkle size={45} color="var(--brand-accent)" delay={0.5} />
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-gamja text-text-primary mb-2 tracking-tight font-medium">Featured Work</h2>
                <ScribbleUnderline width={220} color="var(--brand-accent)" className="mb-6" delay={0.5} />
                <p className="text-lg md:text-xl text-text-secondary font-light max-w-2xl leading-relaxed">Publicly disclosed research and elegant tooling built for modern security challenges.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                {projects.map((project, index) => {
                    const isLastOdd = projects.length % 2 !== 0 && index === projects.length - 1;
                    return (
                        <motion.a
                            key={project.title}
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            custom={index}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            whileHover={{ y: -6, scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className={cn(
                                "block cursor-pointer",
                                isLastOdd && "md:col-span-2"
                            )}
                            aria-label={`View project: ${project.title}`}
                        >
                            {isLastOdd ? (
                                <>
                                    <div className="hidden md:block h-full">
                                        <SVGProjectCard {...project} seed={index} wide={true} />
                                    </div>
                                    <div className="block md:hidden h-full">
                                        <SVGProjectCard {...project} seed={index} wide={false} />
                                    </div>
                                </>
                            ) : (
                                <SVGProjectCard {...project} seed={index} wide={false} />
                            )}
                        </motion.a>
                    );
                })}
            </div>
        </section>
    );
};
