"use client";

import { useId, useMemo } from "react";

/* ─────────────────────────────────────────────────────────
   DoodleCard — A card wrapper with a hand-drawn SVG border,
   watercolor washes, scattered decoration glyphs,
   corner hatching, and an optional illustration slot.
   ───────────────────────────────────────────────────────── */

interface DoodleCardProps {
    children: React.ReactNode;
    as?: React.ElementType;
    href?: string;
    target?: string;
    className?: string;
    /** Seed for deterministic variation of decoration positions */
    seed?: number;
    /** Show diagonal hatching in bottom-right corner */
    showHatching?: boolean;
    /** Optional SVG illustration rendered in the right portion */
    illustration?: React.ReactNode;
}

/* Small plus-sign glyph positions (percentages) */
const PLUS_POOL = [
    { top: "6%", right: "5%" },
    { top: "22%", right: "3%" },
    { bottom: "18%", right: "4%" },
    { bottom: "6%", left: "6%" },
    { top: "4%", left: "35%" },
    { bottom: "10%", right: "30%" },
    { top: "40%", right: "2%" },
    { bottom: "4%", left: "20%" },
    { top: "15%", left: "3%" },
    { bottom: "35%", left: "4%" },
];

/* Tiny 4-point star positions */
const STAR_POOL = [
    { top: "3%", right: "2%" },
    { bottom: "5%", right: "3%" },
    { top: "10%", left: "3%" },
    { bottom: "12%", left: "2%" },
    { top: "4%", right: "25%" },
    { bottom: "8%", right: "40%" },
    { top: "50%", left: "2%" },
];

function seededShuffle<T>(arr: T[], seed: number): T[] {
    const out = [...arr];
    let s = seed;
    for (let i = out.length - 1; i > 0; i--) {
        s = (s * 16807 + 0) % 2147483647;
        const j = s % (i + 1);
        [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
}

export const DoodleCard = ({
    children,
    as: Component = "div",
    href,
    target,
    className = "",
    seed = 0,
    showHatching = true,
    illustration,
}: DoodleCardProps) => {
    const id = useId();
    const filterId = `sketch-${id.replace(/:/g, "")}`;
    const washId1 = `wash1-${id.replace(/:/g, "")}`;
    const washId2 = `wash2-${id.replace(/:/g, "")}`;

    // Pick 4-5 plus signs and 2-3 stars deterministically
    const plusCount = 4 + (seed % 2);
    const starCount = 2 + (seed % 2);
    const plusItems = useMemo(() => seededShuffle(PLUS_POOL, seed + 1).slice(0, plusCount), [seed, plusCount]);
    const starItems = useMemo(() => seededShuffle(STAR_POOL, seed + 7).slice(0, starCount), [seed, starCount]);

    const linkProps = href ? { href, target, rel: target === "_blank" ? "noopener noreferrer" : undefined } : {};

    return (
        <Component
            {...linkProps}
            className={`relative group block overflow-visible ${className}`}
            style={{
                background: "rgba(255, 248, 237, 0.5)",
                borderRadius: "1.25rem",
            }}
        >
            {/* ── Hand-drawn SVG border + watercolor washes ── */}
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
            >
                <defs>
                    <filter id={filterId} x="-5%" y="-5%" width="110%" height="110%">
                        <feTurbulence
                            type="turbulence"
                            baseFrequency="0.02"
                            numOctaves="4"
                            seed={seed * 3 + 1}
                            result="noise"
                        />
                        <feDisplacementMap
                            in="SourceGraphic"
                            in2="noise"
                            scale="4.5"
                            xChannelSelector="R"
                            yChannelSelector="G"
                        />
                    </filter>
                    {/* Watercolor wash gradients */}
                    <radialGradient id={washId1} cx="15%" cy="15%" r="35%">
                        <stop offset="0%" stopColor="var(--brand-accent)" stopOpacity="0.12" />
                        <stop offset="70%" stopColor="var(--brand-accent)" stopOpacity="0.04" />
                        <stop offset="100%" stopColor="var(--brand-accent)" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id={washId2} cx="85%" cy="85%" r="30%">
                        <stop offset="0%" stopColor="var(--brand-accent)" stopOpacity="0.1" />
                        <stop offset="60%" stopColor="var(--brand-accent)" stopOpacity="0.03" />
                        <stop offset="100%" stopColor="var(--brand-accent)" stopOpacity="0" />
                    </radialGradient>
                </defs>

                {/* Watercolor washes */}
                <ellipse cx="15%" cy="15%" rx="30%" ry="35%" fill={`url(#${washId1})`} />
                <ellipse cx="88%" cy="88%" rx="25%" ry="30%" fill={`url(#${washId2})`} />

                {/* Primary wobbly border — thick and visible */}
                <rect
                    x="1%"
                    y="1%"
                    width="98%"
                    height="98%"
                    rx="18"
                    ry="18"
                    fill="none"
                    stroke="var(--brand-dark)"
                    strokeWidth="3.5"
                    filter={`url(#${filterId})`}
                    opacity="0.5"
                />
                {/* Second pass for "re-traced" pen feel */}
                <rect
                    x="1.5%"
                    y="1.5%"
                    width="97%"
                    height="97%"
                    rx="16"
                    ry="16"
                    fill="none"
                    stroke="var(--brand-dark)"
                    strokeWidth="1.5"
                    filter={`url(#${filterId})`}
                    opacity="0.18"
                />
            </svg>

            {/* ── Scattered plus signs ── */}
            {plusItems.map((pos, i) => (
                <svg
                    key={`plus-${i}`}
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    className="absolute pointer-events-none z-[2]"
                    style={{ ...pos } as React.CSSProperties}
                    aria-hidden="true"
                >
                    <line x1="6" y1="1" x2="6" y2="11" stroke="var(--brand-dark)" strokeWidth="1.5" strokeLinecap="round" opacity="0.2" />
                    <line x1="1" y1="6" x2="11" y2="6" stroke="var(--brand-dark)" strokeWidth="1.5" strokeLinecap="round" opacity="0.2" />
                </svg>
            ))}

            {/* ── Tiny sparkle stars ── */}
            {starItems.map((pos, i) => (
                <svg
                    key={`star-${i}`}
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    className="absolute pointer-events-none z-[2] doodle-twinkle"
                    style={{ ...pos, animationDelay: `${i * 0.8}s` } as React.CSSProperties}
                    aria-hidden="true"
                >
                    <path
                        d="M8 1 L9.2 6 L14 8 L9.2 10 L8 15 L6.8 10 L2 8 L6.8 6 Z"
                        fill="var(--brand-accent)"
                        fillOpacity="0.4"
                        stroke="var(--brand-accent)"
                        strokeWidth="0.8"
                        opacity="0.55"
                    />
                </svg>
            ))}

            {/* ── Corner hatching (bottom-right) ── */}
            {showHatching && (
                <svg
                    width="44"
                    height="44"
                    viewBox="0 0 44 44"
                    className="absolute bottom-2 right-2 pointer-events-none z-[2]"
                    aria-hidden="true"
                >
                    <line x1="10" y1="44" x2="44" y2="10" stroke="var(--brand-dark)" strokeWidth="1.2" opacity="0.1" strokeLinecap="round" />
                    <line x1="16" y1="44" x2="44" y2="16" stroke="var(--brand-dark)" strokeWidth="1.2" opacity="0.1" strokeLinecap="round" />
                    <line x1="22" y1="44" x2="44" y2="22" stroke="var(--brand-dark)" strokeWidth="1.2" opacity="0.1" strokeLinecap="round" />
                    <line x1="28" y1="44" x2="44" y2="28" stroke="var(--brand-dark)" strokeWidth="1.2" opacity="0.1" strokeLinecap="round" />
                    <line x1="34" y1="44" x2="44" y2="34" stroke="var(--brand-dark)" strokeWidth="1.2" opacity="0.1" strokeLinecap="round" />
                </svg>
            )}

            {/* ── Illustration slot (right portion) ── */}
            {illustration && (
                <div className="absolute right-3 bottom-3 w-[35%] max-w-[180px] aspect-square pointer-events-none z-[2] opacity-0 group-hover:opacity-100 md:opacity-100 transition-opacity duration-700">
                    {illustration}
                </div>
            )}

            {/* ── Card content ── */}
            <div className="relative z-[3]">{children}</div>
        </Component>
    );
};

/* ─────────────────────────────────────────────────────────
   IconStarburst — Radial "glow" lines behind an icon
   ───────────────────────────────────────────────────────── */
export const IconStarburst = ({
    size = 48,
    color = "var(--brand-accent)",
    className = "",
}: {
    size?: number;
    color?: string;
    className?: string;
}) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        className={`absolute pointer-events-none ${className}`}
        aria-hidden="true"
    >
        {/* 8 radiating lines from center */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            const x2 = 24 + Math.cos(rad) * 20;
            const y2 = 24 + Math.sin(rad) * 20;
            const x1 = 24 + Math.cos(rad) * 8;
            const y1 = 24 + Math.sin(rad) * 8;
            return (
                <line
                    key={angle}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={color}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    opacity="0.3"
                />
            );
        })}
    </svg>
);

/* ─────────────────────────────────────────────────────────
   DoodleBadge — Lavender/purple pill badge with hand-drawn feel
   ───────────────────────────────────────────────────────── */
export const DoodleBadge = ({
    children,
    variant = "default",
    className = "",
}: {
    children: React.ReactNode;
    variant?: "default" | "accent";
    className?: string;
}) => {
    const bgColor = variant === "accent"
        ? "rgba(180, 165, 210, 0.35)"
        : "rgba(180, 165, 210, 0.25)";
    const borderColor = variant === "accent"
        ? "rgba(140, 120, 180, 0.5)"
        : "rgba(140, 120, 180, 0.35)";

    return (
        <span
            className={`inline-flex items-center px-4 py-2 text-[11px] font-mono font-bold uppercase tracking-wider relative ${className}`}
            style={{
                background: bgColor,
                border: `1.8px solid ${borderColor}`,
                /* Irregular radius for hand-drawn feel */
                borderRadius: "10px 12px 8px 11px",
                color: "var(--brand-dark)",
                /* Slight rotation for organic feel */
                transform: `rotate(${variant === "accent" ? "-1" : "0.5"}deg)`,
            }}
        >
            {children}
        </span>
    );
};

/* ─────────────────────────────────────────────────────────
   DoodleApproachBox — Approach section with sketchy border
   ───────────────────────────────────────────────────────── */
export const DoodleApproachBox = ({
    label,
    children,
    className = "",
}: {
    label: string;
    children: React.ReactNode;
    className?: string;
}) => (
    <div
        className={`relative mt-auto ${className}`}
        style={{
            border: "1.8px solid rgba(49, 39, 38, 0.18)",
            borderRadius: "8px 10px 7px 9px",
            padding: "14px 16px",
            background: "rgba(255, 248, 237, 0.4)",
        }}
    >
        <span
            className="text-[10px] font-mono font-bold uppercase tracking-wider text-text-primary mb-2 inline-block px-2.5 py-1"
            style={{
                background: "rgba(255, 248, 237, 0.95)",
                border: "1.5px solid rgba(49, 39, 38, 0.22)",
                borderRadius: "4px 6px 4px 5px",
                marginBottom: "8px",
            }}
        >
            {label}
        </span>
        <div className="text-text-muted text-xs font-mono leading-relaxed">{children}</div>
    </div>
);
