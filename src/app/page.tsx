"use client";

import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { SparklesCore } from "@/components/ui/sparkles";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Footer } from "@/components/footer";

export default function Home() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    const isDark = mounted && resolvedTheme === "dark";

    return (
        <div className="w-full flex flex-col pt-10 min-h-screen relative transition-colors duration-300">
            {/* Ambient Glow — warm tone, NOT blue */}
            <div className="fixed top-20 left-1/2 -translate-x-1/2 w-[90vw] h-[90vw] md:w-[600px] md:h-[600px] bg-accent-caramel/5 rounded-full blur-[120px] pointer-events-none z-0" />

            {/* Dark-mode-only Sparkles */}
            {isDark && (
                <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
                    <SparklesCore
                        id="landing-sparkles"
                        background="transparent"
                        minSize={0.4}
                        maxSize={1.2}
                        particleDensity={60}
                        className="w-full h-full"
                        particleColor="#C4A77D"
                        speed={0.8}
                    />
                </div>
            )}

            <SmoothScroll>
                <div className="relative z-10 w-full">
                    <Hero />
                    <Projects />
                    <Skills />

                    {/* ─── FOOTER ─── */}
                    <Footer />
                </div>
            </SmoothScroll>
        </div>
    );
}
