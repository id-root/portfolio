import { Navbar } from "@/components/navbar";
import { BookOpen, ExternalLink, Calendar } from "lucide-react";

export default function WriteupsPage() {
    const writeups = [
        {
            title: "BreachBlocker-Unlocker",
            category: "Side Quest 4",
            date: "Dec 25, 2025",
            tags: ["Web Exploitation", "Authentication Bypass"],
            summary: "Extract multiple flags from different apps by chaining enumeration, logic flaws, and authentication bypass techniques to recover stolen funds.",
            link: "https://github.com/id-root/BreachBlocker-Unlocker"
        },
        {
            title: "Carrotbane-of-My-Existence",
            category: "Side Quest 3",
            date: "Dec 20, 2025",
            tags: ["AI", "SMTP"],
            summary: "Understanding AI-powered applications, and chaining creative vulnerability discovery techniques.",
            link: "https://github.com/id-root/Carrotbane-of-My-Existence"
        },
        {
            title: "Scheme-Catcher",
            category: "Side Quest 2",
            date: "Dec 15, 2025",
            tags: ["Binary Exploitation", "Reverse Engeneering"],
            summary: "Extracting hidden flags from a stripped binary without execution. Walkthrough of dynamic analysis with gdb",
            link: "https://github.com/id-root/Scheme-Catcher"
        },
        {
            title: "Hoppers-Origin-Writeup",
            category: "Side Quest 0",
            date: "Dec 10, 2025",
            tags: ["Privilege escalation", "Active Directory"],
            summary: "Initial reconnaissance phase. tracking the 'Hopper' entity across multiple platforms to find the entry point.",
            link: "https://github.com/id-root/Hoppers-Origin-Writeup"
        }
    ];

    return (
        <div className="min-h-screen selection:bg-neon-purple selection:text-white overflow-hidden relative transition-colors duration-300">
            <Navbar />

            {/* Background Gradients */}
            <div className="fixed bottom-0 right-0 w-[800px] h-[800px] bg-red-500/5 rounded-full blur-[150px] pointer-events-none"></div>

            <main className="pt-32 pb-20 px-4 md:px-8 max-w-5xl mx-auto relative z-10">

                <header className="mb-16 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-stone-900 dark:text-white">
                        Research & <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">Writeups</span>
                    </h1>
                    <p className="text-stone-600 dark:text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        Detailed Write-Ups on TryHackMe CTFs.
                    </p>
                </header>

                <div className="grid gap-6">
                    {writeups.map((post, i) => (
                        <a
                            key={i}
                            href={post.link}
                            target="_blank"
                            className="group block glass-card p-8 rounded-2xl relative overflow-hidden transition-all duration-300 hover:scale-[1.01]"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-500/5 to-red-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="relative z-10 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-accent/10 border border-accent/30 text-accent">
                                            {post.category}
                                        </span>
                                        <div className="flex items-center gap-1 text-stone-500 dark:text-slate-500 text-xs font-mono">
                                            <Calendar className="w-3 h-3" />
                                            {post.date}
                                        </div>
                                    </div>

                                    <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-3 group-hover:text-accent transition-colors">
                                        {post.title}
                                    </h2>

                                    <p className="text-stone-600 dark:text-slate-400 leading-relaxed mb-6">
                                        {post.summary}
                                    </p>

                                    <div className="flex gap-2 flex-wrap">
                                        {post.tags.map(tag => (
                                            <span key={tag} className="text-xs font-medium text-stone-500 dark:text-slate-400">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="mt-2 text-stone-400 dark:text-slate-500 group-hover:text-stone-900 dark:group-hover:text-white transition-colors">
                                    <ExternalLink className="w-6 h-6" />
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

            </main>
        </div>
    );
}

