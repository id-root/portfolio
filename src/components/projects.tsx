import { ArrowUpRight, Database, Lock, Radio, Shield } from "lucide-react";
import { SiPython, SiJinja, SiRust, SiGo, SiGnubash } from "react-icons/si"; // Added SiGnubash for Assembly representation

export const Projects = () => {
    const projects = [
        {
            title: "Anti-Debug-Framework",
            status: "Beta",
            version: "v1.0.0",
            stack: [
                { icon: SiRust, color: "text-orange-500" },
                { icon: SiGnubash, color: "text-stone-400" } 
            ],
            icon: Lock,
            color: "text-rose-500",
            accent: "border-rose-500/50",
            problem: "Reverse engineering exposes proprietary logic and sensitive data.",
            approach: "CPU exception handling, timing analysis & memory guards.",
            link: "https://github.com/id-root/anti-debug-framework"
        },
        {
            title: "Aegis",
            status: "Active",
            version: "v0.1.0",
            stack: [
                { icon: SiRust, color: "text-orange-500" }
            ],
            icon: Shield,
            color: "text-sky-400",
            accent: "border-sky-400/50",
            problem: "Ensuring host integrity in compromised environments is difficult.",
            approach: "Runtime trust enforcement and system integrity verification.",
            link: "https://github.com/id-root/Aegis"
        },
        {
            title: "MultiLang-Evasion-Framework",
            status: "ACTIVE",
            version: "v1.0.0",
            stack: [
                { icon: SiJinja, color: "text-red-500" },
                { icon: SiPython, color: "text-yellow-500" }
            ],
            icon: Shield,
            color: "text-neon-cyan",
            accent: "border-neon-cyan/50",
            problem: "Traditional payloads are easily caught by EDR hooks.",
            approach: "Hell's Gate syscalls + ETW patching.",
            link: "https://github.com/id-root/MultiLang-Evasion-Framework"
        },
        {
            title: "sqli-hunter",
            status: "ACTIVE",
            version: "v6.0.0",
            stack: [
                { icon: SiRust, color: "text-orange-500" }
            ],
            icon: Database,
            color: "text-neon-purple",
            accent: "border-neon-purple/50",
            problem: "Manual injection testing is slow and noisy.",
            approach: "Async Rust engine with heuristic payloads.",
            link: "https://github.com/id-root/sqli-hunter"
        },
        {
            title: "LanDrop",
            status: "ACTIVE",
            version: "v1.0.0",
            stack: [
                { icon: SiGo, color: "text-cyan-400" }
            ],
            icon: Radio,
            color: "text-blue-400",
            accent: "border-blue-500/50",
            problem: "Local network file sharing needs secure alternatives.",
            approach: "Self-hosted file transfer over LAN with encryption.",
            link: "https://github.com/id-root/LanDrop"
        },
        {
            title: "spectre",
            status: "BETA",
            version: "v3.0.0",
            stack: [
                { icon: SiRust, color: "text-orange-500" }
            ],
            icon: Radio,
            color: "text-blue-400",
            accent: "border-blue-500/50",
            problem: "WAFs block standard reconciliation tools.",
            approach: "Hybrid headless browser + raw HTTP client.",
            link: "https://github.com/id-root/spectre"
        },
        {
            title: "Isotope",
            status: "POC",
            version: "v4.0.0",
            stack: [
                { icon: SiRust, color: "text-orange-500" }
            ],
            icon: Lock,
            color: "text-emerald-400",
            accent: "border-emerald-500/50",
            problem: "Communication metadata is vulnerable to analysis.",
            approach: "Tor Onion Services + Post-Quantum crypto.",
            link: "https://github.com/id-root/isotope"
        }
    ];

    return (
        <section id="projects" className="py-20 relative">
            <div className="mb-12">
                <h2 className="text-4xl font-bold text-stone-900 dark:text-white mb-2">Featured Operations</h2>
                <p className="text-stone-600 dark:text-slate-400">Publicly disclosed research and tooling.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                    <a
                        key={index}
                        href={project.link}
                        target="_blank"
                        className={`group glass-card p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between h-full min-h-[300px] ${index === 0 ? 'lg:col-span-2' : ''}`}
                    >
                        {/* Hover Gradient */}
                        <div className={`absolute inset-0 bg-gradient-to-br from-transparent to-red-500/10 dark:to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>

                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-6">
                                <div className={`w-12 h-12 rounded-xl bg-red-100 dark:bg-white/5 flex items-center justify-center ${project.color} group-hover:scale-110 transition-transform duration-300`}>
                                    <project.icon className="w-6 h-6" />
                                </div>
                                <div className="flex gap-2">
                                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold border ${project.accent} ${project.color} bg-white/5`}>
                                        {project.status}
                                    </span>
                                    <ArrowUpRight className="w-5 h-5 text-stone-400 dark:text-slate-500 group-hover:text-stone-900 dark:group-hover:text-white transition-colors" />
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold text-stone-900 dark:text-white mb-2 group-hover:text-red-600 dark:group-hover:text-transparent dark:group-hover:bg-clip-text dark:group-hover:bg-gradient-to-r dark:group-hover:from-white dark:group-hover:to-slate-400 transition-all">
                                {project.title}
                            </h3>

                            <p className="text-stone-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                                {project.problem}
                            </p>
                        </div>

                        <div className="relative z-10 pt-6 border-t border-stone-200 dark:border-white/5 mt-auto">
                            <div className="flex items-center justify-between text-xs text-stone-500 dark:text-slate-500 font-mono">
                                <span>{project.approach}</span>
                                
                               
                                <div className="flex gap-3">
                                    {project.stack.map((Tech, i) => (
                                        <Tech.icon 
                                            key={i} 
                                            className={`w-5 h-5 ${Tech.color} opacity-70 group-hover:opacity-100 transition-opacity`} 
                                            title="Language used"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
};
