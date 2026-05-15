"use client"

import { useState, useEffect, useCallback } from "react"
import { SplinePreloader } from "@/components/ui/preloader"

/**
 * Layout-level preloader wrapper.
 * Renders the preloader IMMEDIATELY on mount (before any child components load),
 * ensuring it appears as the very first thing the user sees.
 * 
 * Uses a module-level flag so it only shows once per full browser refresh,
 * not on Next.js client-side navigations.
 */

let hasAppLoaded = false;

export function PreloaderWrapper({ children }: { children: React.ReactNode }) {
    const [showLoader, setShowLoader] = useState(() => !hasAppLoaded);
    const [splineReady, setSplineReady] = useState(false);

    // Expose the spline-ready setter globally so Hero can call it
    useEffect(() => {
        if (typeof window !== 'undefined') {
            (window as any).__setSplineReady = () => setSplineReady(true);
        }
    }, []);

    const handlePreloaderComplete = useCallback(() => {
        hasAppLoaded = true;
        if (typeof window !== 'undefined') {
            (window as any).__preloaderDone = true;
        }
        setShowLoader(false);
    }, []);

    return (
        <>
            {showLoader && (
                <SplinePreloader
                    isLoaded={splineReady}
                    onComplete={handlePreloaderComplete}
                />
            )}
            {children}
        </>
    );
}
