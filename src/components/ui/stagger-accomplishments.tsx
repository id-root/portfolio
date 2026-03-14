"use client"

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const SQRT_5000 = Math.sqrt(5000);

const defaultAccomplishments = [
    { tempId: 0, image: "/badges/aoc2024.png", title: "Advent of Cyber 2024", desc: "Completed TryHackMe's annual event" },
    { tempId: 1, image: "/badges/aoc2025.png", title: "Advent of Cyber 2025", desc: "Completed TryHackMe's annual event" },
    { tempId: 2, image: "/badges/sidequest.png", title: "Advent of Cyber Side Quest 2025", desc: "Completed advanced challenge track" },
    { tempId: 3, image: "/badges/pentest101.png", title: "Penetration 101", desc: "Foundations of penetration testing" },
    { tempId: 4, image: "/badges/osint.png", title: "OSINT", desc: "Open-source intelligence gathering" },
    { tempId: 5, image: "/badges/apihacking.png", title: "API Hacking", desc: "API security testing methodology" },
];

interface TestimonialCardProps {
    position: number;
    testimonial: typeof defaultAccomplishments[0];
    handleMove: (steps: number) => void;
    cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
    position,
    testimonial,
    handleMove,
    cardSize
}) => {
    const isCenter = position === 0;

    return (
        <div
            onClick={() => handleMove(position)}
            className={cn(
                "absolute left-1/2 top-1/2 cursor-pointer border p-8 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                isCenter
                    ? "z-10 bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-700/50 shadow-2xl shadow-stone-900/10 dark:shadow-black/50"
                    : "z-0 bg-stone-50 dark:bg-[#111] border-stone-200 dark:border-stone-800/50 hover:border-accent-caramel/50 dark:hover:border-accent-caramel/50 opacity-80"
            )}
            style={{
                width: cardSize,
                height: cardSize,
                clipPath: `polygon(40px 0%, calc(100% - 40px) 0%, 100% 40px, 100% 100%, calc(100% - 40px) 100%, 40px 100%, 0 100%, 0 0)`, // refined polygon
                transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -30 : position % 2 ? 15 : -15}px)
          scale(${isCenter ? 0.85 : 0.75})
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
            }}
        >
            <span
                className="absolute block origin-top-right rotate-45 bg-stone-200 dark:bg-stone-800"
                style={{
                    right: -2,
                    top: 38,
                    width: SQRT_5000,
                    height: 1
                }}
            />
            <div className="flex flex-col items-center text-center h-full justify-center">
                <div className="w-[100px] h-[100px] relative mb-6">
                    <Image
                        src={testimonial.image}
                        alt={testimonial.title}
                        fill
                        className="object-contain drop-shadow-lg"
                        unoptimized
                    />
                </div>
                <h3 className={cn(
                    "text-xl font-bold font-serif mb-2 transition-colors duration-500",
                    isCenter ? "text-stone-900 dark:text-white" : "text-stone-700 dark:text-stone-300"
                )}>
                    {testimonial.title}
                </h3>
                <p className={cn(
                    "text-sm",
                    isCenter ? "text-stone-600 dark:text-stone-400" : "text-stone-500 dark:text-stone-500"
                )}>
                    {testimonial.desc}
                </p>
            </div>
        </div>
    );
};

export const StaggerAccomplishments: React.FC = () => {
    const [cardSize, setCardSize] = useState(380);
    const [testimonialsList, setTestimonialsList] = useState(defaultAccomplishments);

    const handleMove = (steps: number) => {
        setTestimonialsList(prev => {
            const newList = [...prev];
            if (steps > 0) {
                for (let i = steps; i > 0; i--) {
                    const item = newList.shift();
                    if (item) newList.push({ ...item, tempId: Math.random() });
                }
            } else {
                for (let i = steps; i < 0; i++) {
                    const item = newList.pop();
                    if (item) newList.unshift({ ...item, tempId: Math.random() });
                }
            }
            return newList;
        });
    };

    useEffect(() => {
        const updateSize = () => {
            const { matches } = window.matchMedia("(min-width: 640px)");
            setCardSize(matches ? 400 : 320); // Base sizes rest assured
        };
        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    return (
        <div
            className="relative w-full overflow-visible"
            style={{ height: 600 }}
        >
            <div className="w-full h-full flex items-center justify-center">
            {testimonialsList.map((testimonial, index) => {
                const position = testimonialsList.length % 2
                    ? index - (testimonialsList.length - 1) / 2
                    : index - testimonialsList.length / 2;
                return (
                    <TestimonialCard
                        key={testimonial.tempId}
                        testimonial={testimonial}
                        handleMove={handleMove}
                        position={position}
                        cardSize={cardSize}
                    />
                );
            })}
            </div>
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-4 z-20">
                <button
                    onClick={() => handleMove(-1)}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 hover:text-accent-caramel hover:border-accent-caramel transition-all shadow-sm"
                    aria-label="Previous accomplishment"
                >
                    <ChevronLeft strokeWidth={1.5} />
                </button>
                <button
                    onClick={() => handleMove(1)}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 hover:text-accent-caramel hover:border-accent-caramel transition-all shadow-sm"
                    aria-label="Next accomplishment"
                >
                    <ChevronRight strokeWidth={1.5} />
                </button>
            </div>
        </div>
    );
};
