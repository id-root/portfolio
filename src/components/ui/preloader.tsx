"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState, useRef } from "react"

/**
 * SplinePreloader — High-end minimal loading screen.
 * Requirements: 
 * - 2.5 second process bar timer.
 * - Massive VECTOR font (No glow).
 * - No "Initializing Engine" text.
 */
export function SplinePreloader({ 
    isLoaded, 
    onComplete 
}: { 
    isLoaded: boolean, 
    onComplete?: () => void 
}) {
  const [progress, setProgress] = useState(0);
  const [timerFinished, setTimerFinished] = useState(false);
  const [forceLoaded, setForceLoaded] = useState(false);
  const startTime = useRef<number>(Date.now());
  const DURATION = 1500; // 1.5 seconds minimum (cut from 3s for better LCP)

  useEffect(() => {
    const interval = setInterval(() => {
        const elapsed = Date.now() - startTime.current;
        const p = Math.min((elapsed / DURATION) * 100, 100);
        setProgress(p);

        if (p >= 100) {
            clearInterval(interval);
            setTimerFinished(true);
        }
    }, 16);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fallback = setTimeout(() => {
        setForceLoaded(true);
    }, 7000);
    return () => clearTimeout(fallback);
  }, []);

  // When both the 3s timer AND Spline is loaded (or fallback triggers), we fade out
  useEffect(() => {
      if (timerFinished && (isLoaded || forceLoaded)) {
          if (typeof window !== 'undefined') {
              (window as any).__preloaderDone = true;
          }
          onComplete?.();
      }
  }, [timerFinished, isLoaded, forceLoaded, onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#312726] overflow-hidden"
      >
        <div className="relative flex flex-col items-center gap-16 w-full max-w-lg px-8">
          
          {/* Animated Butterfly */}
          <motion.svg 
              width="100" 
              height="100" 
              viewBox="0 0 100 100"
              initial={{ x: -300, y: 150, scale: 0.5, rotate: -45 }}
              animate={{ 
                  x: [ -300, -100, 100, -50, 45 ], 
                  y: [ 150, -50, 50, -120, -100 ], // Lands top-right part of the text
                  scale: [0.5, 1, 0.8, 1, 0.7],
                  rotate: [ -45, 15, -25, 10, 0 ]
              }}
              transition={{ duration: 3, times: [0, 0.3, 0.6, 0.85, 1], ease: "easeInOut" }}
              className="absolute z-20 pointer-events-none"
              style={{ left: "50%", top: "50%", marginLeft: "-50px", marginTop: "-50px" }}
          >
              <motion.g
                  animate={{ scaleX: [1, 0.2, 1] }}
                  transition={{ duration: 0.25, repeat: Infinity, ease: "easeInOut" }}
                  style={{ transformOrigin: "50% 50%" }}
              >
                  {/* Left Wing */}
                  <path d="M50 50 C 20 20, 0 40, 20 80 C 40 100, 50 70, 50 50 Z" fill="#C4A882" opacity="0.85" />
                  <path d="M50 50 C 30 10, 10 30, 25 60 C 40 80, 50 60, 50 50 Z" fill="#FFF8ED" opacity="0.5" />
                  {/* Right Wing */}
                  <path d="M50 50 C 80 20, 100 40, 80 80 C 60 100, 50 70, 50 50 Z" fill="#C4A882" opacity="0.85" />
                  <path d="M50 50 C 70 10, 90 30, 75 60 C 60 80, 50 60, 50 50 Z" fill="#FFF8ED" opacity="0.5" />
                  {/* Body */}
                  <rect x="48" y="35" width="4" height="30" rx="2" fill="#FFF8ED" />
                  {/* Antennae */}
                  <path d="M50 35 Q 40 20, 45 15" stroke="#FFF8ED" strokeWidth="1.5" fill="none" />
                  <path d="M50 35 Q 60 20, 55 15" stroke="#FFF8ED" strokeWidth="1.5" fill="none" />
              </motion.g>
          </motion.svg>

          {/* Massive VECTOR Font - No Glow */}
          <h1 
            style={{ fontSize: "clamp(5rem, 18vw, 14rem)" }}
            className="relative font-gamja text-[#FFF8ED] font-medium tracking-tight uppercase leading-none select-none text-center"
          >
            Vector
          </h1>

          {/* Process Bar */}
          <div className="w-full h-[2px] bg-[#FFF8ED]/10 relative rounded-full overflow-hidden">
            <motion.div 
               className="absolute top-0 left-0 h-full bg-[#C4A882]"
               style={{ width: `${progress}%` }}
               transition={{ ease: "linear" }}
            />
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  )
}
