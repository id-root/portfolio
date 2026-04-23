"use client";

import { useRef, useId } from "react";
import { motion, useScroll, useTransform, useSpring, useVelocity } from "framer-motion";
import Image from "next/image";

const myAccomplishments = [
    { tempId: 0, image: "/badges/aoc2024.png", title: "Advent of Cyber 2024", desc: "Completed TryHackMe's annual event" },
    { tempId: 1, image: "/badges/aoc2025.png", title: "Advent of Cyber 2025", desc: "Completed TryHackMe's annual event" },
    { tempId: 2, image: "/badges/sidequest.png", title: "Side Quest 2025", desc: "Completed advanced challenge track" },
    { tempId: 3, image: "/badges/pentest101.png", title: "Penetration 101", desc: "Foundations of penetration testing" },
    { tempId: 4, image: "/badges/osint.png", title: "OSINT", desc: "Open-source intelligence gathering" },
    { tempId: 5, image: "/badges/apihacking.png", title: "API Hacking", desc: "API security testing methodology" },
];

/* ─────────────────────────────────────────────────────────
   Single unified SVG: ring + string + card all drawn together
   ViewBox: 0 0 280 460  (top 80px = hanger, bottom 380px = card)
   ───────────────────────────────────────────────────────── */
const DoodleHangerCard = ({ seed = 0, children }: { seed: number; children: React.ReactNode }) => {
    const uid = useId().replace(/:/g, "");

    /* Per-seed watercolor blob variation */
    const BLOBS = [
        [
            { d: "M 30 90 C 110 60 220 110 190 185 C 160 255 40 220 30 90 Z", fill: "#fdf1c3", op: 0.65 },
            { d: "M 170 300 C 250 270 310 360 265 420 C 220 470 140 420 170 300 Z", fill: "#eee5ff", op: 0.55 },
        ],
        [
            { d: "M 20 95 C 100 65 230 100 200 185 C 170 260 30 225 20 95 Z", fill: "#eee5ff", op: 0.5 },
            { d: "M 160 290 C 250 260 310 360 260 415 C 210 460 130 415 160 290 Z", fill: "#faeac4", op: 0.6 },
        ],
        [
            { d: "M 25 88 C 110 58 225 108 195 188 C 165 258 35 222 25 88 Z", fill: "#faeac4", op: 0.6 },
            { d: "M 175 305 C 255 272 315 362 268 422 C 222 468 142 422 175 305 Z", fill: "#fdf1c3", op: 0.6 },
        ],
    ];
    const blobs = BLOBS[seed % BLOBS.length];

    /* Hand-drawn ring path — organic cubic beziers, NOT a perfect circle */
    /* Center: (140, 28), radius ~18 — slightly wobbly */
    const ringPath = `
        M 140 10
        C 152 9,  160 15, 160 28
        C 161 40, 152 47, 140 47
        C 127 48, 119 41, 119 28
        C 118 15, 127 9,  140 10
        Z
    `;
    /* Inner highlight arc */
    const ringHighlight = `M 129 14 Q 140 10 151 14`;

    /* String path: slightly wobbly line from ring bottom (140,47) to card top center (140,80) */
    const stringPath = `M 140 47 C 138 57, 142 66, 140 80`;

    /* Card border: hand-drawn rounded rect starting at y=80 */
    /* W=260 centered in 280px viewport, so x=10..270, y=80..445 */
    const CARD_SEED = seed * 3 + 1;

    /* Plus positions (relative to card interior) */
    const pluses = [
        { x: 252, y: 100 }, { x: 18, y: 340 }, { x: 258, y: 270 }, { x: 22, y: 115 },
        { x: 252, y: 420 }, { x: 22, y: 420 },
    ];
    /* Sparkle star positions */
    const stars = [
        { x: 258, y: 125 }, { x: 18, y: 390 },
    ];

    return (
        <div className="relative" style={{ width: 280, height: 460 }}>
            {/* Single unified SVG */}
            <svg
                viewBox="0 0 280 460"
                width={280}
                height={460}
                className="absolute inset-0 pointer-events-none"
                aria-hidden="true"
            >
                <defs>
                    <filter id={`wc-${uid}`} x="-60%" y="-60%" width="220%" height="220%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="13" />
                    </filter>
                    <filter id={`sk-${uid}`} x="-10%" y="-10%" width="120%" height="120%">
                        <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="4" result="noise" seed={CARD_SEED} />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.8" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                    {/* Stronger filter for hanger elements */}
                    <filter id={`hsk-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
                        <feTurbulence type="fractalNoise" baseFrequency="0.07" numOctaves="3" result="noise" seed={seed * 7 + 5} />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.5" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                </defs>

                {/* ── Watercolor blobs (inside card area) ── */}
                {blobs.map((b, i) => (
                    <path key={i} d={b.d} fill={b.fill} filter={`url(#wc-${uid})`} opacity={b.op} />
                ))}

                {/* ── Hanger ring — hand-drawn organic path ── */}
                {/* Second wobbled shadow ring for depth */}
                <path d={ringPath} fill="none" stroke="#2c2c2c" strokeWidth="1.5"
                    opacity="0.3" filter={`url(#hsk-${uid})`} transform="translate(1.5, 1.5)" />
                {/* Main ring */}
                <path d={ringPath} fill="#fffdf9" stroke="#1c1c1c" strokeWidth="3"
                    filter={`url(#hsk-${uid})`} />
                {/* Inner ring re-traced (pen re-trace feel) */}
                <path d={ringPath} fill="none" stroke="#1c1c1c" strokeWidth="1.2"
                    filter={`url(#hsk-${uid})`} opacity="0.25"
                    transform={`translate(${(seed % 3) - 1}, ${(seed % 2)})`} />
                {/* Highlight inside ring */}
                <path d={ringHighlight} fill="none" stroke="#fffdf9" strokeWidth="2"
                    strokeLinecap="round" opacity="0.7" />

                {/* ── String from ring to card ── */}
                {/* Shadow */}
                <path d={stringPath} stroke="#748D92" strokeWidth="2.5"
                    fill="none" strokeLinecap="round" opacity="0.4"
                    filter={`url(#hsk-${uid})`} transform="translate(1, 0)" />
                {/* Main string */}
                <path d={stringPath} stroke="#748D92" strokeWidth="2.2"
                    fill="none" strokeLinecap="round"
                    filter={`url(#hsk-${uid})`} />

                {/* ── Card shadow border ── */}
                <rect x="12" y="82" width="258" height="368" rx="24"
                    fill="none" stroke="#2c2c2c" strokeWidth="1.8" opacity="0.4"
                    filter={`url(#sk-${uid})`} transform="rotate(0.5 140 266)" />

                {/* ── Main card border + fill ── */}
                <rect x="10" y="80" width="260" height="370" rx="22"
                    fill="#fffdf9" stroke="#1c1c1c" strokeWidth="3"
                    filter={`url(#sk-${uid})`} />

                {/* Second pass for re-traced pen feel */}
                <rect x="11" y="81" width="258" height="368" rx="20"
                    fill="none" stroke="#1c1c1c" strokeWidth="1"
                    filter={`url(#sk-${uid})`} opacity="0.15"
                    transform={`translate(${(seed % 2) * 0.5}, 0)`} />

                {/* ── Plus signs ── */}
                {pluses.map((p, i) => (
                    <g key={i}>
                        <line x1={p.x - 5} y1={p.y} x2={p.x + 5} y2={p.y}
                            stroke="#1c1c1c" strokeWidth="1.4" strokeLinecap="round" opacity="0.18" />
                        <line x1={p.x} y1={p.y - 5} x2={p.x} y2={p.y + 5}
                            stroke="#1c1c1c" strokeWidth="1.4" strokeLinecap="round" opacity="0.18" />
                    </g>
                ))}

                {/* ── 4-point sparkle stars ── */}
                {stars.map((s, i) => (
                    <path key={i}
                        d={`M${s.x} ${s.y - 7}L${s.x + 1.5} ${s.y - 1.5}L${s.x + 7} ${s.y}L${s.x + 1.5} ${s.y + 1.5}L${s.x} ${s.y + 7}L${s.x - 1.5} ${s.y + 1.5}L${s.x - 7} ${s.y}L${s.x - 1.5} ${s.y - 1.5}Z`}
                        fill="#f6dc84" fillOpacity="0.55" stroke="#C4A882" strokeWidth="0.8" opacity="0.65"
                    />
                ))}

                {/* ── Corner hatching (bottom-right) ── */}
                {[[220, 448, 268, 400], [230, 448, 268, 410], [240, 448, 268, 420],
                  [250, 448, 268, 430], [260, 448, 268, 440]].map(([x1, y1, x2, y2], i) => (
                    <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                        stroke="#1c1c1c" strokeWidth="1.2" opacity="0.09" strokeLinecap="round" />
                ))}
            </svg>

            {/* ── Content overlay (sits inside card area, starts at y=80) ── */}
            <div className="absolute inset-x-0" style={{ top: 88 }}>
                {children}
            </div>
        </div>
    );
};

/* ─────────────────────────────────────────────────────────
   Main section
   ───────────────────────────────────────────────────────── */
export const AwardsVariant = () => {
    const targetRef = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress, scrollY } = useScroll({ target: targetRef });
    const x = useTransform(scrollYProgress, [0, 1], ["10%", "-65%"]);
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, { damping: 60, stiffness: 400 });
    const baseRotate = useTransform(smoothVelocity, [-800, 800], [-3, 3], { clamp: false });

    return (
        <section ref={targetRef} className="relative h-[300vh] w-full bg-transparent">
            <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
                <motion.div style={{ x }} className="relative flex gap-10 md:gap-24 px-[10vw]">

                    {/* Wire at the ring level — y=28 in card space, card top is at ~50% vh
                        We use a generous height line to make sure it spans */}
                    <div className="absolute top-[28px] -left-[100vw] w-[5000px] h-[2px] bg-gradient-to-r from-transparent via-[#748D92]/55 to-transparent shadow-[0_1px_4px_rgba(116,141,146,0.35)] z-0 pointer-events-none" />

                    {myAccomplishments.map((item, index) => (
                        <HangerCard key={item.tempId} item={item} index={index} baseRotate={baseRotate} />
                    ))}
                </motion.div>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-xs font-mono text-text-muted tracking-widest uppercase opacity-50 flex flex-col items-center gap-2">
                    <span>Scroll to explore</span>
                    <div className="w-px h-6 bg-gradient-to-b from-text-muted to-transparent" />
                </div>
            </div>
        </section>
    );
};

function HangerCard({ item, index, baseRotate }: { item: any; index: number; baseRotate: any }) {
    /* Transform origin = top-center of the ring, which is at (140, 10) in SVG space
       In DOM terms: 140px from left, 10px from top of the 280×460 container */
    const cardRotate = useTransform(baseRotate, (v: number) => v * (1 + (index % 3) * 0.1));

    return (
        <motion.div
            style={{
                rotate: cardRotate,
                transformOrigin: "140px 10px",   /* exactly the top of the ring */
            }}
            className="relative flex-shrink-0"
        >
            <DoodleHangerCard seed={index}>
                {/* Badge image */}
                <div className="flex flex-col items-center text-center px-5">
                    <div className="mb-4 w-[110px] h-[110px] filter drop-shadow-lg hover:scale-105 transition-transform duration-500">
                        <Image
                            src={item.image}
                            alt={item.title}
                            width={110}
                            height={110}
                            className="object-contain w-full h-full"
                            unoptimized
                        />
                    </div>

                    {/* Title */}
                    <h3 className="font-gamja text-2xl md:text-3xl text-[#1c1c1c] mb-1 leading-tight px-2">
                        {item.title}
                    </h3>

                    {/* Purple squiggle underline */}
                    <svg viewBox="0 0 120 10" width="100" height="10" className="mb-3" aria-hidden="true">
                        <path d="M 2 6 Q 20 2 38 6 T 74 6 T 110 6"
                            fill="none" stroke="#715be0" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>

                    {/* Description */}
                    <p className="font-gamja text-base md:text-lg text-[#4a3b38] leading-snug opacity-80 px-2 mt-1">
                        {item.desc}
                    </p>
                </div>
            </DoodleHangerCard>
        </motion.div>
    );
}
