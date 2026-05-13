export const LibraryBookIllustration = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="190 70 520 360" width="100%" height="100%" className={className}>
    {/* Background Circle */}
    <circle cx="500" cy="240" r="140" fill="#f2ded1" />

    {/* Leaves Background Elements */}
    <g stroke="#413227" strokeLinejoin="round">
      {/* Stem */}
      <path d="M 570 380 Q 610 340, 630 260" fill="none" strokeWidth="5" strokeLinecap="round" />
      {/* Leaf 1 (Top right) */}
      <path d="M 630 260 C 625 230, 660 215, 660 245 C 660 265, 640 275, 630 260 Z" fill="#8d987e" strokeWidth="5" />
      {/* Leaf 2 (Right mid) */}
      <path d="M 615 305 C 655 280, 680 305, 660 325 C 640 335, 610 320, 615 305 Z" fill="#8d987e" strokeWidth="5" />
      {/* Leaf 3 (Bottom right) */}
      <path d="M 590 355 C 635 340, 660 365, 635 385 C 610 400, 575 375, 590 355 Z" fill="#8d987e" strokeWidth="5" />
      {/* Leaf 4 (Left small) */}
      <path d="M 605 305 C 585 290, 575 310, 590 325 C 605 320, 610 310, 605 305 Z" fill="#8d987e" strokeWidth="4" />
    </g>

    {/* Small floating dot near leaves */}
    <circle cx="615" cy="395" r="4" fill="#413227" />

    {/* Book Base Cover */}
    <path d="M 210 220 L 210 395 C 210 405, 220 410, 235 405 Q 315 380, 400 425 Q 485 380, 565 405 C 580 410, 590 405, 590 395 L 590 220 Z" fill="#684e3e" stroke="#413227" strokeWidth="6" strokeLinejoin="round" />

    {/* Page Stack Left */}
    <path d="M 225 210 L 225 385 Q 315 360, 400 405 L 400 225 Q 315 180, 225 210 Z" fill="#e8d2bd" stroke="#413227" strokeWidth="6" strokeLinejoin="round" />

    {/* Page Stack Right */}
    <path d="M 575 210 L 575 385 Q 485 360, 400 405 L 400 225 Q 485 180, 575 210 Z" fill="#e8d2bd" stroke="#413227" strokeWidth="6" strokeLinejoin="round" />

    {/* Page Stack Thickness Lines */}
    <path d="M 230 380 Q 315 355, 400 400" fill="none" stroke="#413227" strokeWidth="3" strokeLinecap="round"/>
    <path d="M 570 380 Q 485 355, 400 400" fill="none" stroke="#413227" strokeWidth="3" strokeLinecap="round"/>
    <path d="M 235 375 Q 315 350, 400 395" fill="none" stroke="#413227" strokeWidth="2" strokeLinecap="round"/>
    <path d="M 565 375 Q 485 350, 400 395" fill="none" stroke="#413227" strokeWidth="2" strokeLinecap="round"/>

    {/* Top Page Left */}
    <path d="M 235 200 L 235 370 Q 315 345, 400 390 L 400 215 Q 315 170, 235 200 Z" fill="#fef7f0" stroke="#413227" strokeWidth="5" strokeLinejoin="round" />

    {/* Top Page Right */}
    <path d="M 565 200 L 565 370 Q 485 345, 400 390 L 400 215 Q 485 170, 565 200 Z" fill="#fef7f0" stroke="#413227" strokeWidth="5" strokeLinejoin="round" />

    {/* Spine Crease Line */}
    <line x1="400" y1="215" x2="400" y2="390" stroke="#413227" strokeWidth="5" strokeLinecap="round"/>

    {/* Bookmark Overlay */}
    <path d="M 275 191 L 315 185 L 315 270 L 295 250 L 275 270 Z" fill="#f0cc86" stroke="#413227" strokeWidth="5" strokeLinejoin="round" />

    {/* Left Page Text Placeholder Lines */}
    <g stroke="#e4c8ab" strokeWidth="6" strokeLinecap="round" fill="none">
      <path d="M 265 300 Q 310 290, 360 300" />
      <path d="M 265 330 Q 320 320, 380 330" />
      <path d="M 265 360 Q 295 355, 330 360" />
    </g>

    {/* Right Page Image Block */}
    <path d="M 435 230 Q 480 215, 525 225 L 525 295 Q 480 285, 435 300 Z" fill="#f0d7c2" />

    {/* Right Page Text Placeholder Lines */}
    <g stroke="#e4c8ab" strokeWidth="6" strokeLinecap="round" fill="none">
      <path d="M 435 325 Q 480 315, 540 325" />
      <path d="M 435 355 Q 470 345, 520 355" />
    </g>

    {/* Sparkles & Magical Elements */}
    <path d="M 290 110 Q 290 140, 260 140 Q 290 140, 290 170 Q 290 140, 320 140 Q 290 140, 290 110 Z" fill="#fbf4ef" stroke="#d8a467" strokeWidth="4" strokeLinejoin="round"/>
    <path d="M 350 160 Q 350 175, 335 175 Q 350 175, 350 190 Q 350 175, 365 175 Q 350 175, 350 160 Z" fill="#fbf4ef" stroke="#d8a467" strokeWidth="3" strokeLinejoin="round"/>
    <circle cx="270" cy="110" r="3" fill="#d8a467" />
    <circle cx="370" cy="125" r="4" fill="#d8a467" />
  </svg>
);
