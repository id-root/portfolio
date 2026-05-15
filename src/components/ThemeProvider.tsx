'use client';

import { createContext, useContext, useEffect, useState, useCallback, useRef, ReactNode } from 'react';

type Theme = 'light' | 'dark';
type CurtainPhase = 'idle' | 'falling' | 'rising';

const CURTAIN_DURATION = 550; // ms per phase

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    curtainPhase: CurtainPhase;
    curtainColor: string;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: 'light',
    toggleTheme: () => { },
    curtainPhase: 'idle',
    curtainColor: '',
});

export function useTheme() {
    return useContext(ThemeContext);
}

// Design tokens for curtain color (destination theme's background)
const CURTAIN_COLORS: Record<Theme, string> = {
    light: '#FAF9F6',
    dark: '#1c1916',
};

export default function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>('light');
    const [mounted, setMounted] = useState(false);
    const [curtainPhase, setCurtainPhase] = useState<CurtainPhase>('idle');
    const curtainColorRef = useRef<string>('');

    useEffect(() => {
        setMounted(true);
        const saved = localStorage.getItem('library-theme') as Theme;
        if (saved) {
            setTheme(saved);
            document.documentElement.classList.toggle('dark', saved === 'dark');
        }
    }, []);

    const toggleTheme = useCallback(() => {
        if (curtainPhase !== 'idle') return; // Debounce during animation

        const next: Theme = theme === 'light' ? 'dark' : 'light';
        curtainColorRef.current = CURTAIN_COLORS[next];

        // Phase 1: Curtain falls
        setCurtainPhase('falling');

        // Phase 2: At midpoint, swap theme while curtain covers everything
        setTimeout(() => {
            setTheme(next);
            localStorage.setItem('library-theme', next);
            document.documentElement.classList.toggle('dark', next === 'dark');

            // Phase 3: Curtain rises
            setCurtainPhase('rising');

            // Phase 4: Back to idle
            setTimeout(() => {
                setCurtainPhase('idle');
            }, CURTAIN_DURATION + 60);
        }, CURTAIN_DURATION);
    }, [curtainPhase, theme]);

    return (
        <ThemeContext.Provider value={{
            theme,
            toggleTheme,
            curtainPhase,
            curtainColor: curtainColorRef.current,
        }}>
            {children}
        </ThemeContext.Provider>
    );
}
