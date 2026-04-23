// Text wrapping helper for SVG
export function wrapText(text: string, max: number): string[] {
    const words = text.split(' ');
    const lines: string[] = [];
    let cur = '';
    for (const w of words) {
        if ((cur + ' ' + w).trim().length > max) {
            if (cur.trim()) lines.push(cur.trim());
            cur = w;
        } else {
            cur = cur ? cur + ' ' + w : w;
        }
    }
    if (cur.trim()) lines.push(cur.trim());
    return lines;
}

// Icon SVG groups
export const icons: Record<string, JSX.Element> = {
    lock: (
        <g transform="translate(90, 70) scale(0.9)" filter="url(#sketchy)">
            <rect x="-22" y="-5" width="44" height="38" rx="6" fill="#e8e2f8" stroke="#1c1c1c" strokeWidth="4" strokeLinejoin="round" />
            <path d="M -12,-5 L -12,-22 C -12,-38 12,-38 12,-22 L 12,-5" fill="none" stroke="#1c1c1c" strokeWidth="4" strokeLinecap="round" />
            <circle cx="0" cy="12" r="5" fill="#1c1c1c" opacity="0.35" />
            <rect x="-2" y="12" width="4" height="10" rx="1" fill="#1c1c1c" opacity="0.35" />
            <line x1="-35" y1="-25" x2="-45" y2="-35" stroke="#1c1c1c" strokeWidth="3" strokeLinecap="round" />
            <line x1="-40" y1="5" x2="-55" y2="5" stroke="#1c1c1c" strokeWidth="3" strokeLinecap="round" />
            <line x1="35" y1="-25" x2="45" y2="-35" stroke="#1c1c1c" strokeWidth="3" strokeLinecap="round" />
            <line x1="40" y1="5" x2="55" y2="5" stroke="#1c1c1c" strokeWidth="3" strokeLinecap="round" />
        </g>
    ),
    shield: (
        <g transform="translate(90, 70) scale(0.9)" filter="url(#sketchy)">
            <path d="M 0 -20 Q 20 -20 30 -10 L 30 20 Q 30 40 0 50 Q -30 40 -30 20 L -30 -10 Q -20 -20 0 -20 Z" fill="#e8e2f8" stroke="#1c1c1c" strokeWidth="4" strokeLinejoin="round" />
            <path d="M -15 -5 L -15 20 L 0 35 L 15 20 L 15 -5 Z" fill="none" stroke="#1c1c1c" strokeWidth="2" strokeLinejoin="round" />
            <line x1="-5" y1="0" x2="-5" y2="20" stroke="#1c1c1c" strokeWidth="1" />
            <line x1="-40" y1="-30" x2="-50" y2="-40" stroke="#1c1c1c" strokeWidth="3" strokeLinecap="round" />
            <line x1="-50" y1="0" x2="-65" y2="0" stroke="#1c1c1c" strokeWidth="3" strokeLinecap="round" />
            <line x1="40" y1="-30" x2="50" y2="-40" stroke="#1c1c1c" strokeWidth="3" strokeLinecap="round" />
        </g>
    ),
    database: (
        <g transform="translate(90, 70) scale(0.9)" filter="url(#sketchy)">
            <ellipse cx="0" cy="-15" rx="30" ry="12" fill="#e8e2f8" stroke="#1c1c1c" strokeWidth="4" />
            <path d="M -30,-15 L -30,25 C -30,37 30,37 30,25 L 30,-15" fill="none" stroke="#1c1c1c" strokeWidth="4" />
            <ellipse cx="0" cy="5" rx="30" ry="10" fill="none" stroke="#1c1c1c" strokeWidth="1.5" opacity="0.3" />
            <line x1="-40" y1="-25" x2="-50" y2="-35" stroke="#1c1c1c" strokeWidth="3" strokeLinecap="round" />
            <line x1="40" y1="-25" x2="50" y2="-35" stroke="#1c1c1c" strokeWidth="3" strokeLinecap="round" />
        </g>
    ),
    radio: (
        <g transform="translate(90, 70) scale(0.9)" filter="url(#sketchy)">
            <circle cx="0" cy="15" r="10" fill="#e8e2f8" stroke="#1c1c1c" strokeWidth="4" />
            <circle cx="0" cy="15" r="4" fill="#1c1c1c" opacity="0.3" />
            <path d="M -18,-2 C -12,-15 12,-15 18,-2" stroke="#1c1c1c" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M -28,-12 C -18,-30 18,-30 28,-12" stroke="#1c1c1c" strokeWidth="3" fill="none" strokeLinecap="round" />
            <line x1="0" y1="25" x2="0" y2="42" stroke="#1c1c1c" strokeWidth="3" strokeLinecap="round" />
            <line x1="-10" y1="42" x2="10" y2="42" stroke="#1c1c1c" strokeWidth="3" strokeLinecap="round" />
        </g>
    ),
};
