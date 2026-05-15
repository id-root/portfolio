"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, LayoutGroup } from "framer-motion";
import { cn } from "@/lib/utils";
import { ScribbleUnderline, StarSparkle } from "@/components/doodles";
import { ProjectCardNew } from "@/components/doodles/ProjectCardNew";

const projects = [
    {
        title: "Anti-Debug-Framework",
        status: "Beta v1.0",
        icon: "shield-lock",
        problem: "Reverse engineering exposes proprietary logic and sensitive data.",
        approach: "CPU exception handling, timing analysis & memory guards.",
        link: "https://github.com/id-root/anti-debug-framework",
        description:
            "A comprehensive user-space anti-debugging framework implementing 8 distinct detection techniques spanning timing analysis, memory integrity verification, CPU exception handling, and kernel observer comparison.",
        languages: ["Rust", "Assembly", "Shell"],
        stars: 1,
        forks: 0,
        topics: ["debugging", "malware-analysis", "research", "research-and-development", "reverse-engineering"],
    },
    {
        title: "Aegis",
        status: "Active v0.1",
        icon: "fingerprint",
        problem: "Forensic analysts lack covert channel detection, and payload embedding.",
        approach: "F5 DCT steganography + Adaptive edge-guided embedding, HMAC-signed forensic audit trails.",
        link: "https://github.com/id-root/Aegis",
        description:
            "AEGIS is a forensic-grade, integrity verification, and manipulation CLI platform. It provides a suite of tools for deep image analysis, metadata sanitization, deterministic processing, and cryptographic verification to ensure the authenticity and security of media assets.",
        languages: ["Python"],
        stars: 1,
        forks: 0,
        topics: ["metadata", "forensic-analysis", "stegnography"],
    },
    {
        title: "MultiLang-Evasion",
        status: "Active v1.0",
        icon: "globe-network",
        problem: "Traditional payloads are easily caught by EDR hooks.",
        approach: "Hell's Gate syscalls + ETW patching.",
        link: "https://github.com/id-root/MultiLang-Evasion-Framework",
        description:
            "Multi-language evasion framework implementing Hell's Gate direct syscalls, ETW patching, and advanced process injection techniques across C, Rust, and Go to bypass modern endpoint detection and response systems.",
        languages: ["Jinja", "Python", "Rust", "Shell", "Dockerfile"],
        stars: 1,
        forks: 1,
        topics: ["blue-teaming", "etw", "evasion", "framework", "offensive-security", "payload", "red-teaming"],
    },
    {
        title: "sqli-hunter",
        status: "Active v6.0",
        icon: "database",
        problem: "Manual injection testing is slow and noisy.",
        approach: "Async Rust engine with heuristic payloads.",
        link: "https://github.com/id-root/sqli-hunter",
        description:
            "High-performance SQL injection detection engine built in async Rust. Features heuristic payload generation, blind/time-based detection, and minimal network footprint for stealthy vulnerability assessment.",
        languages: ["Rust"],
        stars: 0,
        forks: 0,
        topics: ["cli", "evasion", "exploitation", "offensive-security", "red-team", "sql", "sqlite3", "webapp"],
    },
    {
        title: "Synapse",
        status: "Active v2.0",
        icon: "signal",
        problem: "Local network file sharing needs secure alternatives.",
        approach: "Self-hosted file transfer over LAN with encryption.",
        link: "https://github.com/id-root/Synapse",
        description:
            "Self-hosted, encrypted file transfer application for local area networks. Implements end-to-end encryption with zero-configuration discovery for seamless, secure file sharing without cloud dependencies.",
        languages: ["Kotlin", "Go", "JavaScript", "CSS", "TypeScript", "HTML"],
        stars: 1,
        forks: 1,
        topics: ["android", "android-app", "android-application", "file-sharing", "file-transfer", "kotlin", "linux", "offline", "open-source", "share", "tools", "windows"],
    },
    {
        title: "spectre",
        status: "Beta v3.0",
        icon: "ghost",
        problem: "WAFs block standard reconciliation tools.",
        approach: "Hybrid headless browser + raw HTTP client.",
        link: "https://github.com/id-root/spectre",
        description:
            "Rust-based, high-concurrency web scraping engine designed to bypass modern Web Application Firewalls (WAFs) and challenge pages (like Cloudflare). It utilizes a hybrid approach, combining lightweight TLS-impersonated HTTP requests with heavy-duty headless browser automation when necessary.",
        languages: ["Rust", "HCL", "Dockerfile"],
        stars: 3,
        forks: 0,
        topics: ["bot-detection-bypass", "cli", "crawler", "hcl", "headless-browsers", "headless-chrome", "http-client", "networking", "offensive-security", "rust", "rust-toolchain", "rustc", "scraping-tool", "security-testing", "security-tools", "tokio", "tui", "waf-bypass"],
    },
    {
        title: "Isotope",
        status: "POC v4.0",
        icon: "atom",
        problem: "Communication metadata is vulnerable to analysis.",
        approach: "Tor Onion Services + Post-Quantum crypto.",
        link: "https://github.com/id-root/isotope",
        description:
            "Anonymous communication platform leveraging Tor Onion Services with post-quantum cryptographic primitives (ML-KEM) for metadata-resistant messaging that withstands both current and future quantum computing threats.",
        languages: ["Rust"],
        stars: 0,
        forks: 0,
        topics: ["chat-application", "cryptography", "cybersecurity", "encryption", "kill-switch", "network-security", "redteam-tools", "rust", "tor", "tor-hidden-services", "tui"],
    },
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
            delay: i * 0.08,
        },
    }),
};

export const Projects = () => {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const handleToggle = useCallback((id: string) => {
        setExpandedId((prev) => (prev === id ? null : id));
    }, []);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") setExpandedId(null);
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, []);

    return (
        <section
            id="projects"
            className="py-32 relative px-6 w-full max-w-5xl mx-auto font-gamja"
        >
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
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-gamja text-text-primary mb-2 tracking-tight font-medium">
                    Featured Work
                </h2>
                <ScribbleUnderline
                    width={220}
                    color="var(--brand-accent)"
                    className="mb-6"
                    delay={0.5}
                />
                <p className="text-lg md:text-xl text-text-secondary font-light max-w-2xl leading-relaxed">
                    Publicly disclosed research and elegant tooling built for modern
                    security challenges.
                </p>
            </motion.div>

            {/* 2-column grid — expanded cards span full width with gooey spring */}
            <LayoutGroup>
                <div
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10"
                >
                    {projects.map((project, index) => {
                        const isLastOdd =
                            projects.length % 2 !== 0 &&
                            index === projects.length - 1;
                        const isExpanded = expandedId === project.title;

                        /* ── Order-swap logic for right-column cards ──
                           CSS grid can't place a col-span-2 item starting
                           at column 2, so when a right-col card expands we
                           swap its order with the left neighbour.           */
                        const isRightCol = index % 2 === 1;
                        const pairIdx = isRightCol ? index - 1 : index + 1;
                        const pairExpanded =
                            pairIdx >= 0 &&
                            pairIdx < projects.length &&
                            expandedId === projects[pairIdx].title;

                        let order = index;
                        if (isExpanded && isRightCol) {
                            order = index - 1;          // jump before left neighbour
                        } else if (pairExpanded && !isRightCol) {
                            order = index + 1;          // yield to expanding right card
                        }

                        return (
                            <motion.div
                                key={project.title}
                                custom={index}
                                variants={cardVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-50px" }}
                                layout
                                style={{ order }}
                                transition={{
                                    layout: {
                                        type: "spring",
                                        stiffness: 200,
                                        damping: 28,
                                        mass: 1.1,
                                    },
                                }}
                                className={cn(
                                    "block",
                                    isLastOdd && "md:col-span-2",
                                    isExpanded && "md:col-span-2",
                                )}
                            >
                                <ProjectCardNew
                                    {...project}
                                    seed={index}
                                    isExpanded={isExpanded}
                                    onToggle={() => handleToggle(project.title)}
                                />
                            </motion.div>
                        );
                    })}
                </div>
            </LayoutGroup>
        </section>
    );
};
