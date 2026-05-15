"use client";

import { motion, AnimatePresence } from "framer-motion";

/* ── Colour palettes by category ── */
const RESEARCH_PALETTES = [
    { cardBg: "#fdf1c3", footerText: "#b89a30", tagBorder: "#fdf6d8", tagText: "#8a6f00" },
    { cardBg: "#ffecd8", footerText: "#c98a65", tagBorder: "#fff3e8", tagText: "#b05020" },
];

const WRITEUP_PALETTES = [
    { cardBg: "#e3d7ff", footerText: "#8b6fd3", tagBorder: "#ede4ff", tagText: "#5b3fc0" },
    { cardBg: "#c5d8ff", footerText: "#5b7fc9", tagBorder: "#dce8ff", tagText: "#3256a8" },
    { cardBg: "#d2f4d0", footerText: "#4c9e48", tagBorder: "#e5f9e4", tagText: "#2d7a2a" },
    { cardBg: "#ffd6e0", footerText: "#c96e85", tagBorder: "#ffe8ee", tagText: "#a03050" },
];

/* ── Rich SVG category icons ── */
function CategoryIcon({ category, size = 20 }: { category: string; size?: number }) {
    const s = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
    if (category === "Research") {
        return (
            <svg {...s}>
                <path d="M9 3h6v4a3 3 0 0 1-3 3 3 3 0 0 1-3-3V3z" />
                <path d="M12 10v4" />
                <circle cx="12" cy="17" r="3" />
                <path d="M6 3h12" />
                <path d="M10 17h4" />
            </svg>
        );
    }
    // Write-up icon (notebook/pen)
    return (
        <svg {...s}>
            <path d="M4 4h12a2 2 0 0 1 2 2v14l-4-2-4 2-4-2-4 2V6a2 2 0 0 1 2-2z" />
            <path d="M8 8h8" />
            <path d="M8 12h6" />
            <path d="M8 16h4" />
        </svg>
    );
}

interface WriteupCardNewProps {
    title: string;
    category: string;
    date: string;
    tags: string[];
    summary: string;
    link: string;
    seed?: number;
    isExpanded: boolean;
    onToggle: () => void;
}

export function WriteupCardNew({
    title, category, date, tags, summary, link,
    seed = 0, isExpanded, onToggle,
}: WriteupCardNewProps) {
    const palette =
        category === "Research"
            ? RESEARCH_PALETTES[seed % RESEARCH_PALETTES.length]
            : WRITEUP_PALETTES[seed % WRITEUP_PALETTES.length];

    const { cardBg, footerText, tagBorder, tagText } = palette;

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
                {/* Header: icon + title + external link icon */}
                <motion.div layout style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                    <span style={{ color: "#312726", lineHeight: 1 }}><CategoryIcon category={category} size={20} /></span>
                    <span className="font-gamja" style={{ fontSize: 15, fontWeight: 700, color: "#312726", letterSpacing: "-0.02em", flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{title}</span>
                    {/* Link icon — top-right */}
                    <a href={link} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                        style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, borderRadius: 12, background: "#312726", color: "#FFF8ED", flexShrink: 0, transition: "transform 0.2s ease" }}
                        title="Read writeup"
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.1)"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                    </a>
                </motion.div>

                {/* Summary — regular weight, not bold */}
                <motion.p layout className="font-gamja" style={{ marginBottom: 16, fontSize: 17, fontWeight: 400, color: "#4a3f3e", lineHeight: 1.45, letterSpacing: "-0.01em" }}>{summary}</motion.p>

                {/* Tags */}
                <motion.div layout style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="font-figtree" style={{ borderRadius: 999, border: `1.5px solid ${tagBorder}`, padding: "4px 12px", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: tagText, background: `${tagBorder}40` }}>{tag}</span>
                    ))}
                </motion.div>

                {/* ── Expanded section ── */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div key="expanded" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ type: "spring", stiffness: 220, damping: 26, mass: 0.9, opacity: { duration: 0.25 } }} style={{ overflow: "hidden" }} onClick={(e) => e.stopPropagation()}>
                            <div style={{ height: 1, background: tagBorder, margin: "18px 0" }} />

                            {/* Stats row */}
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
                                <StatPill tagBorder={tagBorder} tagText={tagText}>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                                    <span>{date}</span>
                                </StatPill>
                                <StatPill tagBorder={tagBorder} tagText={tagText}>
                                    <CategoryIcon category={category} size={14} />
                                    <span>{category}</span>
                                </StatPill>
                            </div>

                            {/* All tags */}
                            {tags.length > 3 && (
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
                                    {tags.slice(3).map((tag) => (
                                        <span key={tag} className="font-figtree" style={{ borderRadius: 999, border: `1.5px solid ${tagBorder}`, padding: "3px 10px", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: tagText, background: `${tagBorder}40` }}>{tag}</span>
                                    ))}
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
