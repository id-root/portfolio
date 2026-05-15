'use client';

import { useTheme } from './ThemeProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { useMemo } from 'react';

/* ─── Star field ─── */
function Stars({ count = 40 }: { count?: number }) {
    const stars = useMemo(() =>
        Array.from({ length: count }, (_, i) => ({
            id: i,
            top: `${Math.random() * 85 + 5}%`,
            left: `${Math.random() * 90 + 5}%`,
            size: Math.random() * 2.5 + 1,
            delay: Math.random() * 3,
            duration: Math.random() * 2 + 2,
        })),
        [count]
    );

    return (
        <>
            {stars.map((s) => (
                <motion.div
                    key={s.id}
                    className="absolute rounded-full bg-white"
                    style={{
                        top: s.top,
                        left: s.left,
                        width: s.size,
                        height: s.size,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: [0, 1, 0.6, 1],
                        scale: [0, 1, 0.8, 1],
                    }}
                    transition={{
                        duration: s.duration,
                        delay: s.delay,
                        repeat: Infinity,
                        repeatType: 'reverse',
                    }}
                />
            ))}
        </>
    );
}

/* ─── Clouds ─── */
function Cloud({ className, delay = 0 }: { className?: string; delay?: number }) {
    return (
        <motion.div
            className={`absolute ${className}`}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 0.7, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 1.2, delay }}
        >
            <svg viewBox="0 0 200 80" className="w-full h-full" fill="white" opacity="0.5">
                <ellipse cx="60" cy="50" rx="50" ry="20" />
                <ellipse cx="100" cy="40" rx="40" ry="25" />
                <ellipse cx="140" cy="50" rx="50" ry="18" />
                <ellipse cx="100" cy="55" rx="60" ry="15" />
            </svg>
        </motion.div>
    );
}

/* ─── Sun celestial body ─── */
function Sun() {
    return (
        <motion.div
            className="absolute"
            style={{ top: '42%', left: '30%', x: '-50%' }}
            initial={{ y: 80, opacity: 0, scale: 0.5 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -80, opacity: 0, scale: 0.5, rotate: 180 }}
            transition={{ type: 'spring', stiffness: 60, damping: 15, duration: 1.2 }}
        >
            {/* Glow */}
            <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                    width: 90,
                    height: 90,
                    marginLeft: -45,
                    marginTop: -45,
                    background: 'radial-gradient(circle, rgba(255,200,50,0.4) 0%, transparent 70%)',
                    filter: 'blur(15px)',
                }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Sun body */}
            <motion.svg
                width="60"
                height="60"
                viewBox="0 0 60 60"
                style={{ marginLeft: -30, marginTop: -30 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            >
                {/* Rays */}
                {Array.from({ length: 12 }).map((_, i) => (
                    <motion.line
                        key={i}
                        x1="30"
                        y1="2"
                        x2="30"
                        y2="8"
                        stroke="#FFD93D"
                        strokeWidth="2"
                        strokeLinecap="round"
                        transform={`rotate(${i * 30} 30 30)`}
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{
                            duration: 2,
                            delay: i * 0.15,
                            repeat: Infinity,
                        }}
                    />
                ))}
                {/* Sun circle */}
                <circle cx="30" cy="30" r="16" fill="url(#sunGrad)" />
                <defs>
                    <radialGradient id="sunGrad" cx="40%" cy="35%">
                        <stop offset="0%" stopColor="#FFF3A3" />
                        <stop offset="50%" stopColor="#FFD93D" />
                        <stop offset="100%" stopColor="#F59E0B" />
                    </radialGradient>
                </defs>
            </motion.svg>
        </motion.div>
    );
}

/* ─── Moon celestial body ─── */
function Moon() {
    return (
        <motion.div
            className="absolute"
            style={{ top: '42%', left: '50%', x: '-50%' }}
            initial={{ y: 80, opacity: 0, scale: 0.5, rotate: -90 }}
            animate={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
            exit={{ y: -80, opacity: 0, scale: 0.5, rotate: 90 }}
            transition={{ type: 'spring', stiffness: 60, damping: 15, duration: 1.2 }}
        >
            {/* Moon glow */}
            <motion.div
                className="absolute rounded-full"
                style={{
                    width: 100,
                    height: 100,
                    marginLeft: -50,
                    marginTop: -50,
                    background: 'radial-gradient(circle, rgba(200,210,255,0.3) 0%, transparent 70%)',
                    filter: 'blur(20px)',
                }}
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />

            <motion.svg
                width="50"
                height="50"
                viewBox="0 0 50 50"
                style={{ marginLeft: -25, marginTop: -25 }}
            >
                <defs>
                    <radialGradient id="moonGrad" cx="35%" cy="35%">
                        <stop offset="0%" stopColor="#F0F0FF" />
                        <stop offset="100%" stopColor="#C8D2E8" />
                    </radialGradient>
                    <mask id="moonMask">
                        <rect width="50" height="50" fill="white" />
                        <circle cx="34" cy="18" r="14" fill="black" />
                    </mask>
                </defs>
                {/* Moon crescent */}
                <circle
                    cx="23"
                    cy="25"
                    r="16"
                    fill="url(#moonGrad)"
                    mask="url(#moonMask)"
                    filter="drop-shadow(0 0 6px rgba(200,210,255,0.5))"
                />
                {/* Craters */}
                <circle cx="18" cy="22" r="2" fill="rgba(180,190,220,0.3)" mask="url(#moonMask)" />
                <circle cx="22" cy="30" r="1.5" fill="rgba(180,190,220,0.25)" mask="url(#moonMask)" />
                <circle cx="15" cy="28" r="1" fill="rgba(180,190,220,0.2)" mask="url(#moonMask)" />
            </motion.svg>
        </motion.div>
    );
}

/* ─── Main SkyWindow Component ─── */
export default function SkyWindow() {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <div className="sky-window-container">
            {/* Arched Gothic Window Frame */}
            <div
                className="sky-window-frame"
                onClick={toggleTheme}
                role="button"
                tabIndex={0}
                aria-label="Toggle theme via sky window"
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleTheme(); }}
            >
                {/* The sky viewport — clipped to the Gothic arch */}
                <div className="sky-window-viewport">
                    {/* Sky gradient background */}
                    <motion.div
                        className="absolute inset-0"
                        animate={{
                            background: isDark
                                ? 'linear-gradient(180deg, #0a0e27 0%, #1a1145 40%, #2d1b69 70%, #1a1145 100%)'
                                : 'linear-gradient(180deg, #87CEEB 0%, #B0E2FF 30%, #E0F4FF 60%, #FFF8E7 100%)',
                        }}
                        transition={{ duration: 1.5, ease: 'easeInOut' }}
                    />

                    {/* Celestial bodies */}
                    <AnimatePresence mode="wait">
                        {isDark ? (
                            <Moon key="moon" />
                        ) : (
                            <Sun key="sun" />
                        )}
                    </AnimatePresence>

                    {/* Stars (only for dark mode) */}
                    <AnimatePresence>
                        {isDark && (
                            <motion.div
                                key="stars"
                                className="absolute inset-0"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1.5, delay: 0.3 }}
                            >
                                <Stars count={50} />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Clouds (only for light mode) */}
                    <AnimatePresence>
                        {!isDark && (
                            <>
                                <Cloud
                                    key="cloud1"
                                    className="w-28 sm:w-36 h-12 sm:h-14 bottom-[18%] left-[5%]"
                                    delay={0.3}
                                />
                                <Cloud
                                    key="cloud2"
                                    className="w-24 sm:w-32 h-10 sm:h-12 bottom-[30%] right-[8%]"
                                    delay={0.6}
                                />
                                <Cloud
                                    key="cloud3"
                                    className="w-20 sm:w-24 h-8 sm:h-10 bottom-[45%] left-[20%]"
                                    delay={0.9}
                                />
                            </>
                        )}
                    </AnimatePresence>

                    {/* Shooting star (dark mode only) */}
                    {isDark && (
                        <motion.div
                            className="absolute w-[2px] h-[2px] bg-white rounded-full"
                            style={{ top: '15%', left: '70%' }}
                            animate={{
                                x: [-10, -120],
                                y: [0, 60],
                                opacity: [0, 1, 0],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                repeatDelay: 6,
                                ease: 'easeOut',
                            }}
                        >
                            <div className="w-16 h-[1px] bg-gradient-to-l from-white/80 to-transparent absolute top-1/2 left-0 -translate-y-1/2 rotate-[-27deg] origin-right" />
                        </motion.div>
                    )}


                </div>

                {/* Gothic window mullions / tracery (decorative SVG overlay) */}
                <svg
                    className="sky-window-tracery"
                    viewBox="0 0 300 420"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                >
                    {/* Outer frame with pointed arch */}
                    <path
                        d="M10 420 L10 180 Q10 10 150 10 Q290 10 290 180 L290 420 Z"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="none"
                        className="text-[var(--color-emerald-900)] dark:text-[var(--color-primary)]"
                    />
                    {/* Inner frame */}
                    <path
                        d="M22 420 L22 182 Q22 22 150 22 Q278 22 278 182 L278 420 Z"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="none"
                        className="text-[var(--color-emerald-800)] dark:text-[var(--color-primary)]/60"
                    />
                    {/* Center mullion (vertical) */}
                    <line
                        x1="150" y1="420" x2="150" y2="90"
                        stroke="currentColor"
                        strokeWidth="5"
                        className="text-[var(--color-emerald-900)] dark:text-[var(--color-primary)]"
                    />
                    {/* Horizontal crossbar */}
                    <line
                        x1="22" y1="260" x2="278" y2="260"
                        stroke="currentColor"
                        strokeWidth="4"
                        className="text-[var(--color-emerald-900)] dark:text-[var(--color-primary)]"
                    />
                    {/* Second crossbar */}
                    <line
                        x1="22" y1="340" x2="278" y2="340"
                        stroke="currentColor"
                        strokeWidth="3"
                        className="text-[var(--color-emerald-900)] dark:text-[var(--color-primary)]"
                    />
                    {/* Sub-arches at top */}
                    <path
                        d="M22 260 L22 182 Q22 90 86 65 Q150 40 150 90"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="none"
                        className="text-[var(--color-emerald-900)] dark:text-[var(--color-primary)]"
                    />
                    <path
                        d="M278 260 L278 182 Q278 90 214 65 Q150 40 150 90"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="none"
                        className="text-[var(--color-emerald-900)] dark:text-[var(--color-primary)]"
                    />
                    {/* Trefoil decoration at apex */}
                    <circle
                        cx="150" cy="55" r="15"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        fill="none"
                        className="text-[var(--color-emerald-900)] dark:text-[var(--color-primary)]"
                    />
                    <circle
                        cx="130" cy="75" r="12"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        className="text-[var(--color-emerald-800)] dark:text-[var(--color-primary)]/60"
                    />
                    <circle
                        cx="170" cy="75" r="12"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        className="text-[var(--color-emerald-800)] dark:text-[var(--color-primary)]/60"
                    />
                </svg>
            </div>
        </div>
    );
}
