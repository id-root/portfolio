import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";

export default function Home() {
    return (
        <div className="min-h-screen selection:bg-red-500 selection:text-white overflow-x-hidden transition-colors duration-300">


            <main className="container mx-auto px-6 md:px-12 max-w-7xl pt-20">
                <Hero />
                <Projects />
            </main>

            {/* Decorative Footer Gradient */}
            <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary to-transparent pointer-events-none z-20"></div>
        </div>
    );
}

