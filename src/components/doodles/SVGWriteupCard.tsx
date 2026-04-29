"use client";

import { useId } from "react";
import { wrapText } from "./svg-helpers";

interface SVGWriteupCardProps {
    title: string;
    category: string;
    tags: string[];
    summary: string;
    seed?: number;
    wide?: boolean;
}

const WATERCOLOR_SETS = [
    [
        { d: "M 50 50 C 150 20, 250 80, 200 150 C 150 220, 30 180, 50 50 Z", fill: "#fdf1c3", opacity: 0.7 },
        { d: "M 650 350 C 750 300, 850 400, 800 480 C 700 550, 600 450, 650 350 Z", fill: "#faeac4", opacity: 0.8 },
        { d: "M 700 80 C 780 60, 820 120, 780 160 C 720 200, 660 140, 700 80 Z", fill: "#eee5ff", opacity: 0.5 },
    ],
    [
        { d: "M 80 30 C 180 10, 220 100, 160 140 C 100 180, 40 120, 80 30 Z", fill: "#eee5ff", opacity: 0.5 },
        { d: "M 600 380 C 700 340, 800 430, 750 490 C 650 540, 550 450, 600 380 Z", fill: "#fdf1c3", opacity: 0.7 },
        { d: "M 720 50 C 800 30, 840 100, 790 140 C 730 180, 670 110, 720 50 Z", fill: "#faeac4", opacity: 0.6 },
    ],
    [
        { d: "M 40 80 C 130 40, 200 130, 140 180 C 80 230, 10 160, 40 80 Z", fill: "#faeac4", opacity: 0.6 },
        { d: "M 680 320 C 780 280, 850 380, 810 450 C 730 510, 630 420, 680 320 Z", fill: "#eee5ff", opacity: 0.5 },
        { d: "M 660 100 C 740 70, 790 150, 740 180 C 680 220, 620 150, 660 100 Z", fill: "#fdf1c3", opacity: 0.7 },
    ],
];

/* Research illustration: magnifying glass + notebook — positioned at right of card */
const ResearchIll = () => (
    <g transform="translate(720, 210)">
        <circle cx="60" cy="55" r="42" fill="#fdfcfb" stroke="#2d2822" strokeWidth="4" />
        <circle cx="60" cy="55" r="34" fill="none" stroke="#2d2822" strokeWidth="1.5" opacity="0.4" />
        <path d="M 38 45 Q 50 33 62 45" fill="none" stroke="#d5cebc" strokeWidth="3" strokeLinecap="round" />
        <path d="M 43 67 Q 60 55 77 67" fill="none" stroke="#d5cebc" strokeWidth="3" strokeLinecap="round" />
        <rect x="55" y="97" width="10" height="42" rx="4" fill="#e8e2f8" stroke="#2d2822" strokeWidth="3" />
        <g transform="translate(100, 80) rotate(-10)" opacity="0.7">
            <rect x="0" y="0" width="70" height="90" rx="4" fill="#fdfcfb" stroke="#2d2822" strokeWidth="2.5" />
            <line x1="14" y1="0" x2="14" y2="90" stroke="#2d2822" strokeWidth="1.5" opacity="0.4" />
            <line x1="20" y1="16" x2="62" y2="16" stroke="#2d2822" strokeWidth="1.2" opacity="0.2" />
            <line x1="20" y1="28" x2="62" y2="28" stroke="#2d2822" strokeWidth="1.2" opacity="0.2" />
            <line x1="20" y1="40" x2="62" y2="40" stroke="#2d2822" strokeWidth="1.2" opacity="0.2" />
            <line x1="20" y1="52" x2="55" y2="52" stroke="#2d2822" strokeWidth="1.2" opacity="0.2" />
        </g>
        <path d="M 155 20 L 158 10 L 161 20 L 171 23 L 161 26 L 158 36 L 155 26 L 145 23 Z" fill="#f6dc84" stroke="#2d2822" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M 5 125 L 15 125 M 10 120 L 10 130" stroke="#2d2822" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
        <path d="M 185 95 L 195 95 M 190 90 L 190 100" stroke="#2d2822" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    </g>
);

/* Write-up illustration: terminal + flag + trophy */
const WriteupIll = () => (
    <g transform="translate(730, 210)">
        <rect x="0" y="0" width="100" height="75" rx="6" fill="#fdfcfb" stroke="#2d2822" strokeWidth="3" />
        <line x1="0" y1="18" x2="100" y2="18" stroke="#2d2822" strokeWidth="1.5" opacity="0.3" />
        <circle cx="10" cy="9" r="3" fill="#2d2822" opacity="0.2" />
        <circle cx="20" cy="9" r="3" fill="#2d2822" opacity="0.2" />
        <circle cx="30" cy="9" r="3" fill="#2d2822" opacity="0.2" />
        <path d="M 10 30 L 20 38 L 10 46" stroke="#715be0" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <line x1="26" y1="38" x2="65" y2="38" stroke="#2d2822" strokeWidth="1.5" opacity="0.25" strokeLinecap="round" />
        <path d="M 10 54 L 20 62 L 10 70" stroke="#715be0" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <line x1="26" y1="62" x2="75" y2="62" stroke="#2d2822" strokeWidth="1.5" opacity="0.25" strokeLinecap="round" />
        <line x1="145" y1="5" x2="145" y2="85" stroke="#2d2822" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
        <path d="M 145 8 L 195 20 L 145 46" fill="#e8e2f8" stroke="#2d2822" strokeWidth="2" strokeLinejoin="round" />
        <path d="M 35 105 L 35 90 C 35 80 90 80 90 90 L 90 105 C 90 124 62 138 62 138 C 62 138 35 124 35 105 Z" fill="#faeac4" stroke="#2d2822" strokeWidth="2" strokeLinejoin="round" />
        <line x1="45" y1="142" x2="80" y2="142" stroke="#2d2822" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
        <line x1="62" y1="138" x2="62" y2="142" stroke="#2d2822" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
        <path d="M 62 107 L 65 101 L 68 107 L 74 107 L 69 111 L 71 118 L 62 113 L 53 118 L 55 111 L 50 107 L 56 107 L 59 101 Z" fill="#f6dc84" stroke="#2d2822" strokeWidth="0.8" opacity="0.7" />
        <path d="M 165 82 L 168 72 L 171 82 L 181 85 L 171 88 L 168 98 L 165 88 L 155 85 Z" fill="#f6dc84" stroke="#2d2822" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M 0 92 L 10 92 M 5 87 L 5 97" stroke="#2d2822" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
        <path d="M 195 130 L 205 130 M 200 125 L 200 135" stroke="#2d2822" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
    </g>
);

const IllMap: Record<string, () => React.ReactElement> = {
    Research: ResearchIll,
    "Write-up": WriteupIll,
};

export const SVGWriteupCard = ({
    title, category, tags, summary, seed = 0, wide = false
}: SVGWriteupCardProps) => {
    const uid = useId().replace(/:/g, "");
    const descLines = wrapText(summary, 48);
    const descEndY = 240 + (descLines.length - 1) * 40;
    const tagsY = Math.max(descEndY + 60, 380);
    const viewH = Math.max(520, tagsY + 110);
    const blobs = WATERCOLOR_SETS[seed % WATERCOLOR_SETS.length];
    const titleUnderlineW = Math.min(title.length * 13, 440);
    const cardW = wide ? 1900 : 950;
    const rx = wide ? 950 : 0; // right-side x offset
    const badgeFill = category === "Research" ? "#fdf1c3" : "#e8e2f8";
    const Ill = IllMap[category];

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 ${cardW} ${viewH}`}
            width="100%"
            height="100%"
            className="block svg-card"
        >
            <defs>
                <filter id={`wc-${uid}`} x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
                </filter>
                <filter id={`sk-${uid}`} x="-10%" y="-10%" width="120%" height="120%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" seed={seed * 7 + 3} />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
                </filter>
            </defs>

            {/* Watercolor blobs */}
            {blobs.map((b, i) => (
                <path key={i} d={b.d} fill={b.fill} filter={`url(#wc-${uid})`} opacity={b.opacity} />
            ))}

            {/* Shadow border */}
            <rect x="25" y="25" width={cardW - 50} height={viewH - 50} rx="35" fill="none" stroke="#3d3730" strokeWidth="2" opacity="0.5" filter={`url(#sk-${uid})`} transform={`rotate(0.5 ${cardW / 2} ${viewH / 2})`} />
            {/* Main card border + fill */}
            <rect x="25" y="25" width={cardW - 50} height={viewH - 50} rx="30" fill="#f6f1e8" stroke="#2d2822" strokeWidth="3" filter={`url(#sk-${uid})`} />

            {/* Corner hatching */}
            <path d={`M 35 ${viewH - 80} Q 40 ${viewH - 70} 50 ${viewH - 60} M 45 ${viewH - 55} Q 55 ${viewH - 50} 65 ${viewH - 45} M 30 ${viewH - 60} Q 35 ${viewH - 50} 45 ${viewH - 45} M ${cardW - 50} 80 Q ${cardW - 45} 100 ${cardW - 45} 120 M ${cardW - 48} 110 Q ${cardW - 45} 150 ${cardW - 45} 180`} stroke="#2d2822" strokeWidth="1.5" fill="none" strokeLinecap="round" filter={`url(#sk-${uid})`} />

            {/* Title */}
            <text x="80" y="152" className="font-gamja" fontWeight="400" fontSize="40" fill="#2d2822">{title}</text>
            <path d={`M 75 168 Q ${75 + titleUnderlineW * 0.25} 163 ${75 + titleUnderlineW * 0.5} 170 T ${75 + titleUnderlineW} 168`} fill="none" stroke="#715be0" strokeWidth="4" strokeLinecap="round" filter={`url(#sk-${uid})`} />

            {/* Category Badge — top-right, raised */}
            <rect x={700 + rx} y="55" width="195" height="48" rx="15" fill={badgeFill} stroke="#2d2822" strokeWidth="3" filter={`url(#sk-${uid})`} />
            <rect x={695 + rx} y="50" width="195" height="48" rx="15" fill="#fdfcfb" stroke="#2d2822" strokeWidth="3" filter={`url(#sk-${uid})`} />
            <text x={715 + rx} y="80" className="font-gamja" fontWeight="400" fontSize="20" fill="#2d2822">{category.toUpperCase()}</text>

            {/* Badge accent dashes */}
            <line x1={893 + rx} y1="40" x2={903 + rx} y2="30" stroke="#715be0" strokeWidth="3" strokeLinecap="round" />
            <line x1={908 + rx} y1="55" x2={923 + rx} y2="45" stroke="#715be0" strokeWidth="3" strokeLinecap="round" />

            {/* Summary lines */}
            {descLines.map((line, i) => (
                <text key={i} x="80" y={225 + i * 38} className="font-figtree" fontWeight="400" fontSize="22" fill="#2d2822">{line}</text>
            ))}

            {/* Tags Box — tags only, no date */}
            <rect x="78" y={tagsY - 2} width="520" height="65" rx="12" fill="#fcf6e5" stroke="#2d2822" strokeWidth="1" opacity="0.3" filter={`url(#sk-${uid})`} transform={`rotate(-0.5 340 ${tagsY + 32})`} />
            <rect x="80" y={tagsY} width="520" height="65" rx="12" fill="#fcf6e5" stroke="#ccc5b3" strokeWidth="2" filter={`url(#sk-${uid})`} transform={`rotate(0.5 340 ${tagsY + 32})`} />
            <text x="105" y={tagsY + 41} className="font-figtree" fontWeight="500" fontSize="20" fill="#715be0">
                {tags.map(t => `#${t.toLowerCase().replace(/ /g, "_")}`).join("  ")}
            </text>

            {/* Illustration — shifts right when wide */}
            {Ill && (
                <g transform={`translate(${rx}, 0)`}>
                    <Ill />
                </g>
            )}
        </svg>
    );
};
