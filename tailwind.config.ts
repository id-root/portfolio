import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: 'class',
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-dm-sans)', 'sans-serif'],
                outfit: ['var(--font-outfit)', 'sans-serif'],
                serif: ['var(--font-playfair)', 'serif'],
                garamond: ['var(--font-garamond)', 'serif'],
                gamja: ['var(--font-gamja)', "'Patrick Hand'", 'cursive'],
                figtree: ['var(--font-figtree)', 'sans-serif'],
            },
            colors: {
                background: 'var(--bg-main)',
                surface: 'var(--brand-light)',
                brand: {
                    primary: 'var(--brand-dark)',
                    hover: 'var(--brand-light)',
                    dark: 'var(--brand-dark)',
                    light: 'var(--brand-light)',
                },
                text: {
                    primary: 'var(--text-main)',
                    secondary: 'var(--text-muted)',
                    muted: 'var(--text-muted)',
                },
                border: {
                    DEFAULT: 'var(--border-color)',
                }
            },
            animation: {
                'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
                'subtle-scale': 'subtleScale 0.8s ease-out forwards',
                'spotlight': 'spotlight 2s ease 0.75s 1 forwards',
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                subtleScale: {
                    '0%': { opacity: '0', transform: 'scale(0.98)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                spotlight: {
                    '0%': { opacity: '0', transform: 'translate(-72%, -62%) scale(0.5)' },
                    '100%': { opacity: '1', transform: 'translate(-50%, -40%) scale(1)' },
                },
            },
        },
    },
    plugins: [],
};
export default config;
