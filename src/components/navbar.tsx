"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

function NavGlassFilter() {
    return (
        <svg className="hidden" aria-hidden="true">
            <defs>
                <filter
                    id="nav-glass-filter"
                    x="0%"
                    y="0%"
                    width="100%"
                    height="100%"
                    colorInterpolationFilters="sRGB"
                >
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.04 0.04"
                        numOctaves="2"
                        seed="3"
                        result="turbulence"
                    />
                    <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />
                    <feDisplacementMap
                        in="SourceGraphic"
                        in2="blurredNoise"
                        scale="20"
                        xChannelSelector="R"
                        yChannelSelector="B"
                        result="displaced"
                    />
                    <feGaussianBlur in="displaced" stdDeviation="1.5" result="finalBlur" />
                    <feComposite in="finalBlur" in2="finalBlur" operator="over" />
                </filter>
            </defs>
        </svg>
    );
}

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
        { name: 'Home', href: '/' },
        { name: 'Whitepapers', href: '/writeups' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <>
            <NavGlassFilter />
            <motion.nav
                variants={{
                    visible: { y: 0 },
                    hidden: { y: "-100%" },
                }}
                animate={hidden ? "hidden" : "visible"}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4 md:px-6 font-sans transition-all duration-300"
            >
                {/* Main Desktop/Tablet Bar */}
                <div className={`
                    w-full md:w-auto px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12 rounded-[2rem] md:rounded-full transition-all duration-500 relative
                    ${scrolled || isMobileMenuOpen
                        ? 'glass-panel'
                        : 'bg-transparent border-transparent'}
                `}>
                    {/* SVG distortion overlay — only when scrolled */}
                    {(scrolled || isMobileMenuOpen) && (
                        <div
                            className="absolute top-0 left-0 -z-10 h-full w-full overflow-hidden rounded-[2rem] md:rounded-full"
                            style={{ backdropFilter: 'url("#nav-glass-filter") blur(20px)' }}
                        />
                    )}

                    <div className="w-full flex items-center justify-between gap-8">
                        {/* Logo */}
                        <Link href="/" className="font-gamja text-xl md:text-2xl font-bold text-text-primary tracking-wide">
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
                                            ${isActive ? 'text-text-primary' : 'text-text-secondary hover:text-brand-primary'}
                                        `}
                                    >
                                        {item.name}
                                        <span className={`
                                            absolute left-0 right-0 -bottom-2 h-[2px] bg-brand-primary transform origin-left transition-transform duration-300 rounded-full
                                            ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                                        `} />
                                    </Link>
                                )
                            })}
                        </div>

                        {/* Right side controls (Mobile hamburger) */}
                        <div className="flex items-center gap-4">

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
                                <div className="flex flex-col gap-6 pt-4 pb-2 border-t border-[rgba(49,39,38,0.1)] mt-2">
                                    {navItems.map((item) => {
                                        const isActive = pathname === item.href;
                                        return (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className={`
                                                    text-sm uppercase tracking-widest font-medium transition-colors duration-300 w-full text-center py-2
                                                    ${isActive ? 'text-brand-primary bg-brand-primary/10 rounded-lg' : 'text-text-secondary hover:text-brand-primary'}
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
        </>
    );
};
