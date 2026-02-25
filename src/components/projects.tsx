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
            problem: "Forensic analysts lack a single deterministic,covert channel detection, and payload embedding.",
            approach: "F5 DCT steganography + Adaptive edge-guided embedding, AES-256-GCM encryption, and HMAC-signed forensic audit trails.",
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
            title: "LanDrop",
            status: "Active v1.0",
            icon: Radio,
            problem: "Local network file sharing needs secure alternatives.",
            approach: "Self-hosted file transfer over LAN with encryption.",
            link: "https://github.com/id-root/LanDrop"
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

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    return (
        <section id="projects" className="py-32 relative px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-20 text-center md:text-left"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-text-primary mb-6 tracking-tight">Featured Work</h2>
                    <p className="text-lg md:text-xl text-text-secondary font-outfit font-light max-w-2xl leading-relaxed">Publicly disclosed research and elegant tooling built for modern security challenges.</p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.15 }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
                >
                    {projects.map((project, index) => (
                        <motion.a
                            key={index}
                            href={project.link}
                            target="_blank"
                            variants={itemVariants}
                            whileHover={{ y: -8, transition: { duration: 0.4, ease: "easeOut" } } as any}
                            className={`group glass-card p-10 rounded-[2rem] relative flex flex-col justify-between h-full min-h-[340px] ${index === 0 ? 'lg:col-span-2' : ''}`}
                        >
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-10">
                                    <div className="w-14 h-14 rounded-2xl bg-beige-100/50 dark:bg-white/5 border border-beige-200/80 dark:border-white/10 flex items-center justify-center text-accent-caramel group-hover:bg-accent-caramel group-hover:text-white transition-colors duration-500 shadow-sm">
                                        <project.icon className="w-6 h-6 transition-transform duration-500 group-hover:scale-110" />
                                    </div>
                                    <div className="flex gap-3 items-center">
                                        <span className="text-[10px] md:text-xs font-outfit uppercase tracking-widest font-medium text-text-secondary">
                                            {project.status}
                                        </span>
                                        <ArrowUpRight className="w-5 h-5 text-text-muted group-hover:text-accent-caramel transition-colors duration-300" />
                                    </div>
                                </div>

                                <h3 className="text-2xl md:text-3xl font-serif text-text-primary mb-4 group-hover:text-accent-sienna transition-colors duration-300">
                                    {project.title}
                                </h3>

                                <p className="text-text-secondary font-sans leading-relaxed text-balance">
                                    {project.problem}
                                </p>
                            </div>

                            <div className="relative z-10 pt-8 mt-8 border-t border-beige-200/60">
                                <div className="text-sm text-text-muted font-sans font-light">
                                    {project.approach}
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
