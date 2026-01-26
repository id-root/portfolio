import { Navbar } from "@/components/navbar";
import { Terminal, Cpu, Network, Shield } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="min-h-screen selection:bg-red-500 selection:text-white overflow-hidden relative transition-colors duration-300">
            <Navbar />

            {/* Background Gradients */}
            <div className="fixed top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none"></div>

            <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto relative z-10">

                {/* Header */}
                <div className="text-center mb-20">
                    <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-stone-900 dark:text-white">
                        Beyond the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">Command Line.</span>
                    </h1>
                    <p className="text-stone-600 dark:text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        Hii I am Vector. Waiting for AGI... Exploring cybersecurity, automation, and open‑source learning not to arrive but to continue...
                    </p>
                </div>

                {/* Arsenal Section */}
                <div className="mb-20">
                    <div className="glass-panel p-8 rounded-3xl">
                        <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-6 flex items-center gap-3">
                            <Shield className="w-6 h-6 text-red-500" />
                            Arsenal
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Offensive Operations */}
                            <div>
                                <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-4">Offensive Operations</h3>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded">METASPLOIT</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded">IMPACKET</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="px-3 py-1 bg-red-700 text-white text-xs font-bold rounded">EVIL-WINRM</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="px-2 py-1 bg-stone-700 text-white text-xs font-bold rounded">NMAP</span>
                                        <span className="px-2 py-1 bg-orange-500 text-white text-xs font-bold rounded">NETWORK SCANNER</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="px-2 py-1 bg-stone-800 text-white text-xs font-bold rounded">GHIDRA</span>
                                        <span className="px-2 py-1 bg-stone-900 text-white text-xs font-bold rounded">REVERSE ENGINEERING</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="px-2 py-1 bg-stone-700 text-white text-xs font-bold rounded">BURP SUITE</span>
                                        <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">WEB APP</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="px-2 py-1 bg-stone-700 text-white text-xs font-bold rounded">WIRESHARK</span>
                                        <span className="px-2 py-1 bg-red-600 text-white text-xs font-bold rounded">NETWORK</span>
                                    </div>
                                </div>
                            </div>

                            {/* Programming Languages */}
                            <div>
                                <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-4">Programming Languages</h3>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className="px-2 py-1 bg-blue-600 text-white text-xs font-bold rounded">C</span>
                                        <span className="px-2 py-1 bg-blue-500 text-white text-xs font-bold rounded">ELITE</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="px-2 py-1 bg-orange-600 text-white text-xs font-bold rounded">RUST</span>
                                        <span className="px-2 py-1 bg-stone-900 text-white text-xs font-bold rounded">SYSTEMS</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="px-2 py-1 bg-blue-500 text-white text-xs font-bold rounded">PYTHON</span>
                                        <span className="px-2 py-1 bg-blue-600 text-white text-xs font-bold rounded">ELITE</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="px-2 py-1 bg-stone-700 text-white text-xs font-bold rounded">BASH</span>
                                        <span className="px-2 py-1 bg-green-600 text-white text-xs font-bold rounded">SHELL</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="px-2 py-1 bg-stone-800 text-white text-xs font-bold rounded">ASSEMBLY</span>
                                        <span className="px-2 py-1 bg-stone-900 text-white text-xs font-bold rounded">X86_64</span>
                                    </div>
                                </div>
                            </div>

                            {/* Infrastructure & Workflow */}
                            <div>
                                <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-4">Infrastructure & Workflow</h3>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className="px-2 py-1 bg-stone-700 text-white text-xs font-bold rounded">ARCH LINUX</span>
                                        <span className="px-2 py-1 bg-blue-500 text-white text-xs font-bold rounded">MASTER</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="px-2 py-1 bg-stone-700 text-white text-xs font-bold rounded">NEOVIM(LUA)</span>
                                        <span className="px-2 py-1 bg-green-600 text-white text-xs font-bold rounded">CONFIGURED</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="px-2 py-1 bg-stone-700 text-white text-xs font-bold rounded">DOCKER</span>
                                        <span className="px-2 py-1 bg-blue-500 text-white text-xs font-bold rounded">BEGINNER</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="px-2 py-1 bg-stone-700 text-white text-xs font-bold rounded">VIRTUALBOX</span>
                                        <span className="px-2 py-1 bg-blue-600 text-white text-xs font-bold rounded">LABS</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="px-2 py-1 bg-red-800 text-white text-xs font-bold rounded">TRYHACKME</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Accomplishments */}
                <section>
                    <h3 className="text-xl font-bold text-stone-900 dark:text-white mb-8 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-stone-500 dark:text-slate-500" />
                        Accomplishments
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="glass-card p-6 rounded-2xl border-l-4 border-red-500 flex items-center gap-4">
                            <img src="/badges/aoc2024.png" alt="Advent of Cyber 2024" className="w-20 h-20 object-contain flex-shrink-0" />
                            <div className="flex-1">
                                <div className="text-xl font-bold text-stone-900 dark:text-white mb-2">Advent of Cyber 2024</div>
                                <div className="text-sm text-stone-600 dark:text-slate-400">Completed TryHackMe&apos;s annual event</div>
                            </div>
                        </div>

                        <div className="glass-card p-6 rounded-2xl border-l-4 border-red-500 flex items-center gap-4">
                            <img src="/badges/aoc2025.png" alt="Advent of Cyber 2025" className="w-20 h-20 object-contain flex-shrink-0" />
                            <div className="flex-1">
                                <div className="text-xl font-bold text-stone-900 dark:text-white mb-2">Advent of Cyber 2025</div>
                                <div className="text-sm text-stone-600 dark:text-slate-400">Completed TryHackMe&apos;s annual event</div>
                            </div>
                        </div>

                        <div className="glass-card p-6 rounded-2xl border-l-4 border-red-500 flex items-center gap-4">
                            <img src="/badges/sidequest.png" alt="Side Quest 2025" className="w-20 h-20 object-contain flex-shrink-0" />
                            <div className="flex-1">
                                <div className="text-xl font-bold text-stone-900 dark:text-white mb-2">Advent of Cyber Side Quest 2025</div>
                                <div className="text-sm text-stone-600 dark:text-slate-400">Completed advanced challenge track</div>
                            </div>
                        </div>

                        <div className="glass-card p-6 rounded-2xl border-l-4 border-red-500 flex items-center gap-4">
                            <img src="/badges/pentest101.png" alt="Penetration 101" className="w-20 h-20 object-contain flex-shrink-0" />
                            <div className="flex-1">
                                <div className="text-xl font-bold text-stone-900 dark:text-white mb-2">Penetration 101</div>
                                <div className="text-sm text-stone-600 dark:text-slate-400">Foundations of penetration testing</div>
                            </div>
                        </div>

                        <div className="glass-card p-6 rounded-2xl border-l-4 border-red-500 flex items-center gap-4">
                            <img src="/badges/osint.png" alt="OSINT Course" className="w-20 h-20 object-contain flex-shrink-0" />
                            <div className="flex-1">
                                <div className="text-xl font-bold text-stone-900 dark:text-white mb-2">OSINT Course</div>
                                <div className="text-sm text-stone-600 dark:text-slate-400">Open-source intelligence gathering</div>
                            </div>
                        </div>

                        <div className="glass-card p-6 rounded-2xl border-l-4 border-red-500 flex items-center gap-4">
                            <img src="/badges/apihacking.png" alt="API Hacking" className="w-20 h-20 object-contain flex-shrink-0" />
                            <div className="flex-1">
                                <div className="text-xl font-bold text-stone-900 dark:text-white mb-2">API Hacking Course</div>
                                <div className="text-sm text-stone-600 dark:text-slate-400">API security testing methodology</div>
                            </div>
                        </div>
                    </div>
                </section>


            </main>
        </div>
    );
}

