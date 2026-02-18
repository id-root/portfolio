'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { useGlitch } from './theme-glitch-provider';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();
    const { triggerGlitch } = useGlitch();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const toggleTheme = () => {
        const nextTheme = theme === 'dark' ? 'light' : 'dark';
        triggerGlitch(() => {
            setTheme(nextTheme);
        });
    };

    return (
        <button
            onClick={toggleTheme}
            className="p-2 text-stone-400 hover:text-accent transition-colors relative group"
            aria-label="Toggle Theme"
        >
            <div className={`transition-transform duration-500 ${theme === 'dark' ? 'rotate-180' : 'rotate-0'}`}>
                {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </div>

            {/* Hover Glitch Hint */}
            <span className="absolute inset-0 bg-accent/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity"></span>
        </button>
    );
};
