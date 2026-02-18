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
                sans: ['var(--font-rubik)', 'var(--font-inter)'], // Rubik as default sans
                heading: ['var(--font-rubik-distressed)', 'var(--font-space-grotesk)'],
                mono: ['var(--font-jetbrains-mono)'],
            },
            colors: {
                primary: 'var(--bg-primary)', // Dynamic Theme Color
                accent: {
                    DEFAULT: 'var(--color-accent-primary)',
                    glow: 'var(--color-accent-glow)',
                },
                // Core Peach Palette (Reverted)
                midnight: {
                    900: '#1c1917', // Warm Stone / Dark Charcoal (Dark Mode BG)
                    800: '#292524', // Lighter Stone
                },
                peach: {
                    50: '#fff0ee',  // Very soft pink/peach
                    100: '#ffe4e0',
                    200: '#ffccc4',
                    300: '#ffdbd0', // Muted Coral
                    400: '#faae9e',
                    500: '#f88379', // Coral Peach
                    600: '#e06c61',
                    900: '#8c3a30', // Contras Text
                },
                coral: {
                    light: '#ffdad5', // Richer background
                    DEFAULT: '#f88379',
                    dark: '#bf5f52', // Border/Accent
                },
                glass: {
                    100: 'rgba(255, 255, 255, 0.1)',
                    200: 'rgba(255, 255, 255, 0.2)',
                    300: 'rgba(0, 0, 0, 0.05)', // Light mode glass
                    border: 'rgba(255, 255, 255, 0.08)',
                    'border-light': 'rgba(0, 0, 0, 0.08)',
                },
                neon: {
                    purple: 'var(--color-neon-purple)',
                    cyan: 'var(--color-neon-cyan)',
                    blue: 'var(--color-neon-blue)',
                },
            },
            backgroundImage: {
                'gradient-radial': "radial-gradient(var(--tw-gradient-stops))",
                'aurora-mesh': "radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(339,49%,30%,1) 0, transparent 50%)",
            },
            animation: {
                'blob': "blob 7s infinite",
                'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'scanline': 'scanline 8s linear infinite',
                'glitch': 'glitch 0.4s cubic-bezier(.25, .46, .45, .94) both',
            },
            animationDelay: {
                '2000': '2s',
                '4000': '4s',
            },
            keyframes: {
                blob: {
                    "0%": {
                        transform: "translate(0px, 0px) scale(1)",
                    },
                    "33%": {
                        transform: "translate(30px, -50px) scale(1.1)",
                    },
                    "66%": {
                        transform: "translate(-20px, 20px) scale(0.9)",
                    },
                    "100%": {
                        transform: "translate(0px, 0px) scale(1)",
                    },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                scanline: {
                    '0%': { backgroundPosition: '0% 0%' },
                    '100%': { backgroundPosition: '0% 100%' },
                },
                glitch: {
                    '0%': { transform: 'translate(0)' },
                    '20%': { transform: 'translate(-2px, 2px)' },
                    '40%': { transform: 'translate(-2px, -2px)' },
                    '60%': { transform: 'translate(2px, 2px)' },
                    '80%': { transform: 'translate(2px, -2px)' },
                    '100%': { transform: 'translate(0)' },
                }
            },
        },
    },
    plugins: [],
};
export default config;
