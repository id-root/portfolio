"use client";

import { motion, AnimatePresence } from "framer-motion";

const CARD_PALETTES = [
    { cardBg: "#c5d8ff", footerText: "#5b7fc9", tagBorder: "#dce8ff", tagText: "#3256a8" },
    { cardBg: "#ffdec5", footerText: "#c98a65", tagBorder: "#ffeedd", tagText: "#b55020" },
    { cardBg: "#c5efeb", footerText: "#5ba89e", tagBorder: "#d8f5f2", tagText: "#0d7a6e" },
    { cardBg: "#e3d7ff", footerText: "#8b6fd3", tagBorder: "#ede4ff", tagText: "#5b3fc0" },
    { cardBg: "#fdf1c3", footerText: "#b89a30", tagBorder: "#fdf6d8", tagText: "#8a6f00" },
    { cardBg: "#ffd6e0", footerText: "#c96e85", tagBorder: "#ffe8ee", tagText: "#a03050" },
    { cardBg: "#d2f4d0", footerText: "#4c9e48", tagBorder: "#e5f9e4", tagText: "#2d7a2a" },
];

const LANG_COLORS: Record<string, string> = {
    Python: "#3572A5", Rust: "#dea584", TypeScript: "#3178c6",
    JavaScript: "#f1e05a", C: "#555555", "C++": "#f34b7d",
    Go: "#00ADD8", Markdown: "#083fa1",
};

/* ── Rich SVG icons mapped by key ── */
function CardIcon({ name, size = 22 }: { name: string; size?: number }) {
    const s = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
    switch (name) {
        case "shield-lock": return (<svg {...s}><path d="M12 2l8 4v6c0 5.25-3.4 8.25-8 10-4.6-1.75-8-4.75-8-10V6l8-4z"/><rect x="10" y="11" width="4" height="5" rx="1"/><circle cx="12" cy="9" r="1.5"/></svg>);
        case "fingerprint": return (<svg {...s}><path d="M12 2a10 10 0 0 1 10 10"/><path d="M2 12a10 10 0 0 1 5-8.66"/><path d="M7 20.66A10 10 0 0 1 2 12"/><path d="M12 22a10 10 0 0 0 5-1.34"/><path d="M22 12a10 10 0 0 1-5 8.66"/><circle cx="12" cy="12" r="3"/><path d="M12 9v0"/></svg>);
        case "globe-network": return (<svg {...s}><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z"/></svg>);
        case "database": return (<svg {...s}><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>);
        case "signal": return (<svg {...s}><path d="M2 12l3-3 4 4 5-5 4 4 4-4"/><circle cx="12" cy="12" r="2" fill="currentColor" stroke="none"/></svg>);
        case "ghost": return (<svg {...s}><path d="M12 2C7.58 2 4 5.58 4 10v12l2.5-2 2.5 2 2.5-2L14 22l2.5-2 2.5 2V10c0-4.42-3.58-8-8-8z"/><circle cx="9" cy="10" r="1.5" fill="currentColor" stroke="none"/><circle cx="15" cy="10" r="1.5" fill="currentColor" stroke="none"/></svg>);
        case "atom": return (<svg {...s}><circle cx="12" cy="12" r="2" fill="currentColor" stroke="none"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/></svg>);
        default: return (<svg {...s}><rect x="3" y="3" width="18" height="18" rx="3"/></svg>);
    }
}

/* ── Language icon SVGs (devicon-style) ── */
function LangIcon({ lang, size = 16 }: { lang: string; size?: number }) {
    const color = LANG_COLORS[lang] || "#9a8b78";
    const s = { width: size, height: size };
    switch (lang) {
        case "Python": return (<svg {...s} viewBox="0 0 24 24"><path d="M11.9 1C6.4 1 6.8 3.3 6.8 3.3l.01 2.4h5.2v.7H4.6S1 6 1 11.8s3.1 5.6 3.1 5.6h1.9v-2.7s-.1-3.1 3.1-3.1h5.3s3 0 3-2.9V4s.5-3-5.5-3zm-2.9 1.7a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" fill={color}/><path d="M12.1 23c5.5 0 5.1-2.3 5.1-2.3l-.01-2.4h-5.2v-.7h7.4S23 18 23 12.2s-3.1-5.6-3.1-5.6h-1.9v2.7s.1 3.1-3.1 3.1H9.6s-3 0-3 2.9V20s-.5 3 5.5 3zm2.9-1.7a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" fill={color}/></svg>);
        case "Rust": return (<svg {...s} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeWidth="1.5"/><path d="M12 6v2m0 8v2M6 12h2m8 0h2m-1.4-4.6L15.2 8.8m-6.4 6.4l-1.4 1.4m0-8.2L8.8 8.8m6.4 6.4l1.4 1.4" stroke={color} strokeWidth="1.5" strokeLinecap="round"/><circle cx="12" cy="12" r="3" fill={color}/></svg>);
        case "TypeScript": return (<svg {...s} viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="2" fill={color}/><path d="M15.5 10v1.5h-2V18h-2v-6.5h-2V10h6zm3 0v8" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>);
        case "JavaScript": return (<svg {...s} viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="2" fill={color}/><path d="M10 10v6.5c0 1-1 1.5-2 1.5m8-8v4.5c0 2.5-4 2.5-4 0" stroke="#312726" strokeWidth="1.5" strokeLinecap="round"/></svg>);
        case "C": return (<svg {...s} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeWidth="1.5"/><path d="M16 8a6 6 0 1 0 0 8" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"/></svg>);
        case "C++": return (<svg {...s} viewBox="0 0 24 24"><circle cx="10" cy="12" r="8" fill="none" stroke={color} strokeWidth="1.3"/><path d="M14.5 8a5 5 0 1 0 0 8" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"/><path d="M18 12h4M20 10v4M14 12h4M16 10v4" stroke={color} strokeWidth="1" strokeLinecap="round"/></svg>);
        case "Go": return (<svg {...s} viewBox="0 0 24 24"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12z" fill="none" stroke={color} strokeWidth="1.5"/><circle cx="12" cy="12" r="3" fill={color}/></svg>);
        default: return (<svg {...s} viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" fill={color}/></svg>);
    }
}

interface ProjectCardNewProps {
    title: string;
    status: string;
    icon: string;
    problem: string;
    approach: string;
    link: string;
    description?: string;
    languages?: string[];
    language?: string;
    stars?: number;
    forks?: number;
    topics?: string[];
    homepage?: string;
    seed?: number;
    isExpanded: boolean;
    onToggle: () => void;
}

export function ProjectCardNew({
    title, status, icon, problem, approach, link,
    description, languages = [], language, stars = 0, forks = 0,
    topics = [], homepage, seed = 0, isExpanded, onToggle,
}: ProjectCardNewProps) {
    const palette = CARD_PALETTES[seed % CARD_PALETTES.length];
    const { cardBg, footerText, tagBorder, tagText } = palette;

    /* Normalise language data */
    const allLangs = languages.length > 0 ? languages : language ? [language] : [];

    const chips =
        topics.length > 0
            ? topics.slice(0, 3)
            : approach.split(/[,+&]/).map((s) => s.trim().split(" ").slice(0, 3).join(" ")).filter(Boolean).slice(0, 3);

    return (
        <motion.div
            layout
            onClick={onToggle}
            style={{
                display: "flex", flexDirection: "column", borderRadius: 24,
                background: cardBg, cursor: "pointer", overflow: "hidden",
                border: `2px solid ${tagBorder}`,
                boxShadow: "0 4px 16px rgba(49,39,38,0.08)",
            }}
            whileHover={!isExpanded ? { y: -4, boxShadow: "0 16px 32px -8px rgba(49,39,38,0.14)" } : {}}
            transition={{ layout: { type: "spring", stiffness: 180, damping: 24, mass: 1.2 } }}
        >
            {/* ── White top section ── */}
            <motion.div layout style={{ flex: 1, borderRadius: 24, background: "#fff", padding: "22px 24px", boxShadow: "0 8px 16px -6px rgba(0,0,0,0.06)" }}>
                {/* Header */}
                <motion.div layout style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                    <span style={{ fontSize: 22, lineHeight: 1, color: "#312726" }}><CardIcon name={icon} size={22} /></span>
                    <span className="font-gamja" style={{ fontSize: 15, fontWeight: 700, color: "#312726", letterSpacing: "-0.02em", flex: 1, minWidth: 0 }}>{title}</span>
                    {/* GitHub icon — top-right (always visible, not in expanded) */}
                    <a href={link} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                        style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, borderRadius: 12, background: "#312726", color: "#FFF8ED", flexShrink: 0, transition: "transform 0.2s ease" }}
                        title="View on GitHub"
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.1)"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    </a>
                </motion.div>

                {/* Problem statement */}
                <motion.p layout className="font-gamja" style={{ marginBottom: 16, fontSize: 17, fontWeight: 600, color: "#312726", lineHeight: 1.4, letterSpacing: "-0.01em" }}>{problem}</motion.p>

                {/* Tag chips */}
                <motion.div layout style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {chips.map((chip) => (
                        <span key={chip} className="font-figtree" style={{ borderRadius: 999, border: `1.5px solid ${tagBorder}`, padding: "4px 12px", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: tagText, background: `${tagBorder}40` }}>{chip}</span>
                    ))}
                </motion.div>

                {/* ── Expanded detail ── */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div key="expanded" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ type: "spring", stiffness: 220, damping: 26, mass: 0.9, opacity: { duration: 0.25 } }} style={{ overflow: "hidden" }} onClick={(e) => e.stopPropagation()}>
                            <div style={{ height: 1, background: tagBorder, margin: "18px 0" }} />

                            {/* Full description */}
                            {description && (
                                <p className="font-figtree" style={{ fontSize: 14, lineHeight: 1.7, color: "#4a3f3e", marginBottom: 18 }}>{description}</p>
                            )}

                            {/* Language icons row */}
                            {allLangs.length > 0 && (
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
                                    <span className="font-figtree" style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#9a8b78", marginRight: 4, alignSelf: "center" }}>Built with</span>
                                    {allLangs.map((lang) => (
                                        <span key={lang} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 999, border: `1.5px solid ${tagBorder}`, background: `${tagBorder}30`, fontSize: 12, fontWeight: 700, color: tagText }} className="font-figtree">
                                            <LangIcon lang={lang} size={16} />
                                            {lang}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Stats row */}
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
                                {stars > 0 && (
                                    <StatPill tagBorder={tagBorder} tagText={tagText}>
                                        <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" style={{ flexShrink: 0 }}><path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"/></svg>
                                        <span>{stars}</span>
                                    </StatPill>
                                )}
                                {forks > 0 && (
                                    <StatPill tagBorder={tagBorder} tagText={tagText}>
                                        <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" style={{ flexShrink: 0 }}><path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"/></svg>
                                        <span>{forks}</span>
                                    </StatPill>
                                )}
                            </div>

                            {/* Extra topics */}
                            {topics.length > 3 && (
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
                                    {topics.slice(3).map((t) => (
                                        <span key={t} className="font-figtree" style={{ borderRadius: 999, border: `1.5px solid ${tagBorder}`, padding: "3px 10px", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: tagText, background: `${tagBorder}40` }}>{t}</span>
                                    ))}
                                </div>
                            )}

                            {/* Action buttons — only Live Demo, no GitHub link */}
                            {homepage && (
                                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                                    <a href={homepage} target="_blank" rel="noopener noreferrer" className="font-figtree"
                                        style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "9px 18px", borderRadius: 999, background: "transparent", color: "#312726", fontSize: 12, fontWeight: 700, letterSpacing: "0.04em", textDecoration: "none", border: `1.5px solid ${tagBorder}` }}>
                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                                        Live Demo
                                    </a>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* ── Coloured footer ── */}
            <motion.div layout className="font-figtree" style={{ padding: "12px 24px", textAlign: "center", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: footerText, userSelect: "none" }}>
                {isExpanded ? "▲ collapse" : "expand ▼"}
            </motion.div>
        </motion.div>
    );
}

function StatPill({ tagBorder, tagText, children }: { tagBorder: string; tagText: string; children: React.ReactNode }) {
    return (
        <div className="font-figtree" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 999, border: `1.5px solid ${tagBorder}`, background: `${tagBorder}30`, fontSize: 12, fontWeight: 700, color: tagText }}>
            {children}
        </div>
    );
}
