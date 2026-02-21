import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { About } from "@/components/about";
import { Skills } from "@/components/skills";

export default function Home() {
    return (
        <div className="w-full flex flex-col pt-10 min-h-screen relative transition-colors duration-300">
            {/* Ambient Glow */}
            <div className="fixed top-20 left-1/2 -translate-x-1/2 w-[90vw] h-[90vw] md:w-[600px] md:h-[600px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none z-0" />

            <div className="relative z-10 w-full">
                <Hero />
                <Projects />
                <About />
                <Skills />
                {/* Optional footer can be added here, or we continue the flow */}
                <div className="py-20 text-center text-text-muted font-outfit text-sm">
                    <p>&copy; {new Date().getFullYear()} Portfolio. Crafted with elegance.</p>
                </div>
            </div>
        </div>
    );
}
