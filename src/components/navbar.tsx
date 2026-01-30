"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Terminal, Shield, User, Send, BookOpen } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';

export const Navbar = () => {
    const pathname = usePathname();

    const navItems = [
        { name: 'Projects', href: '/', icon: Terminal },
        { name: 'WhitePapers', href: '/writeups', icon: BookOpen },
        { name: 'About', href: '/about', icon: User },
    ];

    return (
        <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
            <div className="glass-panel rounded-full px-2 py-2 flex items-center gap-1 md:gap-2">

                {/* Logo / Home */}
                <div className="pl-3 pr-2 flex items-center gap-2 border-r border-stone-900/10 dark:border-white/10 mr-1">
                    <Shield className="w-5 h-5 text-neon-purple" />
                    <span className="font-bold text-stone-900 dark:text-white tracking-tight hidden md:inline">VECTOR</span>
                </div>

                {/* Navigation Links */}
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`
                                relative px-3 md:px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 group
                                ${isActive ? 'text-stone-900 dark:text-white bg-stone-900/5 dark:bg-white/10 shadow-sm dark:shadow-[0_0_15px_rgba(239,68,68,0.3)]' : 'text-stone-600 dark:text-slate-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-900/5 dark:hover:bg-white/5'}
                            `}
                        >
                            <item.icon className={`w-4 h-4 ${isActive ? 'text-neon-cyan' : 'text-stone-400 dark:text-slate-500 group-hover:text-neon-cyan transition-colors'}`} />
                            <span className="hidden md:inline">{item.name}</span>
                        </Link>
                    )
                })}

                {/* Action Area */}
                <div className="flex items-center gap-2 pl-2 border-l border-stone-900/10 dark:border-white/10 ml-1">
                    <Link
                        href="/contact"
                        className={`
                            px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2
                            bg-stone-900 dark:bg-slate-800 hover:bg-base hover:text-stone-900 dark:hover:bg-red-500 dark:hover:text-white hover:shadow-lg dark:hover:shadow-[0_0_20px_rgba(239,68,68,0.5)] text-white border border-stone-900/10 dark:border-white/10
                        `}
                    >
                        <Send className="w-3 h-3" />
                        <span className="hidden md:inline">Contact</span>
                    </Link>
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    );
};
