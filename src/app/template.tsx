"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export default function Template({ children }: { children: React.ReactNode }) {
  const blinds = 5;
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    // Check if the preloader is/was active on this page load
    // The preloader sets window.__preloaderDone = true when it finishes
    const check = () => {
      if (typeof window !== 'undefined' && (window as any).__preloaderDone) {
        setIsInitialLoad(false);
      }
    };
    check();
    // Also listen for when it finishes
    const timer = setInterval(check, 200);
    const timeout = setTimeout(() => {
      setIsInitialLoad(false);
      clearInterval(timer);
    }, 5000);
    return () => { clearInterval(timer); clearTimeout(timeout); };
  }, []);

  return (
    <>
      {/* Venetian Blinds — skip on initial load when preloader is showing */}
      {!isInitialLoad && (
        <div className="fixed inset-0 z-[9998] pointer-events-none flex">
          {[...Array(blinds)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scaleY: 1 }}
              animate={{ scaleY: 0 }}
              exit={{ scaleY: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
              className="flex-1 bg-[#312726] origin-top"
            />
          ))}
        </div>
      )}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: isInitialLoad ? 0 : 0.4 }}
      >
        {children}
      </motion.div>
    </>
  )
}
