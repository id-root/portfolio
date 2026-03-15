"use client";

import Link from "next/link";
import { Github, Mail, ArrowUpRight } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="border-t border-stone-200 dark:border-stone-800/60 mt-12">
            <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-16">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="font-serif text-2xl text-stone-900 dark:text-white font-medium">Vector.</h3>
                        <p className="text-sm text-stone-500 dark:text-stone-400 font-light leading-relaxed max-w-xs">
                            Exploring architecture, building elegant tools, and documenting the journey into offensive security and beyond.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-xs font-outfit uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500 font-medium">Navigate</h4>
                        <nav className="flex flex-col gap-3">
                            {[
                                { name: "Home", href: "/" },
                                { name: "Whitepapers", href: "/writeups" },
                                { name: "About", href: "/about" },
                                { name: "Contact", href: "/contact" },
                            ].map(link => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-sm text-stone-500 dark:text-stone-400 hover:text-accent-caramel transition-colors font-outfit w-fit"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Social / Connect */}
                    <div className="space-y-4">
                        <h4 className="text-xs font-outfit uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500 font-medium">Connect</h4>
                        <div className="flex flex-col gap-3">
                            <a
                                href="https://github.com/id-root"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-2 text-sm text-stone-500 dark:text-stone-400 hover:text-accent-caramel transition-colors font-outfit w-fit"
                            >
                                <Github className="w-4 h-4" />
                                GitHub
                                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                            <a
                                href="mailto:advent007@duck.com"
                                className="group flex items-center gap-2 text-sm text-stone-500 dark:text-stone-400 hover:text-accent-caramel transition-colors font-outfit w-fit"
                            >
                                <Mail className="w-4 h-4" />
                                advent007@duck.com
                                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="pt-8 border-t border-stone-200/50 dark:border-stone-800/40 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-stone-400 dark:text-stone-500 font-outfit">
                        &copy; {new Date().getFullYear()} Vector. Crafted with elegance.
                    </p>
                    <p className="text-xs text-stone-400/60 dark:text-stone-600 font-mono">
                        Built with Next.js &amp; Framer Motion
                    </p>
                </div>
            </div>
        </footer>
    );
};
