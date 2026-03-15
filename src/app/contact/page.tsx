"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Footer } from "@/components/footer";

type Command = {
    input: string;
    output: React.ReactNode;
};

export default function ContactInteractive() {
    const inputRef = useRef<HTMLInputElement>(null);
    const terminalBodyRef = useRef<HTMLDivElement>(null);
    const [input, setInput] = useState("");
    const [history, setHistory] = useState<Command[]>([]);
    const [isTyping, setIsTyping] = useState(true);

    // Auto-type the initial command
    useEffect(() => {
        const command = "cat ./contact_info.txt";
        let i = 0;
        setHistory([]);

        const typeInterval = setInterval(() => {
            if (i < command.length) {
                setHistory([{
                    input: command.slice(0, i + 1),
                    output: null,
                }]);
                i++;
            } else {
                clearInterval(typeInterval);
                // After typing finishes, show output with line-by-line reveal
                setTimeout(() => {
                    setHistory([{
                        input: command,
                        output: <AutoRevealOutput />,
                    }]);
                    setIsTyping(false);
                    inputRef.current?.focus();
                }, 300);
            }
        }, 50);

        return () => clearInterval(typeInterval);
    }, []);

    useEffect(() => {
        if (terminalBodyRef.current) {
            terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
        }
    }, [history]);

    const handleCommand = (cmd: string) => {
        const trimmed = cmd.trim().toLowerCase();
        let output: React.ReactNode = <span className="text-red-500">Command not found: {trimmed}. Type &apos;help&apos;.</span>;

        if (trimmed === "help") {
            output = (
                <div className="text-stone-300">
                    <p>Available commands:</p>
                    <ul className="list-disc list-inside pl-2">
                        <li><span className="text-red-500">email</span> - Copy email to clipboard</li>
                        <li><span className="text-red-500">clear</span> - Clear terminal</li>
                        <li><span className="text-red-500">whoami</span> - Display user info</li>
                        <li><span className="text-red-500">github</span> - Open GitHub</li>
                        <li><span className="text-red-500">ls projects</span> - List featured projects</li>
                        <li><span className="text-red-500">cat about.txt</span> - Read about info</li>
                        <li><span className="text-red-500">uname -a</span> - System info</li>
                        <li><span className="text-red-500">sudo [cmd]</span> - Admin privileges</li>
                    </ul>
                </div>
            );
        } else if (trimmed === "email") {
            navigator.clipboard.writeText("advent007@duck.com");
            output = <span className="text-green-500">Email &apos;advent007@duck.com&apos; copied to clipboard.</span>;
        } else if (trimmed === "clear") {
            setHistory([]);
            return;
        } else if (trimmed === "whoami") {
            output = <span className="text-stone-300">guest@contacts</span>;
        } else if (trimmed === "github") {
            window.open("https://github.com/id-root", "_blank");
            output = <span className="text-green-500">Opening GitHub...</span>;
        } else if (trimmed === "ls projects") {
            output = (
                <div className="text-stone-300 space-y-1">
                    <p className="text-stone-500 text-xs mb-2">total 7</p>
                    <p><span className="text-accent-caramel">drwxr-xr-x</span> Anti-Debug-Framework/</p>
                    <p><span className="text-accent-caramel">drwxr-xr-x</span> Aegis/</p>
                    <p><span className="text-accent-caramel">drwxr-xr-x</span> MultiLang-Evasion/</p>
                    <p><span className="text-accent-caramel">drwxr-xr-x</span> sqli-hunter/</p>
                    <p><span className="text-accent-caramel">drwxr-xr-x</span> Synapse/</p>
                    <p><span className="text-accent-caramel">drwxr-xr-x</span> spectre/</p>
                    <p><span className="text-accent-caramel">drwxr-xr-x</span> Isotope/</p>
                </div>
            );
        } else if (trimmed === "cat about.txt") {
            output = (
                <div className="text-stone-300 space-y-2">
                    <p>Security practitioner focused on offensive operations</p>
                    <p>and elegant tool development.</p>
                    <p className="text-stone-500 mt-2">Philosophy: Security through understanding, not obscurity.</p>
                    <p className="text-stone-500">Current focus: OSCP Prep | Rust Malware Dev | AD Exploitation</p>
                </div>
            );
        } else if (trimmed === "uname -a") {
            output = (
                <span className="text-stone-300">
                    Linux vector 6.1.0-security #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux
                </span>
            );
        } else if (trimmed.startsWith("sudo")) {
            output = <span className="text-stone-300">Permission denied: user &apos;guest&apos; is not in the sudoers file. This incident will be reported.</span>;
        } else if (trimmed === "") {
            output = null;
        }

        setHistory(prev => [...prev, { input: cmd, output }]);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleCommand(input);
            setInput("");
        }
    };

    return (
        <div className="min-h-screen selection:bg-red-500 selection:text-white relative transition-colors duration-300 flex flex-col">

            <main className="flex-1 flex items-center justify-center pt-24 pb-12 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-4xl bg-[#0a0a0a] border border-stone-800 rounded-xl overflow-hidden shadow-2xl flex flex-col h-[600px] relative"
                    onClick={() => inputRef.current?.focus()}
                >
                    {/* CRT Scanline overlay */}
                    <div
                        className="absolute inset-0 pointer-events-none z-20 opacity-[0.03]"
                        style={{
                            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.3) 1px, rgba(0,0,0,0.3) 2px)',
                            backgroundSize: '100% 2px',
                        }}
                    />
                    {/* Subtle vignette */}
                    <div className="absolute inset-0 pointer-events-none z-20 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.3)_100%)]" />

                    {/* Header */}
                    <div className="bg-[#1a1a1a] px-4 py-3 flex items-center justify-between border-b border-stone-800 relative z-10">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors"></div>
                        </div>
                        <div className="text-xs text-stone-500 font-mono">guest@contacts:~</div>
                        <div className="w-10"></div>
                    </div>

                    {/* Terminal Body */}
                    <div 
                        ref={terminalBodyRef}
                        data-lenis-prevent
                        className="flex-1 p-6 font-mono text-sm md:text-base overflow-y-auto scrollbar-thin scrollbar-thumb-stone-800 scrollbar-track-transparent space-y-4 relative z-10"
                    >
                        {history.map((cmd, i) => (
                            <div key={i} className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-green-500">guest@contacts:~$</span>
                                    <span className="text-stone-300">{cmd.input}</span>
                                </div>
                                {cmd.output}
                            </div>
                        ))}

                        {!isTyping && (
                            <div className="flex items-center gap-2">
                                <span className="text-green-500">guest@contacts:~$</span>
                                <div className="relative flex-1 h-6">
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        className="absolute inset-0 w-full h-full bg-transparent text-transparent caret-transparent outline-none z-10"
                                        autoFocus
                                        autoComplete="off"
                                    />
                                    <span className="absolute top-0 left-0 text-stone-300 pointer-events-none whitespace-pre z-0">
                                        {input}
                                        <span className="animate-pulse bg-red-500 text-black inline-block w-2.5 h-4 align-middle ml-1"> </span>
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </main>
            <Footer />
        </div>
    );
}

/* Auto-reveal component for initial output — lines animate in one by one */
function AutoRevealOutput() {
    const lines = [
        { content: "Name: Vector", delay: 0 },
        { content: "Role: Student / Researcher", delay: 0.1 },
        { content: <span>Email: <span className="text-red-500 underline">advent007@duck.com</span></span>, delay: 0.2 },
        { content: <span>GitHub: <a href="https://github.com/id-root" target="_blank" rel="noopener noreferrer" className="text-red-500 underline">github.com/id-root</a></span>, delay: 0.3 },
        { content: null, delay: 0.4, isBr: true },
        { content: <span className="text-stone-500">To interact, type <span className="text-white">&apos;help&apos;</span> and press Enter.</span>, delay: 0.5 },
    ];

    return (
        <div className="space-y-1 text-stone-300">
            {lines.map((line, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: line.delay, ease: "easeOut" }}
                >
                    {line.isBr ? <br /> : <p>{line.content}</p>}
                </motion.div>
            ))}
        </div>
    );
}
