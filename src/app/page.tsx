"use client";

import dynamic from "next/dynamic";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Footer } from "@/components/footer";

const SkillAsteroidsParallax = dynamic(
    () => import("@/components/ui/SkillAsteroidsParallax"),
    { ssr: false }
);

export default function Home() {
    return (
        <div className="w-full flex flex-col pt-10 min-h-screen relative transition-colors duration-300">
                {/* Ambient Glow — pinkish brand tone */}
            <div className="fixed top-20 left-1/2 -translate-x-1/2 w-[90vw] h-[90vw] md:w-[600px] md:h-[600px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none z-0" />

            <div className="relative z-10 w-full">
                <Hero />
                <Projects />
                <SkillAsteroidsParallax />

                {/* ─── FOOTER ─── */}
                <Footer />
            </div>
        </div>
    );
}
