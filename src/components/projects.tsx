"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Database, Lock, Radio, Shield } from "lucide-react";

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

const ProjectCard = ({
    title,
    status,
    icon: Icon,
    problem,
    approach,
    link,
    index,
}: {
    title: string;
    status: string;
    icon: React.ComponentType<{ className?: string }>;
    problem: string;
    approach: string;
    link: string;
    index: number;
}) => {
    const totalItems = projects.length;
    const cols = 2; // md:grid-cols-2
    const isTopHalf = index < Math.ceil(totalItems / cols);

    return (
        <motion.a
            href={link}
            target="_blank"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
            className={cn(
                "flex flex-col py-10 px-8 relative group/feature border-stone-200 dark:border-stone-700/60 transition-colors",
                /* right border on left column items (even index), but not if last and odd */
                index % cols === 0 && !(totalItems % cols !== 0 && index === totalItems - 1) && "md:border-r",
                /* bottom border on all except last row */
                index < totalItems - (totalItems % cols === 0 ? cols : totalItems % cols) && "border-b",
                /* Last item spans full width when count is odd */
                totalItems % cols !== 0 && index === totalItems - 1 && "md:col-span-2",
            )}
        >
            {/* Hover gradient overlay */}
            {isTopHalf ? (
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-300 absolute inset-0 h-full w-full bg-gradient-to-t from-stone-100 dark:from-stone-800/50 to-transparent pointer-events-none" />
            ) : (
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-300 absolute inset-0 h-full w-full bg-gradient-to-b from-stone-100 dark:from-stone-800/50 to-transparent pointer-events-none" />
            )}

            {/* Icon */}
            <div className="mb-4 relative z-10 text-stone-500 dark:text-stone-400">
                <Icon className="w-6 h-6" />
            </div>

            {/* Title with accent bar */}
            <div className="text-xl font-bold mb-3 relative z-10">
                <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-stone-300 dark:bg-stone-700 group-hover/feature:bg-accent-caramel transition-all duration-200 origin-center" />
                <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-stone-900 dark:text-white font-serif pl-4">
                    {title}
                </span>
                <span className="ml-3 text-xs font-mono text-stone-400 dark:text-stone-500 font-normal">
                    {status}
                </span>
            </div>

            {/* Problem description */}
            <p className="text-sm text-stone-500 dark:text-stone-400 font-light relative z-10 leading-relaxed mb-4 pl-4">
                {problem}
            </p>

            {/* Approach tag */}
            <div className="flex flex-wrap items-center gap-2 relative z-10 pl-4">
                <span className="px-2.5 py-0.5 bg-stone-100 dark:bg-stone-800/50 text-stone-600 dark:text-stone-300 text-[10px] font-semibold uppercase tracking-wider rounded">
                    Approach
                </span>
                <span className="text-stone-400 dark:text-stone-500 text-xs font-mono">
                    {approach}
                </span>
            </div>

            {/* Arrow icon */}
            <ArrowUpRight className="absolute top-8 right-8 w-5 h-5 opacity-0 group-hover/feature:opacity-100 transition-all duration-300 text-accent-caramel z-10" />
        </motion.a>
    );
};

export const Projects = () => {
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

            <div className="grid grid-cols-1 md:grid-cols-2 relative z-10">
                {projects.map((project, index) => (
                    <ProjectCard key={project.title} {...project} index={index} />
                ))}
            </div>
        </section>
    );
};
