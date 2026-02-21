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
            },
            colors: {
                background: 'var(--bg-primary)',
                beige: {
                    50: '#FDFBF7',
                    100: '#F7F3EB',
                    200: '#EDE5D8',
                    300: '#E2D6C6',
                    400: '#D4C4AD',
                    500: '#C9B896',
                    600: '#B8A57A',
                },
                accent: {
                    caramel: '#C4A77D',
                    sienna: '#A67B5B',
                    terracotta: '#C68B59',
                    sage: '#9CAF88',
                    olive: '#7D8471',
                },
                neutral: {
                    charcoal: '#2C2C2C',
                    coffee: '#3D3329',
                    gray: '#6B6356',
                    stone: '#8C8477',
                },
                text: {
                    primary: 'var(--text-primary)',
                    secondary: 'var(--text-secondary)',
                    muted: 'var(--text-muted)',
                    light: 'var(--text-light)',
                }
            },
            animation: {
                'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
                'subtle-scale': 'subtleScale 0.8s ease-out forwards',
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
            },
        },
    },
    plugins: [],
};
export default config;
