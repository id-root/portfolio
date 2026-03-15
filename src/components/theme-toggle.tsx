'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const toggleTheme = () => {
        const nextTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(nextTheme);
    };

    return (
        <button
            onClick={toggleTheme}
            className="relative flex items-center justify-center p-2.5 rounded-full border border-beige-300/50 dark:border-white/10 bg-beige-100/50 dark:bg-white/5 text-text-secondary hover:text-accent-caramel hover:border-accent-caramel/50 transition-all shadow-sm group"
            aria-label="Toggle Theme"
        >
            <div className={`transition-transform duration-500 relative z-10 ${theme === 'dark' ? 'rotate-180' : 'rotate-0'}`}>
                {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </div>

            {/* Hover Hint */}
            <span className="absolute inset-0 bg-accent-caramel/10 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></span>
        </button>
    );
};
