'use client';

import { useState, useRef, useEffect, useCallback, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { GlossaryEntry } from '@/lib/glossary-data';

interface GlossaryTooltipProps {
    entry: GlossaryEntry;
    children: ReactNode;
}

export default function GlossaryTooltip({ entry, children }: GlossaryTooltipProps) {
    const [visible, setVisible] = useState(false);
    const [coords, setCoords] = useState<{ top: number; left: number; position: 'above' | 'below' } | null>(null);
    const triggerRef = useRef<HTMLSpanElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const showTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const calculatePosition = useCallback(() => {
        if (!triggerRef.current) return;
        const rect = triggerRef.current.getBoundingClientRect();
        const tooltipHeight = 160; // approximate max height
        const showBelow = rect.top < tooltipHeight + 20;

        setCoords({
            left: rect.left + rect.width / 2,
            top: showBelow ? rect.bottom + 8 : rect.top - 8,
            position: showBelow ? 'below' : 'above',
        });
    }, []);

    const show = useCallback(() => {
        if (hideTimeout.current) {
            clearTimeout(hideTimeout.current);
            hideTimeout.current = null;
        }
        showTimeout.current = setTimeout(() => {
            calculatePosition();
            setVisible(true);
        }, 150);
    }, [calculatePosition]);

    const hide = useCallback(() => {
        if (showTimeout.current) {
            clearTimeout(showTimeout.current);
            showTimeout.current = null;
        }
        hideTimeout.current = setTimeout(() => {
            setVisible(false);
            setCoords(null);
        }, 100);
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (hideTimeout.current) clearTimeout(hideTimeout.current);
            if (showTimeout.current) clearTimeout(showTimeout.current);
        };
    }, []);

    const tooltipId = `glossary-${entry.term.replace(/\s+/g, '-').toLowerCase()}`;

    // Render tooltip into a portal at document.body so it escapes all overflow containers
    const tooltipElement = visible && coords && mounted
        ? createPortal(
            <div
                ref={tooltipRef}
                id={tooltipId}
                role="tooltip"
                className={`glossary-tooltip ${coords.position === 'below' ? 'glossary-tooltip-below' : 'glossary-tooltip-above'}`}
                style={{
                    position: 'fixed',
                    left: `${coords.left}px`,
                    ...(coords.position === 'above'
                        ? { bottom: `${window.innerHeight - coords.top}px` }
                        : { top: `${coords.top}px` }),
                    transform: 'translateX(-50%)',
                }}
                onMouseEnter={show}
                onMouseLeave={hide}
            >
                {/* Full form */}
                {entry.fullForm && (
                    <span className="glossary-tooltip-fullform">
                        {entry.fullForm}
                    </span>
                )}

                {/* Definition */}
                <span className="glossary-tooltip-definition">
                    {entry.definition}
                </span>

                {/* Category pill */}
                <span className="glossary-tooltip-category">
                    {entry.category}
                </span>
            </div>,
            document.body
        )
        : null;

    return (
        <span
            ref={triggerRef}
            className="glossary-term"
            onMouseEnter={show}
            onMouseLeave={hide}
            onFocus={show}
            onBlur={hide}
            tabIndex={0}
            role="button"
            aria-describedby={visible ? tooltipId : undefined}
        >
            {children}
            {tooltipElement}
        </span>
    );
}
