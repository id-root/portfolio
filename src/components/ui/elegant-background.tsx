'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

export function ElegantBackground() {
    const { scrollY } = useScroll();

    // Parallax offsets
    const y1 = useTransform(scrollY, [0, 1000], [0, -100]);
    const y2 = useTransform(scrollY, [0, 1000], [0, -200]);

    return (
        <div className="fixed inset-0 -z-10 bg-background overflow-hidden pointer-events-none transition-colors duration-500">
            {/* Base gradient layer */}
            <motion.div
                style={{ y: y1 }}
                className="absolute inset-x-0 top-0 h-[200vh] bg-[radial-gradient(circle_at_50%_0%,rgba(201,184,150,0.1)_0%,transparent_50%)]"
            />

            {/* Soft beige/caramel shapes */}
            <motion.div
                style={{ y: y2 }}
                className="absolute -left-[10%] top-[20%] w-[50vw] h-[50vw] rounded-full bg-accent-caramel/5 blur-[120px]"
            />
            <motion.div
                style={{ y: y1 }}
                className="absolute -right-[10%] top-[40%] w-[40vw] h-[40vw] rounded-full bg-accent-terracotta/5 blur-[100px]"
            />

            {/* Subtle organic texture grain overlay */}
            <div
                className="absolute inset-0 opacity-[0.04] mix-blend-multiply"
                style={{
                    backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.7\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')"
                }}
            ></div>
        </div>
    );
}
