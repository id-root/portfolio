"use client";

import { useId } from "react";
import { motion } from "framer-motion";

interface SVGFillerCardProps {
    label: string;       // e.g. "More on GitHub"
    sublabel: string;    // e.g. "View all projects →"
    variant?: "github" | "library";
    seed?: number;
}

const WATERCOLOR_SETS = [
    [
        { d: "M 50 50 C 150 20, 250 80, 200 150 C 150 220, 30 180, 50 50 Z", fill: "#fdf1c3", opacity: 0.5 },
        { d: "M 650 200 C 750 160, 820 240, 780 300 C 710 350, 610 270, 650 200 Z", fill: "#eee5ff", opacity: 0.45 },
    ],
    [
        { d: "M 80 30 C 180 10, 220 100, 160 140 C 100 180, 40 120, 80 30 Z", fill: "#eee5ff", opacity: 0.45 },
        { d: "M 600 220 C 700 180, 780 270, 740 320 C 660 360, 560 280, 600 220 Z", fill: "#fdf1c3", opacity: 0.5 },
    ],
];

/* Tiny GitHub octocat-inspired doodle */
const GithubDoodle = () => (
    <g transform="translate(340, 140)">
        {/* Body */}
        <circle cx="0" cy="0" r="52" fill="#f5f0ff" stroke="#2d2822" strokeWidth="3.5" />
        {/* Head bump */}
        <ellipse cx="0" cy="-14" rx="30" ry="26" fill="#fdfcfb" stroke="#2d2822" strokeWidth="3" />
        {/* Eyes */}
        <circle cx="-10" cy="-18" r="4" fill="#2d2822" opacity="0.8" />
        <circle cx="10" cy="-18" r="4" fill="#2d2822" opacity="0.8" />
        {/* Smile */}
        <path d="M -10 -6 Q 0 0 10 -6" fill="none" stroke="#2d2822" strokeWidth="2.5" strokeLinecap="round" />
        {/* Tentacle arms */}
        <path d="M -30 10 Q -55 20 -50 40 Q -45 55 -30 50" fill="none" stroke="#2d2822" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 30 10 Q 55 20 50 40 Q 45 55 30 50" fill="none" stroke="#2d2822" strokeWidth="2.5" strokeLinecap="round" />
        {/* Tail */}
        <path d="M -15 26 Q -5 42 0 52 Q 5 42 15 26" fill="none" stroke="#2d2822" strokeWidth="2.5" strokeLinecap="round" />
        {/* Stars around */}
        <path d="M 68 -30 L 71 -22 L 79 -19 L 71 -16 L 68 -8 L 65 -16 L 57 -19 L 65 -22 Z" fill="#f6dc84" stroke="#2d2822" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M -70 -10 L -68 -5 L -63 -3 L -68 -1 L -70 4 L -72 -1 L -77 -3 L -72 -5 Z" fill="#e8e2f8" stroke="#2d2822" strokeWidth="1" strokeLinejoin="round" />
    </g>
);

/* Book / library doodle */
const LibraryDoodle = () => (
    <g transform="translate(300, 115)">
        {/* Stack of books */}
        <rect x="0" y="80" width="120" height="22" rx="4" fill="#faeac4" stroke="#2d2822" strokeWidth="3" />
        <rect x="8" y="58" width="105" height="24" rx="4" fill="#e8e2f8" stroke="#2d2822" strokeWidth="3" />
        <rect x="4" y="36" width="112" height="24" rx="4" fill="#fdf1c3" stroke="#2d2822" strokeWidth="3" />
        {/* Spine lines */}
        <line x1="18" y1="80" x2="18" y2="102" stroke="#2d2822" strokeWidth="1.5" opacity="0.35" />
        <line x1="20" y1="58" x2="20" y2="82" stroke="#2d2822" strokeWidth="1.5" opacity="0.35" />
        <line x1="16" y1="36" x2="16" y2="60" stroke="#2d2822" strokeWidth="1.5" opacity="0.35" />
        {/* Open book on top */}
        <path d="M 20 10 Q 60 0 100 10 L 100 38 Q 60 28 20 38 Z" fill="#fdfcfb" stroke="#2d2822" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M 60 10 L 60 38" stroke="#2d2822" strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />
        <line x1="28" y1="18" x2="55" y2="15" stroke="#2d2822" strokeWidth="1" opacity="0.2" />
        <line x1="28" y1="24" x2="55" y2="21" stroke="#2d2822" strokeWidth="1" opacity="0.2" />
        <line x1="28" y1="30" x2="50" y2="28" stroke="#2d2822" strokeWidth="1" opacity="0.2" />
        {/* Stars */}
        <path d="M 135 25 L 138 33 L 146 36 L 138 39 L 135 47 L 132 39 L 124 36 L 132 33 Z" fill="#f6dc84" stroke="#2d2822" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M -8 55 L -6 60 L -1 62 L -6 64 L -8 69 L -10 64 L -15 62 L -10 60 Z" fill="#e8e2f8" stroke="#2d2822" strokeWidth="1" strokeLinejoin="round" />
    </g>
);

export const SVGFillerCard = ({ label, sublabel, variant = "github", seed = 0 }: SVGFillerCardProps) => {
    const uid = useId().replace(/:/g, "");
    const blobs = WATERCOLOR_SETS[seed % WATERCOLOR_SETS.length];
    const viewH = 420;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 950 ${viewH}`}
            width="100%"
            height="100%"
            className="block svg-card"
            aria-hidden="true"
        >
            <defs>
                <filter id={`wc-f-${uid}`} x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
                </filter>
                <filter id={`sk-f-${uid}`} x="-10%" y="-10%" width="120%" height="120%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" seed={seed * 5 + 1} />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
                </filter>
                {/* Dashed border pattern */}
                <pattern id={`dash-${uid}`} patternUnits="userSpaceOnUse" width="18" height="1">
                    <line x1="0" y1="0.5" x2="10" y2="0.5" stroke="#c4a882" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
                </pattern>
            </defs>

            {/* Watercolor blobs */}
            {blobs.map((b, i) => (
                <path key={i} d={b.d} fill={b.fill} filter={`url(#wc-f-${uid})`} opacity={b.opacity} />
            ))}

            {/* Shadow border */}
            <rect x="25" y="25" width="900" height={viewH - 50} rx="35" fill="none" stroke="#3d3730" strokeWidth="1.5" opacity="0.25" filter={`url(#sk-f-${uid})`} transform={`rotate(0.5 475 ${viewH / 2})`} />
            {/* Main border — dashed to signal "see more" */}
            <rect x="25" y="25" width="900" height={viewH - 50} rx="30" fill="#f6f1e8" stroke="#c4a882" strokeWidth="2.5" strokeDasharray="14 8" filter={`url(#sk-f-${uid})`} />

            {/* Corner hatching */}
            <path d={`M 35 ${viewH - 70} Q 42 ${viewH - 60} 52 ${viewH - 52} M 900 80 Q 905 100 905 120`} stroke="#c4a882" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5" filter={`url(#sk-f-${uid})`} />

            {/* Illustration */}
            {variant === "github" ? <GithubDoodle /> : <LibraryDoodle />}

            {/* Label */}
            <text x="80" y="175" className="font-gamja" fontWeight="400" fontSize="42" fill="#2d2822">{label}</text>
            {/* Underline squiggle */}
            <path d={`M 75 192 Q 155 187 235 194 T 395 192`} fill="none" stroke="#c4a882" strokeWidth="3.5" strokeLinecap="round" filter={`url(#sk-f-${uid})`} />

            {/* Sublabel */}
            <text x="80" y="240" className="font-figtree" fontWeight="400" fontSize="22" fill="#555" opacity="0.85">{sublabel}</text>

            {/* Arrow CTA */}
            <g transform="translate(80, 295)">
                <rect x="0" y="0" width="200" height="46" rx="23" fill="#312726" filter={`url(#sk-f-${uid})`} />
                <rect x="3" y="3" width="200" height="46" rx="23" fill="#312726" opacity="0.15" />
                <text x="28" y="29" className="font-figtree" fontWeight="600" fontSize="17" fill="#FFF8ED" letterSpacing="1">
                    {variant === "github" ? "GitHub →" : "Library →"}
                </text>
            </g>

            {/* Decorative plus marks */}
            <path d="M 510 310 L 520 310 M 515 305 L 515 315" stroke="#c4a882" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
            <path d="M 840 340 L 850 340 M 845 335 L 845 345" stroke="#c4a882" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
            <path d="M 870 130 L 880 130 M 875 125 L 875 135" stroke="#c4a882" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        </svg>
    );
};
