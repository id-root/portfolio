"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ThemeToggle } from './theme-toggle';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
    const pathname = usePathname();
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 150 && !isMobileMenuOpen) {
            setHidden(true);
        } else {
            setHidden(false);
        }
        setScrolled(latest > 50);
    });

    const navItems = [
        { name: 'Projects', href: '/' },
        { name: 'Whitepapers', href: '/writeups' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <motion.nav
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className={`fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 font-sans transition-all duration-300`}
        >
            {/* Main Desktop/Tablet Bar */}
            <div className={`
                w-full md:w-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12 rounded-[2rem] md:rounded-full transition-all duration-500
                ${scrolled || isMobileMenuOpen
                    ? 'bg-beige-50/80 dark:bg-[#1a1816]/80 backdrop-blur-md border border-beige-200/50 dark:border-[#d5c0aa]/15 shadow-[0_4px_24px_rgba(201,184,150,0.15)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)]'
                    : 'bg-transparent border-transparent'}
            `}>
                <div className="w-full flex items-center justify-between gap-8">
                    {/* Logo */}
                    <Link href="/" className="font-serif text-xl md:text-2xl font-bold text-text-primary tracking-wide">
                        Portfolio.
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`
                                        relative text-sm uppercase tracking-widest font-medium transition-colors duration-300 group
                                        ${isActive ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'}
                                    `}
                                >
                                    {item.name}
                                    <span className={`
                                        absolute left-0 right-0 -bottom-2 h-[1px] bg-accent-caramel transform origin-left transition-transform duration-300
                                        ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                                    `} />
                                </Link>
                            )
                        })}
                    </div>

                    {/* Right side controls (Theme + Mobile hamburger) */}
                    <div className="flex items-center gap-4">
                        <ThemeToggle />

                        <button
                            className="md:hidden p-2 text-text-secondary hover:text-text-primary transition-colors flex items-center justify-center bg-transparent border-none"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle mobile menu"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="w-full md:hidden flex flex-col overflow-hidden"
                        >
                            <div className="flex flex-col gap-6 pt-4 pb-2 border-t border-beige-200/50 dark:border-white/10 mt-2">
                                {navItems.map((item) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={`
                                                text-sm uppercase tracking-widest font-medium transition-colors duration-300 w-full text-center py-2
                                                ${isActive ? 'text-text-primary bg-beige-200/30 dark:bg-white/5 rounded-lg' : 'text-text-secondary hover:text-text-primary'}
                                            `}
                                        >
                                            {item.name}
                                        </Link>
                                    )
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
};
