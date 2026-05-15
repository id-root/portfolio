'use client';

import { useState, useEffect, ReactNode, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";

// --- Types ---

type HeadingData = {
  id: string;
  text: string;
  level: number;
  element: HTMLElement;
};

// --- Shared Animation Configs ---

const islandTransition = {
  type: "tween" as const,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  duration: 0.5,
};

// --- Color Palettes ---

const colors = {
  light: {
    bg: '#FAF9F6',
    border: 'rgba(0, 0, 0, 0.1)',
    text: '#1e293b',
    textMuted: 'rgba(30, 41, 59, 0.45)',
    textHover: 'rgba(30, 41, 59, 0.85)',
    label: 'rgba(30, 41, 59, 0.5)',
    itemActiveBg: 'rgba(0, 0, 0, 0.07)',
    itemHoverBg: 'rgba(0, 0, 0, 0.04)',
    trackStroke: 'rgba(0, 0, 0, 0.1)',
  },
  dark: {
    bg: '#1c1916',
    border: 'rgba(255, 255, 255, 0.1)',
    text: '#e8d9c8',
    textMuted: 'rgba(226, 232, 240, 0.45)',
    textHover: 'rgba(226, 232, 240, 0.85)',
    label: 'rgba(226, 232, 240, 0.4)',
    itemActiveBg: 'rgba(255, 255, 255, 0.08)',
    itemHoverBg: 'rgba(255, 255, 255, 0.05)',
    trackStroke: 'rgba(255, 255, 255, 0.15)',
  },
};

// --- Progress Circle Component ---

function CircleProgress({ percentage, palette }: { percentage: number; palette: typeof colors.light }) {
  const size = 24;
  const strokeWidth = 2.5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}>
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={palette.trackStroke} strokeWidth={strokeWidth} />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={palette.text}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        strokeLinecap="round"
      />
    </svg>
  );
}

// --- Main Component ---

type DynamicIslandTOCProps = {
  children?: ReactNode;
  /**
   * CSS selector to find headings.
   * Defaults to common blog content wrappers and explicit [data-toc] elements.
   */
  selector?: string;
  /**
   * Change this value to force the TOC to rescan the DOM for headings.
   * Useful when the rendered content changes (e.g., switching tabs/parts).
   */
  refreshKey?: string | number;
};

export default function DynamicIslandTOC({
  children,
  selector = "article h1, article h2, article h3, article h4, .prose h1, .prose h2, .prose h3, .prose h4, [data-toc]",
  refreshKey,
}: DynamicIslandTOCProps) {
  const [headings, setHeadings] = useState<HeadingData[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [progress, setProgress] = useState(0);
  const { theme } = useTheme();

  const palette = theme === 'dark' ? colors.dark : colors.light;

  // 1. DOM Scanning Strategy
  useEffect(() => {
    // Reset active heading whenever content changes
    setActiveId(null);

    const getHeadings = () => {
      const elements = Array.from(document.querySelectorAll(selector)) as HTMLElement[];

      const validHeadings = elements
        .filter((el) => !el.hasAttribute("data-toc-ignore"))
        .map((el, index) => {
          if (!el.id) {
            const generatedId =
              el.textContent
                ?.toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^\w-]/g, "") || `toc-heading-${index}`;
            el.id = generatedId;
          }

          const depthAttr = el.getAttribute("data-toc-depth");
          let level = 2;

          if (depthAttr) {
            level = parseInt(depthAttr, 10);
          } else {
            const tagName = el.tagName.toUpperCase();
            if (tagName.startsWith("H") && tagName.length === 2) {
              level = parseInt(tagName[1], 10);
            }
          }

          const text = el.getAttribute("data-toc-title") || el.textContent || "Section";

          return { id: el.id, text, level, element: el };
        });

      validHeadings.sort((a, b) =>
        a.element.compareDocumentPosition(b.element) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1,
      );

      setHeadings(validHeadings);
    };

    // Give React time to finish rendering the new content before scanning
    const timer = setTimeout(getHeadings, 150);
    return () => clearTimeout(timer);
  }, [selector, refreshKey]);

  // 2. Scroll Spy & Progress
  useEffect(() => {
    const handleScroll = () => {
      let currentActiveId: string | null = null;
      for (const heading of headings) {
        const top = heading.element.getBoundingClientRect().top;
        if (top <= 120) {
          currentActiveId = heading.id;
        } else {
          break;
        }
      }

      if (!currentActiveId && headings.length > 0) {
        currentActiveId = headings[0].id;
      }

      setActiveId(currentActiveId);

      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? Math.min(100, Math.max(0, (window.scrollY / total) * 100)) : 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);

  const activeHeading = headings.find((h) => h.id === activeId);

  const minLevel = useMemo(() => {
    if (headings.length === 0) return 1;
    return Math.min(...headings.map((h) => h.level));
  }, [headings]);

  return (
    <>
      {children}

      {/* Backdrop Blur Overlay — very heavy blur, no visibility of content behind */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={islandTransition}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9998,
              background: 'rgba(0, 0, 0, 0.2)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
            onClick={() => setIsExpanded(false)}
          />
        )}
      </AnimatePresence>

      {/* Dynamic Island Wrapper */}
      <motion.div
        initial={{ x: '-50%', y: 50, opacity: 0 }}
        animate={{ x: '-50%', y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        style={{
          position: 'fixed',
          bottom: '30px',
          left: '50%',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <motion.div
          onClick={() => {
            if (!isExpanded) setIsExpanded(true);
          }}
          initial={false}
          animate={{
            width: isExpanded ? 340 : 280,
            height: isExpanded ? 400 : 52,
            borderRadius: isExpanded ? 24 : 26,
          }}
          transition={islandTransition}
          style={{
            cursor: isExpanded ? "default" : "pointer",
            position: 'relative',
            overflow: 'hidden',
            border: `1px solid ${palette.border}`,
            background: palette.bg,
            color: palette.text,
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          }}
        >
          {/* CLOSED PILL CONTENT */}
          <motion.div
            initial={false}
            animate={{
              opacity: isExpanded ? 0 : 1,
              scale: isExpanded ? 0.95 : 1,
              filter: isExpanded ? "blur(4px)" : "blur(0px)",
            }}
            transition={{ ...islandTransition, delay: isExpanded ? 0 : 0.1 }}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '0 1rem 0 1.25rem',
              pointerEvents: isExpanded ? 'none' : 'auto',
            }}
          >
            <div style={{
              height: '8px',
              width: '8px',
              flexShrink: 0,
              borderRadius: '9999px',
              background: palette.text,
            }} />

            <div style={{
              position: 'relative',
              display: 'flex',
              flex: 1,
              height: '100%',
              alignItems: 'center',
              overflow: 'hidden',
              textAlign: 'left',
            }}>
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={activeId || "empty"}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    display: 'block',
                    width: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    fontSize: '0.875rem',
                    fontWeight: 'bold',
                    color: palette.text,
                  }}
                >
                  {activeHeading?.text || "Contents"}
                </motion.span>
              </AnimatePresence>
            </div>

            <CircleProgress percentage={progress} palette={palette} />
          </motion.div>

          {/* EXPANDED MENU CONTENT */}
          <motion.div
            initial={false}
            animate={{
              opacity: isExpanded ? 1 : 0,
              scale: isExpanded ? 1 : 1.05,
            }}
            transition={{ ...islandTransition, delay: isExpanded ? 0.1 : 0 }}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              pointerEvents: isExpanded ? 'auto' : 'none',
            }}
          >
            <div style={{
              display: 'flex',
              flexShrink: 0,
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1.25rem 1.5rem 0.75rem',
            }}>
              <span style={{
                fontSize: '11px',
                fontWeight: 'bold',
                letterSpacing: '0.08em',
                color: palette.label,
              }}>
                TABLE OF CONTENTS
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(false);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: palette.label,
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = palette.text; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = palette.label; }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div style={{
              flex: 1,
              overflowY: 'auto',
              overscrollBehavior: 'contain',
              padding: '0 0.75rem 1rem',
            }} data-lenis-prevent="true">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {headings.map((h) => {
                  const isActive = activeId === h.id;
                  const isHovered = hoveredId === h.id;

                  const indentLevel = Math.max(0, h.level - minLevel);
                  const paddingLeft = indentLevel * 14 + 12;

                  let bgColor = 'transparent';
                  let textColor = palette.textMuted;
                  let fontWeight: number | string = 'bold';

                  if (isActive) {
                    bgColor = palette.itemActiveBg;
                    textColor = palette.text;
                    fontWeight = 'bold';
                  } else if (isHovered) {
                    bgColor = palette.itemHoverBg;
                    textColor = palette.textHover;
                  }

                  return (
                    <button
                      key={h.id}
                      onMouseEnter={() => setHoveredId(h.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      onClick={(e) => {
                        e.stopPropagation();
                        const yOffset = -80;
                        const y = h.element.getBoundingClientRect().top + window.scrollY + yOffset;
                        window.scrollTo({ top: y, behavior: "smooth" });
                        setIsExpanded(false);
                      }}
                      style={{
                        paddingLeft: `${paddingLeft}px`,
                        display: 'flex',
                        width: '100%',
                        flexShrink: 0,
                        cursor: 'pointer',
                        alignItems: 'center',
                        borderRadius: '0.5rem',
                        border: 'none',
                        paddingTop: '0.5rem',
                        paddingBottom: '0.5rem',
                        paddingRight: '0.75rem',
                        textAlign: 'left',
                        fontSize: '0.875rem',
                        fontFamily: 'inherit',
                        background: bgColor,
                        color: textColor,
                        fontWeight,
                        transition: 'all 0.3s ease-out',
                      }}
                    >
                      <span style={{
                        flex: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        transition: 'transform 0.3s ease',
                        transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
                      }}>
                        {h.text}
                      </span>

                      <motion.div
                        initial={false}
                        animate={{ scale: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        style={{
                          marginLeft: '0.75rem',
                          height: '6px',
                          width: '6px',
                          flexShrink: 0,
                          borderRadius: '9999px',
                          background: palette.text,
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}
