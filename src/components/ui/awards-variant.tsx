"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useVelocity } from "framer-motion";
import Image from "next/image";

const myAccomplishments = [
  { tempId: 0, image: "/badges/aoc2024.png", title: "Advent of Cyber 2024", desc: "Completed TryHackMe's annual event", icon: "🎄" },
  { tempId: 1, image: "/badges/aoc2025.png", title: "Advent of Cyber 2025", desc: "Completed TryHackMe's annual event", icon: "🎅" },
  { tempId: 2, image: "/badges/sidequest.png", title: "Side Quest 2025", desc: "Completed advanced challenge track", icon: "⚔️" },
  { tempId: 3, image: "/badges/pentest101.png", title: "Penetration 101", desc: "Foundations of penetration testing", icon: "🛡️" },
  { tempId: 4, image: "/badges/osint.png", title: "OSINT", desc: "Open-source intelligence gathering", icon: "🔍" },
  { tempId: 5, image: "/badges/apihacking.png", title: "API Hacking", desc: "API security testing methodology", icon: "🔌" },
];

export const AwardsVariant = () => {
    // Scroll track container
    const targetRef = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress, scrollY } = useScroll({ target: targetRef });

    // Translate vertical scroll into horizontal movement
    // 5% start padding -> -65% to show the end of the list.
    const x = useTransform(scrollYProgress, [0, 1], ["10%", "-65%"]);

    // Calculate velocity for the pendulum physics
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 60,
        stiffness: 400,
    });
    // Map velocity to a swing angle. 
    // Very subtle bounds for the jiggle effect.
    const baseRotate = useTransform(smoothVelocity, [-800, 800], [-3, 3], { clamp: false });

    return (
        <section ref={targetRef} className="relative h-[300vh] w-full bg-transparent">
            {/* Sticky viewport container */}
            <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
                
                {/* Horizontal Track */}
                <motion.div style={{ x }} className="relative flex gap-12 md:gap-[120px] px-[10vw]">
                    
                    {/* The Visible Mounting Wire running exactly through the hanging hooks */}
                    <div className="absolute top-[3px] -left-[100vw] w-[5000px] h-0.5 bg-gradient-to-r from-transparent via-[#748D92]/50 to-transparent shadow-[0_1px_3px_rgba(116,141,146,0.3)] z-0 pointer-events-none" />

                    {/* The Cards Array */}
                    {myAccomplishments.map((item, index) => (
                        <HangerCard key={item.tempId} item={item} index={index} baseRotate={baseRotate} />
                    ))}
                </motion.div>

                {/* Progress hint visible mostly when started */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-xs font-mono text-text-muted tracking-widest uppercase opacity-50 flex flex-col items-center gap-2">
                    <span>Scroll to explore</span>
                    <div className="w-px h-6 bg-gradient-to-b from-text-muted to-transparent" />
                </div>
            </div>
        </section>
    );
};

// Extracted to properly use Framer Motion hooks inside a loop
function HangerCard({ item, index, baseRotate }: { item: any, index: number, baseRotate: any }) {
    // Slightly stagger the rotation formula per card for a more organic, physical feel
    const cardRotate = useTransform(baseRotate, (v: number) => v * (1 + (index % 3) * 0.1));

    return (
        <motion.div 
            style={{ 
                rotate: cardRotate, 
                transformOrigin: "top center" 
            }}
            className="relative flex flex-col items-center flex-shrink-0 w-[280px] md:w-[320px] z-10 pt-10"
        >
            {/* Mounting Hook / Ring */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center z-0 origin-top">
                {/* Ring that slides on the wire */}
                <div className="w-[18px] h-[18px] rounded-full border-[3px] border-[#748D92] shadow-sm bg-surface" />
                {/* Wire string attaching to the card */}
                <div className="w-[2px] h-[34px] bg-gradient-to-b from-[#748D92] to-[#748D92]/20" />
            </div>
            
            {/* Physical Glass Card */}
            <div className="liquid-glass-card flex flex-col items-center text-center relative z-10 w-full p-8 pt-10 pb-12 mt-0">
                {/* Artificial specular reflection highlight on the glass */}
                <div className="absolute top-0 left-0 w-full h-[40%] bg-gradient-to-b from-white/10 dark:from-white/5 to-transparent pointer-events-none rounded-t-2xl z-0" />
                
                <div className="relative mb-6 w-[120px] h-[120px] md:w-[150px] md:h-[150px] filter drop-shadow-xl hover:scale-105 transition-transform duration-500 z-10">
                    <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-contain"
                        unoptimized
                    />
                </div>
                
                <h3 className="text-xl md:text-2xl font-serif font-bold text-text-primary mb-3 relative z-10 drop-shadow-sm">
                    {item.title}
                </h3>
                <p className="text-text-muted font-outfit font-light text-sm md:text-base leading-relaxed relative z-10">
                    {item.desc}
                </p>
            </div>
        </motion.div>
    );
}
