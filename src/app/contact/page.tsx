"use client";

import { useState, useRef, useEffect } from "react";

import { Send, Globe, Mail } from "lucide-react";
import { motion } from "framer-motion";

type Command = {
    input: string;
    output: React.ReactNode;
};

export default function ContactInteractive() {
    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const [input, setInput] = useState("");
    const [history, setHistory] = useState<Command[]>([]);

    useEffect(() => {
        // Initial greeting
        setHistory([
            {
                input: "cat ./contact_info.txt",
                output: (
                    <div className="space-y-1 text-stone-300">
                        <p>Name: Vector</p>
                        <p>Role: Student / Researcher</p>
                        <p>Email: <span className="text-red-500 underline">advent007@duck.com</span></p>
                        <p>GitHub: <a href="https://github.com/id-root" target="_blank" rel="noopener noreferrer" className="text-red-500 underline">github.com/id-root</a></p>
                        <br />
                        <p className="text-stone-500">To interact, type <span className="text-white">&apos;help&apos;</span> and press Enter.</p>
                    </div>
                )
            }
        ]);
        inputRef.current?.focus();
    }, []);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
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
        <div className="min-h-screen selection:bg-red-500 selection:text-white overflow-hidden relative transition-colors duration-300 flex flex-col">


            <main className="flex-1 flex items-center justify-center pt-24 pb-12 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-4xl bg-[#0a0a0a] border border-stone-800 rounded-xl overflow-hidden shadow-2xl flex flex-col h-[600px]"
                    onClick={() => inputRef.current?.focus()}
                >
                    {/* Header */}
                    <div className="bg-[#1a1a1a] px-4 py-3 flex items-center justify-between border-b border-stone-800">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors"></div>
                        </div>
                        <div className="text-xs text-stone-500 font-mono">guest@contacts:~</div>
                        <div className="w-10"></div>
                    </div>

                    {/* Terminal Body */}
                    <div className="flex-1 p-6 font-mono text-sm md:text-base overflow-y-auto scrollbar-none space-y-4">
                        {history.map((cmd, i) => (
                            <div key={i} className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-green-500">guest@contacts:~$</span>
                                    <span className="text-stone-300">{cmd.input}</span>
                                </div>
                                {cmd.output}
                            </div>
                        ))}

                        <div className="flex items-center gap-2">
                            <span className="text-green-500">guest@contacts:~$</span>
                            {/*  Relative container for input stacking */}
                            <div className="relative flex-1 h-6">
                                {/* LAYER 1: The real input (Invisible but functional) */}
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    // CHANGE: text-transparent, caret-transparent, z-10
                                    className="absolute inset-0 w-full h-full bg-transparent text-transparent caret-transparent outline-none z-10"
                                    autoFocus
                                    autoComplete="off"
                                />
                                {/* LAYER 2: The visual output (Visible but non-interactive) */}
                                <span className="absolute top-0 left-0 text-stone-300 pointer-events-none whitespace-pre z-0">
                                    {input}
                                    <span className="animate-pulse bg-red-500 text-black inline-block w-2.5 h-4 align-middle ml-1"> </span>
                                </span>
                            </div>
                        </div>
                        <div ref={bottomRef}></div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
