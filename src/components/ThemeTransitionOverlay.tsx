'use client';

import { useTheme } from './ThemeProvider';

/**
 * ThemeTransitionOverlay — Curtain Style
 *
 * A dramatic full-screen curtain that drops vertically when toggling
 * dark/light mode. The curtain color matches the DESTINATION theme
 * background, cleanly masking the switch.
 *
 * Animation sequence:
 * 1. Curtain drops from top (scaleY 0 → 1) → 550ms
 * 2. Theme swaps while curtain fully covers the screen
 * 3. Curtain lifts from top (scaleY 1 → 0) → 550ms
 */

const DURATION = 550; // ms, must match ThemeProvider
const EASING = 'cubic-bezier(0.76, 0, 0.24, 1)';

export default function ThemeTransitionOverlay() {
    const { curtainPhase, curtainColor } = useTheme();

    return (
        <div
            aria-hidden="true"
            style={{
                position: 'fixed',
                inset: 0,
                background: curtainColor,
                transformOrigin: 'top',
                transform: curtainPhase === 'falling' ? 'scaleY(1)' : 'scaleY(0)',
                transition:
                    curtainPhase !== 'idle'
                        ? `transform ${DURATION}ms ${EASING}`
                        : 'none',
                zIndex: 99999,
                pointerEvents: 'none',
            }}
        />
    );
}
