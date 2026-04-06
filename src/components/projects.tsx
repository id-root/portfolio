"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Database, Lock, Radio, Shield } from "lucide-react";
import { LiquidGlassCard } from "@/components/ui/liquid-glass-card";

const projects = [
    {
        title: "Anti-Debug-Framework",
        status: "Beta v1.0",
        icon: Lock,
        problem: "Reverse engineering exposes proprietary logic and sensitive data.",
        approach: "CPU exception handling, timing analysis & memory guards.",
        link: "https://github.com/id-root/anti-debug-framework"
    },
    {
        title: "Aegis",
        status: "Active v0.1",
        icon: Shield,
        problem: "Forensic analysts lack covert channel detection, and payload embedding.",
        approach: "F5 DCT steganography + Adaptive edge-guided embedding, HMAC-signed forensic audit trails.",
        link: "https://github.com/id-root/Aegis"
    },
    {
        title: "MultiLang-Evasion",
        status: "Active v1.0",
        icon: Shield,
        problem: "Traditional payloads are easily caught by EDR hooks.",
        approach: "Hell's Gate syscalls + ETW patching.",
        link: "https://github.com/id-root/MultiLang-Evasion-Framework"
    },
    {
        title: "sqli-hunter",
        status: "Active v6.0",
        icon: Database,
        problem: "Manual injection testing is slow and noisy.",
        approach: "Async Rust engine with heuristic payloads.",
        link: "https://github.com/id-root/sqli-hunter"
    },
    {
        title: "Synapse",
        status: "Active v2.0",
        icon: Radio,
        problem: "Local network file sharing needs secure alternatives.",
        approach: "Self-hosted file transfer over LAN with encryption.",
        link: "https://github.com/id-root/Synapse"
    },
    {
        title: "spectre",
        status: "Beta v3.0",
        icon: Radio,
        problem: "WAFs block standard reconciliation tools.",
        approach: "Hybrid headless browser + raw HTTP client.",
        link: "https://github.com/id-root/spectre"
    },
    {
        title: "Isotope",
        status: "POC v4.0",
        icon: Lock,
        problem: "Communication metadata is vulnerable to analysis.",
        approach: "Tor Onion Services + Post-Quantum crypto.",
        link: "https://github.com/id-root/isotope"
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

const ProjectCard = ({
    title,
    status,
    icon: Icon,
    problem,
    approach,
    link,
    index,
    isLastOdd,
}: {
    title: string;
    status: string;
    icon: React.ComponentType<{ className?: string }>;
    problem: string;
    approach: string;
    link: string;
    index: number;
    isLastOdd: boolean;
}) => {
    return (
        <motion.div
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={cn(isLastOdd && "md:col-span-2")}
        >
            <LiquidGlassCard
                as="a"
                href={link}
                target="_blank"
                className="flex flex-col py-8 px-6 md:p-8 h-full cursor-pointer"
            >
                <div className="relative w-full h-full flex flex-col">
                    {/* Arrow icon — top right of content */}
                    <ArrowUpRight className="absolute top-0 right-0 w-5 h-5 opacity-0 -translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 text-[var(--brand-accent)] group-hover:rotate-12" />

                    {/* Icon */}
                    <div className="mb-4 text-text-secondary group-hover:text-[var(--brand-accent)] transition-colors duration-500">
                        <Icon className="w-6 h-6 transform group-hover:scale-110 transition-transform duration-500" />
                    </div>

                    {/* Title with styling */}
                    <div className="text-xl font-bold mb-3 flex items-center pr-8">
                        <span className="inline-block text-text-primary font-gamja">
                            {title}
                        </span>
                        <span className="ml-[auto] text-[10px] uppercase font-mono text-text-muted mt-1 px-2 py-1 rounded bg-surface/30 border border-border/50">
                            {status}
                        </span>
                    </div>

                    {/* Problem description */}
                    <p className="text-sm text-text-secondary transition-colors duration-500 font-light leading-relaxed mb-6 mt-2">
                        {problem}
                    </p>

                    {/* Approach tag */}
                    <div className="flex flex-wrap items-center gap-3 mt-auto">
                        <span className="px-2.5 py-1 bg-surface font-mono border border-border/50 text-text-primary text-[10px] font-semibold uppercase tracking-wider rounded">
                            Approach
                        </span>
                        <span className="text-text-muted text-xs font-mono">
                            {approach}
                        </span>
                    </div>
                </div>
            </LiquidGlassCard>
        </motion.div>
    );
};

export const Projects = () => {
    return (
        <section id="projects" className="py-32 relative px-6 w-full max-w-5xl mx-auto font-gamja">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mb-20"
            >
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-gamja text-text-primary mb-8 tracking-tight font-medium">Featured Work</h2>
                <p className="text-lg md:text-xl text-text-secondary font-light max-w-2xl leading-relaxed">Publicly disclosed research and elegant tooling built for modern security challenges.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                {projects.map((project, index) => {
                    const isLastOdd = projects.length % 2 !== 0 && index === projects.length - 1;
                    return (
                        <ProjectCard key={project.title} {...project} index={index} isLastOdd={isLastOdd} />
                    );
                })}
            </div>
        </section>
    );
};
