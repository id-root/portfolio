"use client";

import { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import { ArrowRight, Terminal, Shield, Cpu, Minimize, Maximize, X } from 'lucide-react';
import { HoloCard } from "@/components/ui/holo-card";
import { motion } from "framer-motion";

export const Hero = () => {
    return (
        <section className="relative py-20 md:py-32 overflow-hidden px-4 md:px-8">
            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
                {/* Left: Terminal Window */}
                <TerminalWindow />

                {/* Right: Holo Stats */}
                <div className="grid grid-cols-2 gap-4">
                    <HoloCard className="p-6">
                        <div className="flex flex-col gap-4">
                            <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center text-red-500 group-hover:bg-red-500/30 transition-colors">
                                <Terminal className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-stone-900 dark:text-white">Student</div>
                                <div className="text-sm text-stone-600 dark:text-slate-400">Learning</div>
                            </div>
                        </div>
                    </HoloCard>

                    <HoloCard className="p-6 mt-8">
                        <div className="flex flex-col gap-4">
                            <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center text-red-500 group-hover:bg-red-500/30 transition-colors">
                                <Shield className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-stone-900 dark:text-white">Lab</div>
                                <div className="text-sm text-stone-600 dark:text-slate-400">TryHackMe</div>
                            </div>
                        </div>
                    </HoloCard>

                    <HoloCard className="p-6">
                        <div className="flex flex-col gap-4">
                            <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center text-red-500 group-hover:bg-red-500/30 transition-colors">
                                <Cpu className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-stone-900 dark:text-white">Currently learning</div>
                                <div className="text-sm text-stone-600 dark:text-slate-400">Active directory</div>
                            </div>
                        </div>
                    </HoloCard>

                    <HoloCard className="p-6 mt-8">
                        <div className="flex flex-col gap-4">
                            <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center text-red-500 group-hover:bg-red-500/30 transition-colors">
                                <Terminal className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-stone-900 dark:text-white">System</div>
                                <div className="text-sm text-stone-600 dark:text-slate-400">Linux</div>
                            </div>
                        </div>
                    </HoloCard>
                </div>
            </div>
        </section>
    );
};

const TerminalWindow = () => {
    const el = useRef(null);
    const [bootLines, setBootLines] = useState<string[]>([]);
    const [showPrompt, setShowPrompt] = useState(false);
    const [showOutput, setShowOutput] = useState(false);

    useEffect(() => {
        const sequence = async () => {
            // Boot Sequence
            const lines = [
                "Loading Kernel modules...",
                "Mounting Filesystem...",
                "Initializing Network Topology...",
                "Starting Security Daemons..."
            ];

            for (const line of lines) {
                await new Promise(r => setTimeout(r, 400));
                setBootLines(prev => [...prev, `${line} [OK]`]);
            }

            await new Promise(r => setTimeout(r, 500));
            setShowPrompt(true);
        };
        sequence();
    }, []);

    useEffect(() => {
        if (showPrompt && el.current) {
            const typed = new Typed(el.current, {
                strings: ["./boot.sh^1000"],
                typeSpeed: 50,
                showCursor: false,
                onComplete: () => {
                    setTimeout(() => setShowOutput(true), 500);
                }
            });

            return () => {
                typed.destroy();
            };
        }
    }, [showPrompt]);

    const [copied, setCopied] = useState(false);

    const handleCopyEmail = () => {
        navigator.clipboard.writeText("vector@root.cyber"); // Placeholder email
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const scrollToProjects = () => {
        const element = document.getElementById('projects');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full bg-[#0a0a0a] border border-stone-800 rounded-lg overflow-hidden shadow-2xl font-mono text-sm md:text-base relative min-h-[400px]"
        >
            {/* Window Controls */}
            <div className="bg-[#1a1a1a] px-4 py-2 flex items-center justify-between border-b border-stone-800">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-stone-500 text-xs">root@vector:~</div>
                <div className="flex items-center gap-2 text-stone-500">
                    <Minimize className="w-3 h-3" />
                    <Maximize className="w-3 h-3" />
                    <X className="w-3 h-3" />
                </div>
            </div>

            {/* Terminal Body */}
            <div className="p-6 space-y-2 text-stone-300">
                {bootLines.map((line, i) => (
                    <div key={i} className="opacity-70 text-green-500/80 font-mono text-xs">{line}</div>
                ))}

                {showPrompt && (
                    <div className="pt-4">
                        <span className="text-red-500 font-bold">root@vector:~#</span> <span ref={el} className="text-white"></span>
                    </div>
                )}

                {showOutput && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="pt-6 space-y-6"
                    >
                        <h1 className="text-4xl md:text-6xl font-heading font-bold text-white leading-tight">
                            Exploring <br />
                            <span className="text-red-500 text-glow">cyber-space</span>
                        </h1>
                        <p className="text-stone-400 max-w-lg italic">
                            A Student, learning offensive security, Waiting for AGI
                        </p>

                        <div className="flex gap-4 pt-4">
                            <button
                                onClick={scrollToProjects}
                                className="bg-red-500 text-white px-6 py-2 rounded font-bold hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20"
                            >
                                View Projects
                            </button>
                            <button
                                onClick={handleCopyEmail}
                                className="relative border border-stone-700 text-stone-300 px-6 py-2 rounded font-bold hover:bg-white/5 transition-colors group"
                            >
                                {copied ? "Email Copied!" : "Contact"}
                                {copied && (
                                    <motion.span
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="absolute -top-10 left-1/2 -translate-x-1/2 bg-red-500 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100"
                                    >
                                        Copied!
                                    </motion.span>
                                )}
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};


