"use client";

import { motion, Variants } from "framer-motion";
import { ArrowUpRight, Database, Lock, Radio, Shield } from "lucide-react";

export const Projects = () => {
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
            problem: "Forensic analysts lack ,covert channel detection, and payload embedding.",
            approach: "F5 DCT steganography + Adaptive edge-guided embedding,HMAC-signed forensic audit trails.",
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

    return (
        <section id="projects" className="py-32 relative px-6 w-full max-w-5xl mx-auto font-sans">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mb-20"
            >
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif text-stone-900 dark:text-white mb-8 tracking-tight font-medium">Featured Work</h2>
                <p className="text-lg md:text-xl text-stone-500 dark:text-stone-400 font-light max-w-2xl leading-relaxed">Publicly disclosed research and elegant tooling built for modern security challenges.</p>
            </motion.div>

            <div className="flex flex-col">
                {projects.map((project, index) => (
                    <motion.a
                        key={project.title}
                        href={project.link}
                        target="_blank"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
                        className="group block border-b border-stone-200 dark:border-stone-800/80 py-10 transition-colors hover:border-accent-caramel/30 dark:hover:border-accent-caramel/30"
                    >
                        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-4">
                            <h3 className="text-2xl md:text-3xl font-serif text-stone-900 dark:text-white font-medium group-hover:text-accent-caramel transition-colors flex items-center gap-4">
                                <project.icon className="w-6 h-6 shrink-0 opacity-70" />
                                {project.title}
                            </h3>
                            <div className="flex items-center gap-4 text-sm font-mono text-stone-400 dark:text-stone-500 shrink-0">
                                <span>{project.status}</span>
                                <ArrowUpRight className="w-5 h-5 opacity-100 translate-x-0 md:opacity-0 md:-translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-accent-caramel" />
                            </div>
                        </div>

                        <p className="text-stone-500 dark:text-stone-400 font-light leading-relaxed max-w-3xl mb-6">
                            {project.problem}
                        </p>

                        <div className="flex flex-wrap items-center gap-3">
                            <span className="px-3 py-1 bg-stone-100 dark:bg-stone-800/50 text-stone-600 dark:text-stone-300 text-xs font-semibold uppercase tracking-wider rounded">
                                Approach
                            </span>
                            <span className="text-stone-400 dark:text-stone-500 text-xs font-mono">
                                {project.approach}
                            </span>
                        </div>
                    </motion.a>
                ))}
            </div>
        </section>
    );
};
