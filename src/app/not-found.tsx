"use client";

import Link from "next/link";
import { Radio } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-background">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-xl w-full text-center relative z-10"
            >
                <div className="mb-8 relative inline-block">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border-2 border-dashed border-[var(--brand-accent)]/30 rounded-full"
                    />
                    <div className="w-32 h-32 bg-[var(--brand-dark)]/10 backdrop-blur rounded-full flex items-center justify-center border border-[var(--brand-accent)]/50 shadow-lg mx-auto relative">
                        <Radio className="w-12 h-12 text-[var(--brand-accent)]" />
                    </div>
                </div>

                <h1 className="text-6xl font-gamja font-bold text-text-primary mb-2">
                    404
                </h1>
                <h2 className="text-2xl font-gamja text-[var(--brand-accent)] mb-6">
                    SIGNAL LOST
                </h2>

                <p className="text-text-secondary mb-8 max-w-md mx-auto font-light">
                    The requested coordinates cannot be resolved. The data stream may have been corrupted or the sector has been decommissioned.
                </p>

                <div className="flex justify-center gap-4">
                    <Link
                        href="/"
                        className="px-8 py-3.5 rounded-full font-outfit uppercase tracking-widest text-xs font-semibold transition-all duration-500 hover:shadow-[0_8px_32px_rgba(196,168,130,0.3)]"
                        style={{
                            backgroundColor: 'var(--brand-accent)',
                            color: 'var(--brand-dark)',
                        }}
                    >
                        RE-INITIALIZE
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
