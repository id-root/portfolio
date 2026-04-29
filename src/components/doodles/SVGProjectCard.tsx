"use client";

import { useId } from "react";
import { wrapText, icons } from "./svg-helpers";
import { illustrationMap } from "./svg-illustrations";

interface SVGProjectCardProps {
    title: string;
    status: string;
    problem: string;
    approach: string;
    link: string;
    icon: "lock" | "shield" | "database" | "radio";
    seed?: number;
    highlightText?: string;
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

export const SVGProjectCard = ({
    title, status, problem, approach, icon, seed = 0, highlightText, wide = false,
}: SVGProjectCardProps) => {
    const uid = useId().replace(/:/g, "");
    const descLines = wrapText(problem, 46);
    const approachLines = wrapText(approach, 36);
    const approachBoxH = 40 + approachLines.length * 27;
    const descEndY = 240 + (descLines.length - 1) * 40;
    const approachLabelY = descEndY + 55;
    const approachBoxY = approachLabelY + 28;
    const viewH = Math.max(520, approachBoxY + approachBoxH + 35);
    const blobs = WATERCOLOR_SETS[seed % WATERCOLOR_SETS.length];
    // wide = last-odd card spanning 2 columns — double width, same height
    const cardW = wide ? 1900 : 950;
    const rx = wide ? 950 : 0; // right-side x offset
    const titleUnderlineW = Math.min(title.length * 16, 200);

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
            {/* Main border */}
            <rect x="25" y="25" width={cardW - 50} height={viewH - 50} rx="30" fill="#f6f1e8" stroke="#2d2822" strokeWidth="3" filter={`url(#sk-${uid})`} />

            {/* Corner hatching */}
            <path d={`M 35 ${viewH - 80} Q 40 ${viewH - 70} 50 ${viewH - 60} M 45 ${viewH - 55} Q 55 ${viewH - 50} 65 ${viewH - 45} M 30 ${viewH - 60} Q 35 ${viewH - 50} 45 ${viewH - 45} M ${cardW - 50} 80 Q ${cardW - 45} 100 ${cardW - 45} 120 M ${cardW - 48} 110 Q ${cardW - 45} 150 ${cardW - 45} 180`} stroke="#2d2822" strokeWidth="1.5" fill="none" strokeLinecap="round" filter={`url(#sk-${uid})`} />

            {/* Icon */}
            <g filter={`url(#sk-${uid})`}>
                {icons[icon]}
            </g>

            {/* Title */}
            <text x="80" y="165" className="font-gamja" fontWeight="400" fontSize="44" fill="#2d2822">{title}</text>

            {/* Title underline */}
            <path d={`M 75 182 Q ${75 + titleUnderlineW * 0.25} 177 ${75 + titleUnderlineW * 0.5} 184 T ${75 + titleUnderlineW} 182`} fill="none" stroke="#715be0" strokeWidth="4" strokeLinecap="round" filter={`url(#sk-${uid})`} />

            {/* Status badge — top-right, shifted up */}
            <rect x={680 + rx} y="60" width="185" height="48" rx="15" fill="#e8e2f8" stroke="#2d2822" strokeWidth="3" filter={`url(#sk-${uid})`} />
            <rect x={675 + rx} y="55" width="185" height="48" rx="15" fill="#fdfcfb" stroke="#2d2822" strokeWidth="3" filter={`url(#sk-${uid})`} />
            <text x={695 + rx} y="85" className="font-figtree" fontWeight="600" fontSize="20" fill="#2d2822">{status.toUpperCase()}</text>

            {/* Badge decorative lines */}
            <line x1={868 + rx} y1="45" x2={878 + rx} y2="35" stroke="#715be0" strokeWidth="3" strokeLinecap="round" />
            <line x1={883 + rx} y1="60" x2={898 + rx} y2="50" stroke="#715be0" strokeWidth="3" strokeLinecap="round" />

            {/* Curly arrow to badge */}
            <path d={`M ${590 + rx} 145 C ${610 + rx} 125, ${625 + rx} 155, ${640 + rx} 130 C ${650 + rx} 110, ${660 + rx} 95, ${668 + rx} 82`} fill="none" stroke="#2d2822" strokeWidth="2.5" strokeLinecap="round" filter={`url(#sk-${uid})`} />
            <path d={`M ${658 + rx} 87 L ${671 + rx} 80 L ${666 + rx} 94`} fill="none" stroke="#2d2822" strokeWidth="2.5" strokeLinecap="round" />
            <path d={`M ${568 + rx} 150 L ${578 + rx} 150 M ${573 + rx} 145 L ${573 + rx} 155`} stroke="#2d2822" strokeWidth="1.5" />

            {/* Description text */}
            {descLines.map((line, i) => {
                if (highlightText && line.includes(highlightText)) {
                    const idx = line.indexOf(highlightText);
                    const before = line.slice(0, idx);
                    const hl = highlightText;
                    const after = line.slice(idx + hl.length);
                    const hlX = 80 + before.length * 11.5;
                    const hlW = hl.length * 11.5;
                    return (
                        <g key={i}>
                            <path d={`M ${hlX} ${245 + i * 40} Q ${hlX + hlW / 2} ${248 + i * 40} ${hlX + hlW} ${244 + i * 40}`} fill="none" stroke="#f6dc84" strokeWidth="6" strokeLinecap="round" filter={`url(#sk-${uid})`} />
                            <text x="80" y={240 + i * 40} className="font-figtree" fontWeight="400" fontSize="24" fill="#2d2822">{line}</text>
                        </g>
                    );
                }
                return <text key={i} x="80" y={240 + i * 40} className="font-figtree" fontWeight="400" fontSize="24" fill="#2d2822">{line}</text>;
            })}

            {/* Approach curly arrow */}
            <path d={`M 50 ${approachLabelY - 5} Q 45 ${approachLabelY + 15} 65 ${approachLabelY + 15}`} fill="none" stroke="#715be0" strokeWidth="2.5" strokeLinecap="round" />
            <path d={`M 60 ${approachLabelY + 10} L 68 ${approachLabelY + 15} L 60 ${approachLabelY + 20}`} fill="none" stroke="#715be0" strokeWidth="2.5" strokeLinecap="round" />

            {/* Approach label */}
            <rect x="85" y={approachLabelY - 2} width="130" height="35" rx="8" fill="#e6daba" opacity="0.4" />
            <rect x="83" y={approachLabelY - 5} width="130" height="35" rx="8" fill="#fdfcfb" stroke="#2d2822" strokeWidth="2.5" filter={`url(#sk-${uid})`} />
            <text x="96" y={approachLabelY + 18} className="font-gamja" fontWeight="400" fontSize="19" fill="#2d2822">APPROACH</text>

            {/* Approach box (double layered) */}
            <rect x="83" y={approachBoxY - 2} width="430" height={approachBoxH} rx="15" fill="#fcf6e5" stroke="#2d2822" strokeWidth="1" opacity="0.3" filter={`url(#sk-${uid})`} transform={`rotate(-0.5 300 ${approachBoxY + approachBoxH / 2})`} />
            <rect x="85" y={approachBoxY} width="430" height={approachBoxH} rx="15" fill="#fcf6e5" stroke="#ccc5b3" strokeWidth="2" filter={`url(#sk-${uid})`} transform={`rotate(1 300 ${approachBoxY + approachBoxH / 2})`} />

            {/* Approach text */}
            {approachLines.map((line, i) => (
                <text key={i} x="110" y={approachBoxY + 30 + i * 27} className="font-figtree" fontWeight="400" fontSize="16" fill="#3d3730">{line}</text>
            ))}

            {/* Illustration — shifts right when wide */}
            <g transform={`translate(${rx}, 0)`}>
                {illustrationMap[title]}
            </g>
        </svg>
    );
};
