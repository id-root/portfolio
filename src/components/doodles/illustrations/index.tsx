"use client";

import { motion } from "framer-motion";

/* Shared animation config */
const draw = (delay: number) => ({
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: { pathLength: { duration: 1.2, ease: "easeInOut" as const, delay }, opacity: { duration: 0.3, delay } },
});

const fadeIn = (delay: number) => ({
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.6, delay, ease: "backOut" as const },
});

const S = "var(--brand-dark)";
const A = "var(--brand-accent)";

/* ═══════════════════════════════════════
   PROJECT ILLUSTRATIONS
   ═══════════════════════════════════════ */

export const AntiDebugIllustration = () => (
    <svg viewBox="0 0 180 180" fill="none" className="w-full h-full">
        {/* Padlock shackle */}
        <motion.path d="M62,78 L62,52 C62,32 108,32 108,52 L108,78" stroke={S} strokeWidth="3" strokeLinecap="round" fill="none" {...draw(0.3)} />
        {/* Padlock body */}
        <motion.rect x="48" y="76" width="74" height="58" rx="8" stroke={S} strokeWidth="2.5" fill="none" {...draw(0.5)} />
        {/* Keyhole */}
        <motion.circle cx="85" cy="100" r="8" fill={S} fillOpacity="0.25" {...fadeIn(1.2)} />
        <motion.rect x="82" y="100" width="6" height="16" rx="2" fill={S} fillOpacity="0.25" {...fadeIn(1.3)} />
        {/* CPU chip */}
        <motion.rect x="130" y="18" width="36" height="36" rx="4" stroke={S} strokeWidth="1.5" opacity="0.4" fill="none" {...draw(0.8)} />
        {/* CPU pins */}
        {[140, 148, 156].map((x, i) => (
            <motion.line key={`tp${i}`} x1={x} y1="14" x2={x} y2="18" stroke={S} strokeWidth="1.5" opacity="0.3" strokeLinecap="round" {...draw(1 + i * 0.1)} />
        ))}
        {[140, 148, 156].map((x, i) => (
            <motion.line key={`bp${i}`} x1={x} y1="54" x2={x} y2="58" stroke={S} strokeWidth="1.5" opacity="0.3" strokeLinecap="round" {...draw(1.1 + i * 0.1)} />
        ))}
        {/* Binary */}
        <motion.text x="128" y="75" fontSize="9" fontFamily="monospace" fill={S} opacity="0.2" {...fadeIn(1.4)}>10110</motion.text>
        <motion.text x="128" y="87" fontSize="9" fontFamily="monospace" fill={S} opacity="0.2" {...fadeIn(1.5)}>01001</motion.text>
        {/* Code brackets */}
        <motion.path d="M18,60 L8,85 L18,110" stroke={A} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.35" {...draw(1)} />
        <motion.path d="M30,60 L40,85 L30,110" stroke={A} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.35" {...draw(1.1)} />
    </svg>
);

export const AegisIllustration = () => (
    <svg viewBox="0 0 180 180" fill="none" className="w-full h-full">
        {/* Shield */}
        <motion.path d="M30,45 C30,45 55,30 80,45 L80,85 C80,105 55,118 55,118 C55,118 30,105 30,85 Z" stroke={S} strokeWidth="2.5" strokeLinecap="round" fill={A} fillOpacity="0.1" {...draw(0.3)} />
        {/* Shield checkmark */}
        <motion.path d="M45,78 L53,88 L68,65" stroke={A} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" {...draw(0.8)} />
        {/* Magnifying glass */}
        <motion.circle cx="130" cy="55" r="22" stroke={S} strokeWidth="2.2" fill="none" {...draw(0.5)} />
        <motion.line x1="146" y1="71" x2="165" y2="92" stroke={S} strokeWidth="3" strokeLinecap="round" {...draw(0.9)} />
        {/* Grid inside magnifying glass */}
        <motion.rect x="118" y="43" width="24" height="24" stroke={S} strokeWidth="1" opacity="0.25" fill="none" {...draw(1.1)} />
        <motion.line x1="126" y1="43" x2="126" y2="67" stroke={S} strokeWidth="1" opacity="0.2" {...draw(1.2)} />
        <motion.line x1="134" y1="43" x2="134" y2="67" stroke={S} strokeWidth="1" opacity="0.2" {...draw(1.2)} />
        <motion.line x1="118" y1="51" x2="142" y2="51" stroke={S} strokeWidth="1" opacity="0.2" {...draw(1.3)} />
        <motion.line x1="118" y1="59" x2="142" y2="59" stroke={S} strokeWidth="1" opacity="0.2" {...draw(1.3)} />
        {/* Binary text */}
        <motion.text x="140" y="38" fontSize="10" fontFamily="monospace" fill={S} opacity="0.25" {...fadeIn(1.2)}>10101</motion.text>
        <motion.text x="140" y="50" fontSize="10" fontFamily="monospace" fill={S} opacity="0.25" {...fadeIn(1.3)}>01010</motion.text>
        {/* Document */}
        <motion.rect x="115" y="105" width="42" height="55" rx="3" stroke={S} strokeWidth="1.8" fill="none" opacity="0.5" {...draw(0.7)} />
        {[118, 126, 134].map((y, i) => (
            <motion.line key={`dl${i}`} x1="122" y1={y} x2="150" y2={y} stroke={S} strokeWidth="1" opacity="0.2" {...draw(1.4 + i * 0.1)} />
        ))}
        {/* Squiggly signature on document */}
        <motion.path d="M125,142 C128,138 132,146 136,140 C140,134 144,145 148,140" stroke={S} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.3" {...draw(1.6)} />
    </svg>
);

export const MultiLangIllustration = () => (
    <svg viewBox="0 0 180 180" fill="none" className="w-full h-full">
        {/* Terminal window */}
        <motion.rect x="30" y="25" width="120" height="85" rx="6" stroke={S} strokeWidth="2.2" fill="none" {...draw(0.3)} />
        {/* Terminal title bar */}
        <motion.line x1="30" y1="42" x2="150" y2="42" stroke={S} strokeWidth="1.5" opacity="0.3" {...draw(0.5)} />
        {/* Terminal dots */}
        <motion.circle cx="42" cy="34" r="3" fill={S} opacity="0.25" {...fadeIn(0.6)} />
        <motion.circle cx="52" cy="34" r="3" fill={S} opacity="0.25" {...fadeIn(0.7)} />
        <motion.circle cx="62" cy="34" r="3" fill={S} opacity="0.25" {...fadeIn(0.8)} />
        {/* Code lines inside terminal */}
        <motion.path d="M40,54 L50,60 L40,66" stroke={A} strokeWidth="2" strokeLinecap="round" fill="none" {...draw(0.9)} />
        <motion.line x1="56" y1="60" x2="95" y2="60" stroke={S} strokeWidth="1.5" opacity="0.25" strokeLinecap="round" {...draw(1)} />
        <motion.path d="M40,76 L50,82 L40,88" stroke={A} strokeWidth="2" strokeLinecap="round" fill="none" {...draw(1.1)} />
        <motion.line x1="56" y1="82" x2="110" y2="82" stroke={S} strokeWidth="1.5" opacity="0.25" strokeLinecap="round" {...draw(1.2)} />
        {/* Barrier/wall being bypassed */}
        <motion.line x1="90" y1="120" x2="90" y2="170" stroke={S} strokeWidth="3" opacity="0.2" strokeLinecap="round" {...draw(0.6)} />
        {/* Arrow bypassing wall */}
        <motion.path d="M60,145 C70,130 80,155 90,135 C100,115 110,145 120,140" stroke={A} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5" {...draw(1)} />
        {/* Language labels */}
        <motion.text x="38" y="145" fontSize="10" fontFamily="monospace" fill={S} opacity="0.3" {...fadeIn(1.3)}>Rust</motion.text>
        <motion.text x="110" y="155" fontSize="10" fontFamily="monospace" fill={S} opacity="0.3" {...fadeIn(1.4)}>C</motion.text>
    </svg>
);

export const SqliHunterIllustration = () => (
    <svg viewBox="0 0 180 180" fill="none" className="w-full h-full">
        {/* Database cylinder - top ellipse */}
        <motion.ellipse cx="90" cy="40" rx="45" ry="14" stroke={S} strokeWidth="2.2" fill={A} fillOpacity="0.08" {...draw(0.3)} />
        {/* Database body */}
        <motion.path d="M45,40 L45,100 C45,114 135,114 135,100 L135,40" stroke={S} strokeWidth="2.2" fill="none" {...draw(0.5)} />
        {/* Database bottom ellipse */}
        <motion.ellipse cx="90" cy="100" rx="45" ry="14" stroke={S} strokeWidth="2.2" fill="none" {...draw(0.7)} />
        {/* Middle ring */}
        <motion.ellipse cx="90" cy="70" rx="45" ry="14" stroke={S} strokeWidth="1" opacity="0.2" fill="none" {...draw(0.8)} />
        {/* Syringe/injection needle */}
        <motion.path d="M120,120 L155,155" stroke={S} strokeWidth="2.5" strokeLinecap="round" {...draw(0.9)} />
        <motion.rect x="150" y="150" width="20" height="8" rx="2" stroke={S} strokeWidth="1.5" fill="none" transform="rotate(45, 160, 154)" {...draw(1)} />
        <motion.path d="M117,123 L113,119 M123,117 L119,113" stroke={S} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" {...draw(1.1)} />
        {/* SQL text */}
        <motion.text x="15" y="140" fontSize="9" fontFamily="monospace" fill={A} opacity="0.35" {...fadeIn(1.2)}>SELECT *</motion.text>
        <motion.text x="15" y="153" fontSize="9" fontFamily="monospace" fill={A} opacity="0.35" {...fadeIn(1.3)}>FROM db</motion.text>
        {/* Warning triangle */}
        <motion.path d="M25,55 L15,72 L35,72 Z" stroke={S} strokeWidth="1.5" fill="none" opacity="0.3" strokeLinejoin="round" {...draw(1.1)} />
        <motion.text x="22" y="69" fontSize="10" fill={S} opacity="0.3" {...fadeIn(1.3)}>!</motion.text>
    </svg>
);

export const SynapseIllustration = () => (
    <svg viewBox="0 0 180 180" fill="none" className="w-full h-full">
        {/* Central node */}
        <motion.circle cx="90" cy="90" r="16" stroke={S} strokeWidth="2.2" fill={A} fillOpacity="0.12" {...draw(0.3)} />
        {/* Orbiting nodes */}
        {[
            { cx: 35, cy: 45, r: 10 },
            { cx: 145, cy: 40, r: 10 },
            { cx: 40, cy: 140, r: 10 },
            { cx: 150, cy: 135, r: 10 },
        ].map((n, i) => (
            <motion.circle key={i} cx={n.cx} cy={n.cy} r={n.r} stroke={S} strokeWidth="1.8" fill="none" opacity="0.5" {...draw(0.5 + i * 0.15)} />
        ))}
        {/* Connection lines */}
        {[
            "M44,52 C60,65 70,75 78,82",
            "M136,47 C120,60 108,72 98,82",
            "M48,133 C62,120 72,108 82,98",
            "M142,128 C128,118 112,104 98,96",
        ].map((d, i) => (
            <motion.path key={`l${i}`} d={d} stroke={S} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.3" strokeDasharray="4 4" {...draw(0.8 + i * 0.1)} />
        ))}
        {/* File icon in center */}
        <motion.rect x="82" y="82" width="16" height="18" rx="2" stroke={S} strokeWidth="1.5" fill="none" {...draw(1)} />
        <motion.path d="M86,86 L94,86 M86,90 L92,90" stroke={S} strokeWidth="1" opacity="0.4" strokeLinecap="round" {...draw(1.2)} />
        {/* WiFi waves */}
        <motion.path d="M75,30 C82,22 98,22 105,30" stroke={A} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.3" {...draw(1.1)} />
        <motion.path d="M80,37 C85,32 95,32 100,37" stroke={A} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.3" {...draw(1.2)} />
        {/* Transfer arrows */}
        <motion.path d="M60,90 L70,90 M65,86 L70,90 L65,94" stroke={A} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.4" {...draw(1.3)} />
        <motion.path d="M110,90 L120,90 M115,86 L110,90 L115,94" stroke={A} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.4" {...draw(1.3)} />
    </svg>
);

export const SpectreIllustration = () => (
    <svg viewBox="0 0 180 180" fill="none" className="w-full h-full">
        {/* Ghost body */}
        <motion.path d="M55,120 L55,65 C55,35 125,35 125,65 L125,120 L115,108 L105,120 L95,108 L85,120 L75,108 L65,120 L55,108 Z" stroke={S} strokeWidth="2.2" fill={A} fillOpacity="0.08" strokeLinejoin="round" {...draw(0.3)} />
        {/* Ghost eyes */}
        <motion.circle cx="78" cy="72" r="5" fill={S} opacity="0.35" {...fadeIn(0.8)} />
        <motion.circle cx="102" cy="72" r="5" fill={S} opacity="0.35" {...fadeIn(0.9)} />
        {/* Browser window */}
        <motion.rect x="10" y="130" width="55" height="38" rx="4" stroke={S} strokeWidth="1.5" fill="none" opacity="0.4" {...draw(0.7)} />
        <motion.line x1="10" y1="142" x2="65" y2="142" stroke={S} strokeWidth="1" opacity="0.25" {...draw(0.9)} />
        <motion.circle cx="18" cy="136" r="2" fill={S} opacity="0.2" {...fadeIn(1)} />
        <motion.circle cx="25" cy="136" r="2" fill={S} opacity="0.2" {...fadeIn(1.05)} />
        {/* HTTP arrows */}
        <motion.path d="M68,145 L85,145 M80,141 L85,145 L80,149" stroke={A} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.4" {...draw(1.1)} />
        <motion.path d="M115,150 L98,150 M103,146 L98,150 L103,154" stroke={A} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.4" {...draw(1.2)} />
        {/* WAF barrier */}
        <motion.line x1="140" y1="125" x2="140" y2="168" stroke={S} strokeWidth="2" opacity="0.2" strokeLinecap="round" {...draw(0.8)} />
        <motion.line x1="135" y1="130" x2="145" y2="130" stroke={S} strokeWidth="1.5" opacity="0.2" strokeLinecap="round" {...draw(0.9)} />
        <motion.line x1="135" y1="145" x2="145" y2="145" stroke={S} strokeWidth="1.5" opacity="0.2" strokeLinecap="round" {...draw(1)} />
        <motion.line x1="135" y1="160" x2="145" y2="160" stroke={S} strokeWidth="1.5" opacity="0.2" strokeLinecap="round" {...draw(1.1)} />
        {/* Bypass arrow through wall */}
        <motion.path d="M125,140 C130,125 150,130 155,145" stroke={A} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.4" strokeDasharray="3 3" {...draw(1.3)} />
    </svg>
);

export const IsotopeIllustration = () => (
    <svg viewBox="0 0 180 180" fill="none" className="w-full h-full">
        {/* Onion layers - concentric circles */}
        <motion.circle cx="90" cy="80" r="55" stroke={S} strokeWidth="2" fill="none" opacity="0.15" {...draw(0.3)} />
        <motion.circle cx="90" cy="80" r="40" stroke={S} strokeWidth="2" fill="none" opacity="0.25" {...draw(0.5)} />
        <motion.circle cx="90" cy="80" r="25" stroke={S} strokeWidth="2" fill={A} fillOpacity="0.1" opacity="0.4" {...draw(0.7)} />
        <motion.circle cx="90" cy="80" r="10" stroke={S} strokeWidth="2.5" fill={S} fillOpacity="0.15" {...draw(0.9)} />
        {/* Key symbol */}
        <motion.circle cx="90" cy="76" r="5" stroke={S} strokeWidth="1.5" fill="none" opacity="0.5" {...draw(1.1)} />
        <motion.line x1="90" y1="81" x2="90" y2="95" stroke={S} strokeWidth="1.5" opacity="0.5" strokeLinecap="round" {...draw(1.2)} />
        <motion.line x1="90" y1="88" x2="95" y2="88" stroke={S} strokeWidth="1.5" opacity="0.5" strokeLinecap="round" {...draw(1.25)} />
        <motion.line x1="90" y1="93" x2="96" y2="93" stroke={S} strokeWidth="1.5" opacity="0.5" strokeLinecap="round" {...draw(1.3)} />
        {/* Quantum atom orbits */}
        <motion.ellipse cx="40" cy="150" rx="28" ry="10" stroke={A} strokeWidth="1.5" fill="none" opacity="0.3" transform="rotate(-30, 40, 150)" {...draw(1)} />
        <motion.ellipse cx="40" cy="150" rx="28" ry="10" stroke={A} strokeWidth="1.5" fill="none" opacity="0.3" transform="rotate(30, 40, 150)" {...draw(1.1)} />
        <motion.ellipse cx="40" cy="150" rx="28" ry="10" stroke={A} strokeWidth="1.5" fill="none" opacity="0.3" transform="rotate(90, 40, 150)" {...draw(1.2)} />
        <motion.circle cx="40" cy="150" r="3" fill={A} opacity="0.4" {...fadeIn(1.4)} />
        {/* Envelope */}
        <motion.rect x="120" y="140" width="45" height="30" rx="3" stroke={S} strokeWidth="1.5" fill="none" opacity="0.35" {...draw(0.8)} />
        <motion.path d="M120,140 L142,158 L165,140" stroke={S} strokeWidth="1.5" fill="none" opacity="0.25" strokeLinejoin="round" {...draw(1)} />
        {/* Lock on envelope */}
        <motion.rect x="137" y="152" width="10" height="8" rx="2" stroke={S} strokeWidth="1" fill={S} fillOpacity="0.15" {...draw(1.3)} />
    </svg>
);

/* ═══════════════════════════════════════
   CATEGORY ILLUSTRATIONS (Writeups)
   ═══════════════════════════════════════ */

export const ResearchIllustration = () => (
    <svg viewBox="0 0 140 140" fill="none" className="w-full h-full">
        {/* Microscope */}
        <motion.circle cx="55" cy="35" r="18" stroke={S} strokeWidth="2" fill="none" opacity="0.4" {...draw(0.3)} />
        <motion.line x1="55" y1="53" x2="55" y2="85" stroke={S} strokeWidth="2.5" strokeLinecap="round" opacity="0.4" {...draw(0.5)} />
        <motion.line x1="40" y1="85" x2="70" y2="85" stroke={S} strokeWidth="2" strokeLinecap="round" opacity="0.4" {...draw(0.7)} />
        {/* Notebook */}
        <motion.rect x="80" y="50" width="42" height="55" rx="3" stroke={S} strokeWidth="1.8" fill="none" opacity="0.4" {...draw(0.5)} />
        {[62, 70, 78, 86].map((y, i) => (
            <motion.line key={i} x1="87" y1={y} x2="115" y2={y} stroke={S} strokeWidth="1" opacity="0.2" strokeLinecap="round" {...draw(0.8 + i * 0.1)} />
        ))}
        {/* Lightbulb */}
        <motion.path d="M105,20 C105,8 125,8 125,20 C125,28 118,30 118,36 L112,36 C112,30 105,28 105,20 Z" stroke={A} strokeWidth="1.5" fill={A} fillOpacity="0.1" {...draw(0.9)} />
        <motion.line x1="112" y1="38" x2="118" y2="38" stroke={A} strokeWidth="1" opacity="0.4" strokeLinecap="round" {...draw(1.2)} />
        {/* Rays */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const cx = 115, cy = 20;
            return (
                <motion.line key={`r${i}`} x1={cx + Math.cos(rad) * 16} y1={cy + Math.sin(rad) * 16} x2={cx + Math.cos(rad) * 20} y2={cy + Math.sin(rad) * 20} stroke={A} strokeWidth="1" opacity="0.25" strokeLinecap="round" {...draw(1.1 + i * 0.05)} />
            );
        })}
    </svg>
);

export const WriteupIllustration = () => (
    <svg viewBox="0 0 140 140" fill="none" className="w-full h-full">
        {/* Terminal */}
        <motion.rect x="15" y="20" width="70" height="50" rx="5" stroke={S} strokeWidth="2" fill="none" opacity="0.4" {...draw(0.3)} />
        <motion.line x1="15" y1="33" x2="85" y2="33" stroke={S} strokeWidth="1" opacity="0.25" {...draw(0.5)} />
        <motion.path d="M25,42 L33,48 L25,54" stroke={A} strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.5" {...draw(0.7)} />
        <motion.line x1="38" y1="48" x2="60" y2="48" stroke={S} strokeWidth="1.2" opacity="0.2" strokeLinecap="round" {...draw(0.8)} />
        <motion.path d="M25,58 L33,64 L25,70" stroke={A} strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.5" {...draw(0.9)} />
        {/* Flag */}
        <motion.line x1="105" y1="20" x2="105" y2="80" stroke={S} strokeWidth="2" strokeLinecap="round" opacity="0.4" {...draw(0.5)} />
        <motion.path d="M105,22 L130,30 L105,42" stroke={S} strokeWidth="1.8" fill={A} fillOpacity="0.15" strokeLinejoin="round" {...draw(0.7)} />
        {/* Trophy */}
        <motion.path d="M50,90 L50,82 C50,78 80,78 80,82 L80,90 C80,100 65,108 65,108 C65,108 50,100 50,90 Z" stroke={S} strokeWidth="1.8" fill={A} fillOpacity="0.08" {...draw(0.8)} />
        <motion.line x1="55" y1="112" x2="75" y2="112" stroke={S} strokeWidth="1.5" strokeLinecap="round" opacity="0.3" {...draw(1)} />
        <motion.line x1="65" y1="108" x2="65" y2="112" stroke={S} strokeWidth="1.5" strokeLinecap="round" opacity="0.3" {...draw(1.1)} />
        {/* Star on trophy */}
        <motion.path d="M65,88 L67,93 L72,93 L68,96 L69,101 L65,98 L61,101 L62,96 L58,93 L63,93 Z" fill={A} fillOpacity="0.3" stroke={A} strokeWidth="0.8" opacity="0.5" {...fadeIn(1.2)} />
    </svg>
);
